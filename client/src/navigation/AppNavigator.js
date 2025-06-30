import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import AssociateFormScreen from '../screens/AssociateFormScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { ROUTES } from './routes';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.FORMULARIO} component={AssociateFormScreen} />
        <Stack.Screen name={ROUTES.LANDING} component={LandingScreen} />
        <Stack.Screen name={ROUTES.NOT_FOUND} component={NotFoundScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
