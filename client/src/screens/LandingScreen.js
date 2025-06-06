import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  useWindowDimensions,
  Alert,
} from 'react-native';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

const LandingScreen = () => {
  const { width, height } = useWindowDimensions();
  const isSmallDevice = height < 700;
  const { login } = useAuth();
  const router = useRouter();

  const handleAssociate = async () => {
    try {
      console.log('ASOCIATE button pressed');
      const result = await login();
      if (result?.type === 'success') {
        router.push('/associate-form');
      }
    } catch (error) {
      console.error('Error in handleAssociate:', error);
      Alert.alert('Error', 'No se pudo iniciar el proceso de asociación');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Navbar />
      <ImageBackground
        source={{
          uri: 'https://res.cloudinary.com/dqgjcfosx/image/upload/v1740671503/Dise%C3%B1o_sin_t%C3%ADtulo_3_ocqnjy.png',
        }}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Header Section with Overlay */}
        <View style={styles.headerOverlay}>
          <View style={styles.headerContainer}>
            <Text style={[
              styles.title,
              { fontSize: isSmallDevice ? 42 : 52 }
            ]}>
              APIDC
            </Text>
            <Text style={[
              styles.subtitle,
              { fontSize: isSmallDevice ? 18 : 22 }
            ]}>
              CULTIVO LEGAL DE CANNABIS
            </Text>
            <Text style={[
              styles.legalText,
              { fontSize: isSmallDevice ? 12 : 14 }
            ]}>
              Respaldo por REPROCANN y marco legal vigente
            </Text>
          </View>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleAssociate}
          >
            <Text style={styles.buttonText}>
              ASOCIATE
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              SOY SOCIO
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              SOY GESTOR
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
  },
  headerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 40,
    minHeight: 220,
  },
  headerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 20,
    letterSpacing: 2,
  },
  subtitle: {
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  legalText: {
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    gap: 20,
    marginTop: 40,
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    paddingVertical: Platform.OS === 'ios' ? 16 : 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#000000',
  },
});

export default LandingScreen; 