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


const VerifyForgotPassword = ({ route, navigation }) => {

    const { email } = route.params

    const [form, setForm] = useState({
        email: email || '',
        resetCode:''
    });


    const handleRequest = async () => {
        try {

            if (!form.resetCode) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'All fields are required.',
                });
                return;
            }

            const res = await api.post(`/auth/verify-forgot-password`, form);

            Toast.show({
                type: 'success',
                text1: res.data.status,
                text2: res.data.message
            });

            navigation.navigate('forgot-password', form);

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
                    <FormContainer formTitle='Reset password' formDescription='Enter your PIN from your email to verify your Password Reset request.'>
                        <View style={styles.inputContainer}>
                            <Input
                                value={form.resetCode}
                                onChangeText={value => setForm({ ...form, resetCode: value })}
                                label="PIN"
                                placeholder="Enter your PIN"
                            />
                        </View>
                        <View style={styles.actionContainer}>
                            <Button variant='primary-yellow' onPress={handleRequest} text='Verify Request' />
                        </View>
                    </FormContainer>
                </View>
            </View>
            <Toast />
        </ScrollView>
    )
}

export default VerifyForgotPassword

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