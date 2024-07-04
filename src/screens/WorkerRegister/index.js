import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

import FormContainer from '../../components/module/formcontainer';
import Input from '../../components/base/input';
import Button from '../../components/base/button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import PurpleLogo from '../../assets/purple-logo.svg'
import api from '../../configs/api';


const WorkerRegister = ({ navigation }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  })

  const handleRegister = async () => {
    try {
      const { email, password, name, phone } = form;

      if (!email || !password || !name || !phone) {
        Toast.show({
          type: 'error',
          text1: 'Validation Error',
          text2: 'All fields are required'
        });
        return;
      }

      const res = await api.post(`/workers/register`, form);

      Toast.show({
        type: 'success',
        text1: res.data.status,
        text2: res.data.message
      });

      navigation.navigate('worker-login');

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: "Error",
        text2: error.response.data.message
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.flexColumn}>
          <PurpleLogo />
          <FormContainer formTitle='Signup' formDescription='Access the latest career opportunities and expand your reach globally.'>
            <View style={styles.inputContainer}>
              <Input
                value={form.email}
                onChangeText={value => setForm({ ...form, email: value })}
                label="Email"
                placeholder="Enter your email address"
              />
              <Input
                value={form.password}
                onChangeText={value => setForm({ ...form, password: value })}
                secureTextEntry={true}
                label="Password"
                placeholder="Enter your password"
              />
              <Input
                value={form.name}
                onChangeText={value => setForm({ ...form, name: value })}
                label="Full Name"
                placeholder="Enter your full name"
              />
              <Input
                value={form.phone}
                onChangeText={value => setForm({ ...form, phone: value })}
                label="Phone Number"
                placeholder="Enter your phone number"
              />
            </View>
            <View style={styles.actionContainer}>
              <Button variant='primary-yellow' onPress={handleRegister} text='Register' />
              <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center' }}>
                <Text style={styles.textCenter}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('worker-login')}>
                  <Text style={styles.linkYellow}>Log in here</Text>
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

export default WorkerRegister

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