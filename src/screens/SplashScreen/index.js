import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SplashLogo from '../../assets/splash-logo.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('main-tab')
      } else {
        navigation.navigate('option-login');
      }
    }

    setTimeout(() => {
      checkToken();
    }, 5000);

  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#F6F7F8', padding: 30 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 40 }}>
        <SplashLogo />
        <Text style={{ fontWeight: 400, fontSize: 24, color: '#5E50A1', textAlign: 'center' }}>Welcome to Peworld</Text>
      </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})