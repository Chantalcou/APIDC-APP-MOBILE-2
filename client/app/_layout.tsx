import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native';
import { AuthProvider } from '../src/context/AuthContext';
import Navbar from '../src/components/Navbar';
import LandingScreen from '../src/screens/LandingScreen';
import AssociateFormScreen from '../src/screens/AssociateFormScreen';
import NotFoundScreen from '../src/screens/NotFoundScreen';
import { ROUTES } from '../src/navigation/routes';

import { useColorScheme } from '@/hooks/useColorScheme';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Navbar />
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.LANDING} component={LandingScreen} />
            <Stack.Screen name={ROUTES.FORMULARIO} component={AssociateFormScreen} />
            <Stack.Screen name={ROUTES.NOT_FOUND} component={NotFoundScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaView>
    </AuthProvider>
  );
}
