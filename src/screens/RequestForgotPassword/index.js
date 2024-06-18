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


const RequestForgotPassword = ({ navigation }) => {
    
    const [form, setForm] = useState({
        email: '',
    });

    const handleRequest = async () => {
        try {

            if (!form.email) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Borang harus diisi',
                });
                return;
            }

            const res = await api.post(`/auth/request-forgot-password`, form);

            Toast.show({
                type: 'success',
                text1: res.data.status,
                text2: res.data.message
            });

            navigation.navigate('verify-forgot-password', form);

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
                    <FormContainer formTitle='Reset password' formDescription='Enter your password user account’s verified email and we will send you a password reset link.'>
                        <View style={styles.inputContainer}>
                            <Input
                                value={form.email}
                                onChangeText={value => setForm({ ...form, email: value })}
                                label="Email"
                                placeholder="Masukan alamat email"
                            />
                        </View>
                        <View style={styles.actionContainer}>
                            <Button variant='primary-yellow' onPress={handleRequest} text='Send password reset email' />
                        </View>
                    </FormContainer>
                </View>
            </View>
            <Toast />
        </ScrollView>
    )
}

export default RequestForgotPassword

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