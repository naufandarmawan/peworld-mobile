import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

import FormContainer from '../../components/module/formcontainer';
import Input from '../../components/base/input';
import Button from '../../components/base/button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import PurpleLogo from '../../assets/purple-logo.svg'


const WorkerLogin = ({ navigation }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `https://fwm17-be-peword.vercel.app/v1/auth/login`,
        form,
      );

      const { data } = res.data;
      await AsyncStorage.setItem('token', data.token);
      navigation.navigate('main-tab');
      Toast.show({
        type: 'success',
        text1: res.data.status,
        text2: res.data.message
      });
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
          <FormContainer formTitle='Login' formDescription='Lorom ipsum dolor si amet uegas anet.'>
            <View style={styles.inputContainer}>
              <Input
                value={form.email}
                onChangeText={value => setForm({ ...form, email: value })}
                label="Email"
                placeholder="Masukan alamat email"
              />
              <Input
                value={form.password}
                onChangeText={value => setForm({ ...form, password: value })}
                secureTextEntry={true}
                label="Password"
                placeholder="Masukan kata sandi"
              />
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('')}>
                <Text style={styles.link}>Lupa kata sandi?</Text>
              </TouchableOpacity>
              <Button variant='primary-yellow' onPress={handleLogin} text='Masuk' />
              <Text style={styles.textCenter}>Anda belum punya akun?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('worker-register')}>
                <Text style={styles.linkYellow}>Daftar sebagai talent</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('recruiter-register')}>
                <Text style={styles.linkYellow}>Daftar sebagai recruiter</Text>
              </TouchableOpacity>
            </View>
          </FormContainer>
        </View>
      </View>
      <Toast />
    </ScrollView>
  )
}

export default WorkerLogin

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