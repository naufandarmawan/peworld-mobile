import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SplashLogo from '../../assets/splash-logo.svg'


const SplashScreen = ({navigation}) => {

  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('option-login')
    }, 5000)
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