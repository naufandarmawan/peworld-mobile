import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../base/input'
import Button from '../base/button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Toast from 'react-native-toast-message'


const ProfileExperience = () => {
    const [experienceForm, setExperienceForm] = useState({
        id: '',
        position: '',
        company: '',
        work_month: '',
        work_year: '',
        description: '',
    })
    const [myExperience, setMyExperience] = useState([])

    const getMyExperience = async () => {
        try {
            const token = await AsyncStorage.getItem('token')

            const res = await axios.get(`https://fwm17-be-peword.vercel.app/v1/experience`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            setMyExperience(res.data.data)
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
            const token = await AsyncStorage.getItem('token')

            if (experienceForm.id) {
                const { id, created_at, updated_at, ...updateData } = experienceForm;

                const res = await axios.put(`https://fwm17-be-peword.vercel.app/v1/experience/${experienceForm.id}`, updateData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                Toast.show({
                    type: 'success',
                    text1: res.data.status,
                    text2: res.data.message
                });

                setExperienceForm({})
                getMyExperience()

            } else {
                const { id, created_at, updated_at, ...updateData } = experienceForm

                const res = await axios.post(`https://fwm17-be-peword.vercel.app/v1/experience`, updateData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                Toast.show({
                    type: 'success',
                    text1: res.data.status,
                    text2: res.data.message
                });

                setExperienceForm({})
                getMyExperience()
            }

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.message || 'Something went wrong'
            });
        }
    }

    const deleteMyExperience = async (id) => {
        try {
            const token = await AsyncStorage.getItem('token')

            const res = await axios.delete(`https://fwm17-be-peword.vercel.app/v1/experience/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

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

    useEffect(() => {
        getMyExperience()
    }, [])

   

    return (
        <View style={{ backgroundColor: '#FFFFFF', padding: 30, borderRadius: 10, gap: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1F2A36', marginBottom: 20, }}>Pengalaman Kerja</Text>
            <View style={{ gap: 10 }}>
                <Input
                    value={experienceForm.position}
                    onChangeText={value => setExperienceForm({ ...experienceForm, position: value })}
                    label="Posisi"
                    placeholder="web developer"
                />
                <Input
                    value={experienceForm.company}
                    onChangeText={value => setExperienceForm({ ...experienceForm, company: value })}
                    label="Nama perusahaan"
                    placeholder="PT Harus bisa"
                />
                <Input
                    value={experienceForm.work_month}
                    onChangeText={value => setExperienceForm({ ...experienceForm, work_month: value })}
                    label="Bulan"
                    placeholder="Januari"
                />
                <Input
                    value={experienceForm.work_year}
                    onChangeText={value => setExperienceForm({ ...experienceForm, work_year: value })}
                    label="Tahun"
                    placeholder="2018"
                />
                <Input
                    value={experienceForm.description}
                    onChangeText={value => setExperienceForm({ ...experienceForm, description: value })}
                    label="Deskripsi singkat"
                    placeholder="Deskripsikan pekerjaan anda"
                />
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#E2E5ED' }}></View>
            <Button text={experienceForm.id ? 'Perbaharui Pengalaman Kerja' : 'Tambah Pengalaman Kerja'} onPress={addMyExperience} />
            <View style={myExperience ? styles.container : styles.hidden}>
                {myExperience.map((item) => (
                    <View key={item.id} style={styles.item}>
                        <View key={item.id} style={{ flexDirection: 'row', gap: 20 }}>
                            <Image source={require('../../assets/company-logo.png')} style={styles.companyLogo} />
                            <View style={{ gap: 6 }}>
                                <Text style={styles.position}>{item.position}</Text>
                                <Text style={styles.company}>{item.company}</Text>
                                <View style={{ flexDirection: 'row', gap: 4 }}>
                                    <Text style={styles.workMonth}>{item.work_month}</Text>
                                    <Text style={styles.workYear}>{item.work_year}</Text>
                                </View>
                                <Text style={styles.description}>{item.description}</Text>
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
        gap:20
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
        flexDirection:'column',
        width:'100%'
    },
});