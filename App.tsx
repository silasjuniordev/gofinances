import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen'

import { SignIn } from './src/screens/SignIn';


import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import { AuthProvider } from './src/hooks/auth';

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if(fontsLoaded) {
    SplashScreen.hideAsync()
  }
  
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <GestureHandlerRootView style={{flex: 1}}>
          <StatusBar 
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <AuthProvider>
            { fontsLoaded && <AppRoutes /> }
          </AuthProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </ThemeProvider>
  )
}