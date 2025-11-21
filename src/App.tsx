/**
 * BootCampOTP React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OTPVerificationScreen from './screens/OTPVerificationScreen';




export default function App(){
    return (<SafeAreaProvider>
      <OTPVerificationScreen />
    </SafeAreaProvider>)
}