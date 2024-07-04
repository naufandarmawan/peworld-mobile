import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../base/input'
import Button from '../base/button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import api from '../../configs/api'
import CompanyLogo from '../../assets/company-logo2.svg'

import { useSelector, useDispatch } from 'react-redux';
import { setExperience } from '../../configs/redux/reducers/experienceReducer'


const ProfileExperience = () => {
    const dispatch = useDispatch()

    const [experienceForm, setExperienceForm] = useState({
        id: '',
        position: '',
        company: '',
        start_date: '',
        end_date: '',
        description: '',
    })

    // const [myExperience, setMyExperience] = useState([])
    const myExperience = useSelector((state) => state.experience);

    const getMyExperience = async () => {
        try {

            const res = await api.get(`/experience`);

            dispatch(setExperience(res.data.data))

            // setMyExperience(res.data.data)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.message || 'Something went wrong'
            });
        }
    }

    const addMyExperience = async () => {
        try {

            if (experienceForm.id) {
                const { id, created_at, updated_at, ...updateData } = experienceForm;

                const res = await api.put(`/experience/${experienceForm.id}`, updateData);

                Toast.show({
                    type: 'success',
                    text1: res.data.status,
                    text2: res.data.message
                });

                setExperienceForm({})
                getMyExperience()

            } else {
                const { id, created_at, updated_at, ...updateData } = experienceForm

                const res = await api.post(`/experience`, updateData);

                Toast.show({
                    type: 'success',
                    text1: res.data.status,
                    text2: res.data.message
                });

                setExperienceForm({})
                getMyExperience()
            }

        } catch (error) {
            console.log(error.response.data);

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.message || 'Something went wrong'
            });
        }
    }

    const deleteMyExperience = async (id) => {
        try {

            const res = await api.delete(`/experience/${id}`);

            getMyExperience()
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.message || 'Something went wrong'
            });
        }
    }

    const handleSelect = (experience) => {
        setExperienceForm(experience);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-US', options);
    };

    // useEffect(() => {
    //     getMyExperience()
    // }, [])

    return (
        <View style={{ backgroundColor: '#FFFFFF', padding: 30, borderRadius: 10, gap: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1F2A36', marginBottom: 20, }}>Work Experience</Text>
            <View style={{ gap: 10 }}>
                <Input
                    value={experienceForm.position}
                    onChangeText={value => setExperienceForm({ ...experienceForm, position: value })}
                    label="Position"
                    placeholder="Web Developer"
                />
                <Input
                    value={experienceForm.company}
                    onChangeText={value => setExperienceForm({ ...experienceForm, company: value })}
                    label="Company"
                    placeholder="PT Harus bisa"
                />
                <Input
                    value={experienceForm.start_date}
                    onChangeText={value => setExperienceForm({ ...experienceForm, start_date: value })}
                    label="Start Date"
                    placeholder="2022-01-15"
                />
                <Input
                    value={experienceForm.end_date}
                    onChangeText={value => setExperienceForm({ ...experienceForm, end_date: value })}
                    label="End Date"
                    placeholder="2022-06-30"
                />
                <Input
                    value={experienceForm.description}
                    onChangeText={value => setExperienceForm({ ...experienceForm, description: value })}
                    label="Brief Description"
                    placeholder="Describe your job"
                />
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#E2E5ED' }}></View>
            <Button text={experienceForm.id ? 'Update Work Experience' : 'Add Work Experience'} onPress={addMyExperience} />
            <View style={myExperience ? styles.container : styles.hidden}>
                {myExperience.map((item) => (
                    <View key={item.id} style={styles.item}>
                        <View style={{ flexDirection: 'row', gap: 20, flex: 1 }}>
                            <CompanyLogo />
                            {/* <Image source={require('../../assets/company-logo.png')} style={styles.companyLogo} /> */}
                            <View style={{ gap: 6, flex: 1 }}>
                                <Text style={{ fontWeight: 600, fontSize: 20, color: '#1F2A36' }}>{item.position}</Text>
                                <Text style={{ fontWeight: 400, fontSize: 18, color: '#46505C' }}>{item.company}</Text>
                                <Text style={{ fontWeight: 400, fontSize: 16, color: '#9EA0A5' }}>{formatDate(item.start_date)} - {formatDate(item.end_date)}</Text>
                                <Text style={{ fontWeight: 400, fontSize: 16, color: '#9EA0A5' }}>{item.duration_in_months} months</Text>
                                <Text style={{ fontWeight: 400, fontSize: 14, color: '#1F2A36' }}>{item.description}</Text>
                            </View>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <Button
                                variant='primary-yellow'
                                onPress={() => handleSelect(item)}
                                text='Select'
                            />
                            <Button
                                variant='secondary-yellow'
                                onPress={() => deleteMyExperience(item.id)}
                                text='Delete'
                            />
                        </View>
                    </View>
                ))}
            </View>
            <Toast />
        </View>
    )
}

export default ProfileExperience

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderColor: '#E2E5ED',
        paddingTop: 30,
        flexDirection: 'column',
        gap: 30, // Equivalent to gap-4 in tailwind (4 * 4)
    },
    hidden: {
        display: 'none',
    },
    item: {
        justifyContent: 'space-between',
        width: '100%',
        gap: 20,
        flex: 1
    },
    companyLogo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    position: {
        fontWeight: '600',
        fontSize: 20,
        color: '#1F2A36',
    },
    company: {
        fontWeight: '400',
        fontSize: 18,
        color: '#46505C',
    },
    workMonth: {
        fontWeight: '400',
        fontSize: 16,
        color: '#9EA0A5',
    },
    workYear: {
        fontWeight: '400',
        fontSize: 16,
        color: '#9EA0A5',
    },
    description: {
        fontWeight: '400',
        fontSize: 14,
        color: '#1F2A36',
    },
    buttonsContainer: {
        gap: 8,
        height: 'fit-content',
        flexDirection: 'column',
        width: '100%'
    },
});