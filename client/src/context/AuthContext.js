import React, { createContext, useContext, useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';

// Configuración de Auth0
const AUTH0_DOMAIN = 'dev-kr0cimyo8srf0uor.us.auth0.com';
const AUTH0_CLIENT_ID = 'TZlbu5aWKAtl0lXoQ2Kum0SBZoGXc8oi';

// Configurar el esquema de URL para la redirección
const redirectUri = Platform.select({
  web: 'http://localhost:8081',
  default: makeRedirectUri({
    scheme: 'apdc',
    path: 'auth0'
  })
});

console.log('Redirect URI configurada:', redirectUri);

// Configurar el discovery endpoint de Auth0
const discovery = {
  authorizationEndpoint: `https://${AUTH0_DOMAIN}/authorize`,
  tokenEndpoint: `https://${AUTH0_DOMAIN}/oauth/token`,
  revocationEndpoint: `https://${AUTH0_DOMAIN}/oauth/revoke`,
};

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientId: AUTH0_CLIENT_ID,
      redirectUri,
      scopes: ['openid', 'profile', 'email'],
      usePKCE: true,
      extraParams: {
        audience: `https://${AUTH0_DOMAIN}/api/v2/`,
        prompt: 'login'
      }
    },
    discovery
  );

  useEffect(() => {
    checkSession();
  }, []);


  const checkSession = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (mode = 'login', onSuccess) => {
    try {
      console.log('Iniciando proceso de login...');
      console.log('Redirect URI que se está usando:', redirectUri);
      console.log('Request config:', request);
      const result = await promptAsync({ useProxy: true });
      console.log('Resultado de autenticación:', result);

      if (result.type === 'success') {
        const { code } = result.params;

        const tokenRes = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: AUTH0_CLIENT_ID,
            code_verifier: request.codeVerifier,
            code,
            redirect_uri: redirectUri
          })
        });
        const tokenData = await tokenRes.json();
        const { access_token } = tokenData;

        const userRes = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
          headers: { Authorization: `Bearer ${access_token}` }
        });
        const userInfo = await userRes.json();

        const userData = {
          ...userInfo,
          access_token
        };
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        console.log('Login exitoso');

        onSuccess?.();
      }

      return result;
    } catch (error) {
      console.error('Error durante el login:', error);
      Alert.alert('Error', 'Ocurrió un error durante el inicio de sesión');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error durante el logout:', error);
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};