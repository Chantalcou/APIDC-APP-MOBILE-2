// client/src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* ─── Pantallas ─── */
import LandingScreen from '../screens/LandingScreen';
import AssociateFormScreen from '../screens/AssociateFormScreen';
import { ROUTES } from './routes';
// import DashboardScreen from '../screens/DashboardScreen';   
// import LoginScreen from '../screens/LoginScreen';         
// agrega aquí las que necesites …

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LANDING}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ROUTES.LANDING}     component={LandingScreen} />
      <Stack.Screen name={ROUTES.FORMULARIO}  component={AssociateFormScreen} />
      {/* <Stack.Screen name="Dashboard"      component={DashboardScreen} /> */}
      {/* <Stack.Screen name="Login"          component={LoginScreen} /> */}
      {/* <Stack.Screen name="OtraPantalla" component={OtraPantalla} /> */}
    </Stack.Navigator>
  );
}
