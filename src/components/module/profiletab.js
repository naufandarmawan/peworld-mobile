import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileTab = ({route}) => {
    const [toggle, setToggle] = useState(1);

    const [portfolio, setPortfolio] = useState([]);
    const [experience, setExperience] = useState([]);
    const [myPortfolio, setMyPortfolio] = useState([]);
    const [myExperience, setMyExperience] = useState([]);

    const handleToggle = (id) => {
        setToggle(id);
    };

    const handleNavigate = (link) => {
        Linking.openURL(link);
    };

    const getExperience = async () => {
        try {
            const { id } = route.params

            const res = await axios.get(`https://fwm17-be-peword.vercel.app/v1/experience/${id}`);

            setExperience(res.data.data)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.message || 'Something went wrong'
            });
        }
    }

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

    const getPortfolio = async () => {
        try {
            const { id } = route.params

            const res = await axios.get(`https://fwm17-be-peword.vercel.app/v1/portfolio/${id}`);

            setPortfolio(res.data.data)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.message || 'Something went wrong'
            });
        }
    }

    const getMyPortfolio = async () => {
        try {
            const token = await AsyncStorage.getItem('token')

            const res = await axios.get(`https://fwm17-be-peword.vercel.app/v1/portfolio/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            setMyPortfolio(res.data.data)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.message || 'Something went wrong'
            });
        }
    }


    useEffect(() => {
        if (route.params && route.params.id) {
            getExperience();
            getPortfolio();
        }

        getMyExperience();
        getMyPortfolio();
    }, [])

    useEffect(() => {
        if (!experience || JSON.stringify(experience) === JSON.stringify(myExperience)) {
            setExperience(myExperience);
            setPortfolio(myPortfolio);
        }
    }, [experience, myExperience, portfolio, myPortfolio]);

    return (
       <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.tab} onPress={() => handleToggle(1)}>
                    <Text style={toggle === 1 ? styles.activeTabText : styles.inactiveTabText}>Portfolio</Text>
                    <View style={toggle === 1 ? styles.activeTabIndicator : styles.inactiveTabIndicator}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => handleToggle(2)}>
                    <Text style={toggle === 2 ? styles.activeTabText : styles.inactiveTabText}>Pengalaman Kerja</Text>
                    <View style={toggle === 2 ? styles.activeTabIndicator : styles.inactiveTabIndicator}></View>
                </TouchableOpacity>
            </View>

            {toggle === 1 && (
                <View style={styles.contentContainer}>
                    <View style={styles.grid}>
                        {portfolio.map((item) => (
                            <TouchableOpacity onPress={() => handleNavigate(item.link_repository)}>
                                <Image source={{ uri: item.image }} />
                                <Text>{item.application_name}</Text>
                            </TouchableOpacity>

                        ))}
                    </View>
                </View>
            )}

            {toggle === 2 && (
                <View style={styles.contentContainer}>
                    <View style={styles.list}>
                        {experience.map((item) => (
                            <View>
                                <Text>{item.position}</Text>
                                <Text>{item.company}</Text>
                                <Text>{item.work_month}</Text>
                                <Text>{item.work_year}</Text>
                                <Text>{item.description}</Text>
                            </View>

                        ))}
                    </View>
                </View>
            )}
            <Toast />
        </View>
    )
}

export default ProfileTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
});