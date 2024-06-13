import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';

import FormContainer from '../../components/module/formcontainer';
import Input from '../../components/base/input';
import Button from '../../components/base/button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import WhiteLogo from '../../assets/white-logo.svg'

const OptionLogin = ({ navigation }) => {

  return (
    <ImageBackground source={require('../../assets/option-background.png')} style={styles.container} resizeMode='cover'>
      <View style={styles.innerContainer}>
        <WhiteLogo />

        <Text style={{ fontWeight: 700, fontSize: 34, color: '#FFFFFF' }}>Temukan developer berbakat & terbaik di berbagai bidang keahlian</Text>

        <View style={styles.actionContainer}>
          <Button variant='primary-yellow' onPress={() => navigation.navigate('worker-login')} text='Masuk sebagai pekerja' />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#FFFFFF' }} />
            <Text style={{ fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>atau</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: '#FFFFFF' }} />
          </View>
          <Button variant='secondary-yellow' onPress={() => navigation.navigate('recruiter-login')} text='Masuk sebagai perekrut' />
        </View>
      </View>
      <Toast />
    </ImageBackground>

  )
}

export default OptionLogin

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F6F7F8',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 30,
    justifyContent:'space-between'
  },
  actionContainer: {
    flexDirection: 'column',
    gap: 20,
  },
  link: {
    textAlign: 'right',
    fontSize: 16,
    color: '#FBB017',
  },
  linkYellow: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FBB017',
  },
  textCenter: {
    textAlign: 'center',
    fontSize: 16,
    color: '#1F2A36',
  },

})