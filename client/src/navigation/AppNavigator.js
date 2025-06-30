// client/src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* ─── Pantallas ─── */
import LandingScreen from '../screens/LandingScreen';
import AssociateFormScreen from '../screens/AssociateFormScreen';
import DashboardScreen from '../screens/DashboardScreen';      // ej. admin
import LoginScreen from '../screens/LoginScreen';              // opcional
// agrega aquí las que necesites …

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Landing"        component={LandingScreen} />
      <Stack.Screen name="AssociateForm"  component={AssociateFormScreen} />
      <Stack.Screen name="Dashboard"      component={DashboardScreen} />
      <Stack.Screen name="Login"          component={LoginScreen} />
      {/* <Stack.Screen name="OtraPantalla" component={OtraPantalla} /> */}
    </Stack.Navigator>
  );
}
