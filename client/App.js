// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './src/context/AuthContext';
import Navbar            from './src/components/Navbar';

import LandingScreen      from './src/screens/LandingScreen';
import AssociateFormScreen from './src/screens/AssociateFormScreen';
// importa otras pantallas según las vayas creando
// import SocioHomeScreen  from './src/screens/SocioHomeScreen';
// import GestorDashboard  from './src/screens/GestorDashboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          /* 👇  header global con tu Navbar  */
          screenOptions={{
            header: () => <Navbar />          // <- muestra Navbar en TODAS
          }}
        >
          <Stack.Screen name="Landing"    component={LandingScreen} />
          <Stack.Screen name="Formulario" component={AssociateFormScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
