// client/src/components/Navbar.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, login, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo + título */}
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dqgjcfosx/image/upload/v1725976604/APIDC-LOGO-01-121x121_qnzw4d.png'
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>APIDC</Text>
        </View>

        {/* Botón Auth */}
        <TouchableOpacity
          style={styles.authButton}
          onPress={() => {
            if (user) {
              logout();              // cierra sesión
            } else {
              login('login');        // fuerza modo “Sign-in” en Auth0
            }
          }}>
          <Text style={styles.authButtonText}>
            {user ? 'Cerrar Sesión' : 'Iniciar Sesión'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ───── estilos ───── */
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 40, height: 40, resizeMode: 'contain' },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
    color: '#0a9d6d',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto'
  },
  authButton: {
    backgroundColor: '#0a9d6d',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20
  },
  authButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto'
  }
});
