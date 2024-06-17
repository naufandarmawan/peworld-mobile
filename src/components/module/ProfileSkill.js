import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../../components/base/button'
import Input from '../../components/base/input'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../configs/api'

const ProfileSkill = () => {
    const [skillForm, setSkillForm] = useState('')
    const [mySkills, setMySkills] = useState([])

    const getMySkills = async () => {
        try {

            const res = await api.get(`/skill/`);

            setMySkills(res.data.data)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.message || 'Something went wrong'
            });
        }
    }

    const handleAddSkill = async () => {
        try {

            const res = await api.post(`/skill`, { skill_name: skillForm });

            Toast.show({
                type: 'success',
                text1: res.data.status,
                text2: res.data.message
            });

            setSkillForm('')
            getMySkills()

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.message || 'Something went wrong'
            });
        }
    }

    const handleDeleteSkill = async (id) => {
        try {

            const res = await api.delete(`/skill/${id}`);

            Toast.show({
                type: 'success',
                text1: res.data.status,
                text2: res.data.message
            });

            getMySkills()

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.message || 'Something went wrong'
            });
        }
    }

    useEffect(() => {
        getMySkills()
    }, [])

    return (
        <View style={styles.profileTabContainer}>
            <Text style={styles.skillsTitle}>Skill</Text>
            <View style={{ gap: 10 }}>
                <Input label='' placeholder='Masukkan skill' value={skillForm} onChangeText={(value) => setSkillForm(value)} />
                <Button variant='primary-yellow' text="Tambah" onPress={handleAddSkill} />
                <View style={{ flexDirection: 'column', gap: 10 }}>
                    {mySkills.map((item) => (
                        <View
                            key={item.id}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    paddingHorizontal: 12,
                                    paddingVertical: 4,
                                    backgroundColor: '#FDD074',
                                    borderColor: '#FBB017',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: '600',
                                        fontSize: 12,
                                        color: '#FFFFFF',
                                    }}
                                >
                                    {item.skill_name}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => handleDeleteSkill(item.id)}>
                                <Text style={{ color: 'red' }}>X</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>

        </View>
    )
}

export default ProfileSkill

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6F7F8',

    },
    header: {
        backgroundColor: '#5E50A1',
        height: 361,
    },
    content: {
        paddingHorizontal: 30,
        paddingTop: 70,
        paddingBottom: 70,
        gap: 40
    },
    profileContainer: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
        borderRadius: 10,
    },
    profileDetails: {
        alignItems: 'center',
        gap: 20,
    },
    profileText: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20,
        gap: 12
    },
    button: {
        width: '100%',
    },
    skillsContainer: {
        marginBottom: 34,
    },
    skillsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1F2A36',
        marginBottom: 20,
    },
    skillsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10
    },
    socialContainer: {
        marginBottom: 34,
    },
    profileTabContainer: {
        backgroundColor: '#FFFFFF',
        padding: 30,
        borderRadius: 10,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 150,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tab: {
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: 20,
    },
    activeTabText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#1F2A36',
    },
    inactiveTabText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#9EA0A5',
    },
    activeTabIndicator: {
        height: 4,
        backgroundColor: '#5E50A1',
        borderRadius: 2,
        marginTop: 5,
    },
    inactiveTabIndicator: {
        height: 4,
        backgroundColor: 'transparent',
        borderRadius: 2,
        marginTop: 5,
    },
    contentContainer: {
        flex: 1,
        marginTop: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    list: {
        flexDirection: 'column',
        gap: 20,
    },
    image: {
        width: '100%',
        aspectRatio: 4 / 3,
        resizeMode: 'cover',
        borderRadius: 4
    },
    companyLogo: {
        width: '40',
        aspectRatio: 1 / 1,
        resizeMode: 'cover',
    },
});