import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

import FormContainer from '../../components/module/formcontainer';
import Input from '../../components/base/input';
import Button from '../../components/base/button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import PurpleLogo from '../../assets/purple-logo.svg'

const ForgotPassword = ({ navigation }) => {

    const { email, resetCode } = route.params

    const [form, setForm] = useState({
        email: email || '',
        resetCode: resetCode || '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleRequest = async () => {
        try {

            if (!form.newPassword || !form.confirmPassword) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Borang harus diisi',
                });
                return;
            }

            if (form.newPassword !== form.confirmPassword) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Passwords do not match',
                });
                return;
            }

            const { email, resetCode, newPassword } = form;

            const res = await axios.post(
                `https://fwm17-be-peword.vercel.app/v1/auth/login`,
                { email, resetCode, newPassword }
            );

            Toast.show({
                type: 'success',
                text1: res.data.status,
                text2: res.data.message
            });

            navigation.navigate('worker-login');

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
                    <FormContainer formTitle='Reset password' formDescription='You need to change your password to activate your account.'>
                        <View style={styles.inputContainer}>
                            <Input
                                value={form.newPassword}
                                onChangeText={value => setForm({ ...form, resetCode: value })}
                                label="Kata sandi baru"
                                placeholder="Masukan kata sandi baru"
                            />
                            <Input
                                value={form.resetCode}
                                onChangeText={value => setForm({ ...form, resetCode: value })}
                                label="Konfirmasi kata sandi baru"
                                placeholder="Masukan kata sandi baru"
                            />
                        </View>
                        <View style={styles.actionContainer}>
                            <Button variant='primary-yellow' onPress={handleRequest} text='Reset password' />
                        </View>
                    </FormContainer>
                </View>
            </View>
            <Toast />
        </ScrollView>
    )
}

export default ForgotPassword

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