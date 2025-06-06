import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import FormAsociationScreen from '../screens/FormAsociationScreen';


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
  name="FormAsociation"
  component={FormAsociationScreen}
  options={{
    headerShown: false,
  }}
/>

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