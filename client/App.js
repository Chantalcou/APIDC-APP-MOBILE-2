// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/context/AuthContext';
import Navbar from './src/components/Navbar';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Navbar />
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
