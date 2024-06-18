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


const RecruiterRegister = ({ navigation }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
    position: '',
    phone: ''
  })

  const handleRegister = async () => {
    try {
      const { email, password, name, company, position, phone } = form;

      if (!email || !password || !name || !company || !position || !phone) {
        Toast.show({
          type: 'error',
          text1: 'Validation Error',
          text2: 'All fields are required'
        });
        return;
      }

      const res = await api.post(`/recruiters/register`, form);

      Toast.show({
        type: 'success',
        text1: res.data.status,
        text2: res.data.message
      });

      navigation.navigate('recruiter-login');

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
      <View style={styles.flexColumn}>
        <PurpleLogo />
        <FormContainer formTitle='Signup' formDescription='Lorom ipsum dolor si amet uegas anet.'>
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
            <Input
              value={form.name}
              onChangeText={value => setForm({ ...form, name: value })}
              label="Name"
              placeholder="Masukan nama panjang"
            />
            <Input
              value={form.company}
              onChangeText={value => setForm({ ...form, company: value })}
              label="Perusahaan"
              placeholder="Masukan nama perusahaan"
            />
            <Input
              value={form.position}
              onChangeText={value => setForm({ ...form, position: value })}
              label="Jabatan"
              placeholder="Posisi di perusahaan anda"
            />
            <Input
              value={form.phone}
              onChangeText={value => setForm({ ...form, phone: value })}
              label="Phone"
              placeholder="Masukan no handphone"
            />
          </View>
          <View style={styles.actionContainer}>
            <Button variant='primary-yellow' onPress={handleRegister} text='Daftar' />
            <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center' }}>
              <Text style={styles.textCenter}>Anda sudah punya akun?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('recruiter-login')}>
                <Text style={styles.linkYellow}>Masuk disini</Text>
              </TouchableOpacity>
            </View>
          </View>
        </FormContainer>
      </View>
      <Toast />
    </ScrollView>
  )
}

export default RecruiterRegister

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F8',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  flexColumn: {
    flex: 1,
    marginBottom: 60,
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