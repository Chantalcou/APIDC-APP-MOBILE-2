import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
          header: () => null,
          title: '',
          headerTitle: '',
          headerTitleStyle: {
            display: 'none',
          },
        }}
      >
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{
            headerShown: false,
            header: () => null,
            title: '',
            headerTitle: '',
            headerTitleStyle: {
              display: 'none',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 