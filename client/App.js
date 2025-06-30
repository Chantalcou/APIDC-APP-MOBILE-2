import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './src/context/AuthContext';
import Navbar from './src/components/Navbar';

import LandingScreen from './src/screens/LandingScreen';
import AssociateFormScreen from './src/screens/AssociateFormScreen';
import NotFoundScreen from './src/screens/NotFoundScreen';
import { ROUTES } from './src/navigation/routes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.root}>
        <Navbar />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.LANDING} component={LandingScreen} />
            <Stack.Screen name={ROUTES.FORMULARIO} component={AssociateFormScreen} />
            <Stack.Screen name={ROUTES.NOT_FOUND} component={NotFoundScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
