/* client/src/components/Navbar.js */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, login, logout } = useAuth();

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        {/* logo + título */}
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dqgjcfosx/image/upload/v1725976604/APIDC-LOGO-01-121x121_qnzw4d.png',
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>APIDC</Text>
        </View>

        {/* botón Auth */}
        <TouchableOpacity
          style={styles.authButton}
          onPress={() => (user ? logout() : login('login'))}
        >
          <Text style={styles.authButtonText}>
            {user ? 'Cerrar Sesión' : 'Iniciar Sesión'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ───── estilos ───── */
const BAR_HEIGHT = Platform.OS === 'ios' ? 90 : 70; // alto total (aprox.)

const styles = StyleSheet.create({
  /* -- la envolvente ocupa todo el ancho y se fija arriba -- */
  wrapper: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: BAR_HEIGHT,
    backgroundColor: '#fff',
    zIndex: 100, // queda por encima del resto
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    paddingHorizontal: 20,
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 40, height: 40, resizeMode: 'contain' },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
    color: '#0a9d6d',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  authButton: {
    backgroundColor: '#0a9d6d',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
});
