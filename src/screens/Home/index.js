import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, ImageBackground, TextInput } from 'react-native';
import axios from 'axios';
import Bell from '../../assets/bell.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import dayjs from 'dayjs';
import api from '../../configs/api';


const Home = ({ navigation }) => {
    const [worker, setWorker] = useState([]);
    const [myProfile, setMyProfile] = useState({})
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
    });

    const checkRole = async () => {
        try {
            const res = await api.get(`/auth/checkrole`);

            const { role } = res.data.data[0]

            return role

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.message || 'Something went wrong'
            });
        }
    }

    const getWorker = async () => {
        try {
            const res = await api.get(`/workers/`, { params });

            const { data } = res.data;

            setWorker(current => [...current, ...data])

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

    const getMyProfile = async (type) => {
        try {
            const res = await api.get(`/${type}/profile`);

            if (type === 'recruiters') {
                setMyProfile(res.data.data[0])
                return
            }

            setMyProfile(res.data.data)

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.message
            });
        }
    }

    useEffect(() => {
        const getRole = async () => {
            const role = await checkRole();
            if (role === 'Recruiter') {
                await getMyProfile('recruiters');
            } else {
                await getMyProfile('workers');
            }
        };

        getRole();
        getWorker();
    }, [params]);

    const renderLoader = () => {
        return <ActivityIndicator size="large" color="#5E50A1" />;
    };

    const loadMoreItem = () => {
        setParams(current => ({
            ...current,
            page: current.page + 1,
        }));
    };

    const formattedDate = dayjs().format('dddd, D MMMM YYYY');

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../assets/home-background.png')} style={{ paddingTop: 80, paddingBottom: 32, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', borderBottomRightRadius: 24, }} resizeMode='cover'>
                <View style={{ gap: 8 }}>
                    <Text style={{ fontWeight: 500, fontSize: 16, color: '#FFFFFF' }}>{formattedDate}</Text>
                    <Text style={{ fontWeight: 500, fontSize: 26, color: '#FFFFFF' }}>Hi, {myProfile.name}!</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate(`notification`)}>
                    <Bell />
                </TouchableOpacity>
            </ImageBackground>
            <View style={{ paddingHorizontal: 16, gap: 16, paddingBottom: 250 }}>
                <Text style={{ fontWeight: 600, fontSize: 18, color: '#1F2A36' }}>Top Talents</Text>
                <FlatList
                    data={worker}
                    keyExtractor={(item, index) => `${item.id}_${index}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate(`worker-profile`, { id: item.id })} style={styles.card}>
                            {item.photo ? <Image source={{ uri: item.photo }} style={styles.cardImage} /> : <Image source={require('../../assets/user-thumbnail.jpg')} style={styles.cardImage} />}
                            <View style={{ gap: 4 }}>
                                {item.name && <Text style={styles.cardName}>{item.name}</Text>}
                                {item.position && <Text style={styles.cardJob}>{item.position}</Text>}
                                {item.skills && (
                                    <View style={styles.skillsContainer}>
                                        {item.skills.map((skill, index) => (
                                            <View key={index} style={styles.skillItem}>
                                                <Text style={styles.skillText}>{skill}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    )}
                    ListFooterComponent={renderLoader}
                    onEndReached={loadMoreItem}
                    onEndReachedThreshold={0}
                />
            </View>
            <Toast />
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F7F8',
        gap: 20
    },
    searchSortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 16,
        gap: 5
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    searchButton: {
        backgroundColor: '#5E50A1',
        height: 40,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        justifyContent: 'center',
    },
    searchButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    header: {
        backgroundColor: '#5E50A1',
        padding: 20,
    },
    headerText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 4,
        gap: 20,
        alignItems: 'center',
        width: '100%',
        marginVertical: 5,
    },
    cardImage: {
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    cardName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardJob: {
        fontSize: 14,
    },
    cardLocation: {
        fontSize: 14,
    },
    cardSkills: {
        fontSize: 12,
        color: '#666',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    skillItem: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: '#FBB017',
        borderColor: '#FBB017',
        borderWidth: 1,
        borderRadius: 4,
    },
    skillText: {
        fontWeight: '600',
        fontSize: 12,
        color: '#FFFFFF',
    },

});