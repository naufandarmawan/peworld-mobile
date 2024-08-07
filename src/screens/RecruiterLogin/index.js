import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

import FormContainer from '../../components/module/formcontainer';
import Input from '../../components/base/input';
import Button from '../../components/base/button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import PurpleLogo from '../../assets/purple-logo.svg'
import api from '../../configs/api';


const RecruiterLogin = ({ navigation }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async () => {
    try {

      if (!form.email || !form.password) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Email and password are required.',
        });
        return;
      }

      const res = await api.post(`/auth/login`, form);

      const { data } = res.data;
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);

      Toast.show({
        type: 'success',
        text1: res.data.status,
        text2: res.data.message
      });
      
      navigation.navigate('main-tab');

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data.message
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.flexColumn}>
          <PurpleLogo />
          <FormContainer formTitle='Login' formDescription='Facilitating efficient recruitment processes for businesses globally.'>
            <View style={styles.inputContainer}>
              <Input
                value={form.email}
                onChangeText={value => setForm({ ...form, email: value })}
                label="Email"
                placeholder="Enter email address"
              />
              <Input
                value={form.password}
                onChangeText={value => setForm({ ...form, password: value })}
                secureTextEntry={true}
                label="Password"
                placeholder="Enter password"
              />
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('request-forgot-password')}>
                <Text style={styles.link}>Forgot password?</Text>
              </TouchableOpacity>
              <Button variant='primary-yellow' onPress={handleLogin} text='Login' />
              <Button variant='secondary-yellow' onPress={() => navigation.navigate('worker-login')} text='Login as Worker' />
              <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center' }}>
                <Text style={styles.textCenter}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('recruiter-register')}>
                  <Text style={styles.linkYellow}>Register as recruiter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </FormContainer>
        </View>
      </View>
      <Toast />
    </ScrollView>
  )
}

export default RecruiterLogin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F8',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexColumn: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
  },
  actionContainer: {
    flex: 1,
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