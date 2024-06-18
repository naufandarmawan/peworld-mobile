import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import IcHome from '../../assets/icons/icHome.svg'
import IcSearch from '../../assets/icons/icSearch.svg'
import IcInbox from '../../assets/icons/icInbox.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../configs/api';


const MyTabBar = ({ state, descriptors, navigation }) => {
    const [myProfile, setMyProfile] = useState({})

    const checkRole = async () => {
        try {
            const res = await api.get(`/auth/checkrole`);

            const { role } = res.data.data[0]
            return role

        } catch (error) {
            console.log(error?.response.data);
        }
    }

    const getMyProfile = async (type) => {
        try {
            const res = await api.get(`/${type}/profile`);

            if (type === 'recruiters') {
                setMyProfile(res.data.data[0])
                return
            }

            setMyProfile(res.data.data)

        } catch (error) {
            // if (error.response.data.message && error.response.data.message.includes('Expired')) {
            //     navigation.navigate('option-login')
            // }

            console.log(error?.response.data);

        }
    }

    useEffect(() => {
        const fetchRoleAndProfile = async () => {
            const role = await checkRole();
            if (role === 'Recruiter') {
                await getMyProfile('recruiters');
            } else {
                await getMyProfile('workers');
            }
        };

        fetchRoleAndProfile();
        
    }, [myProfile]);

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const Icon = () => {
                    if (label === 'Home') return <IcHome stroke={isFocused ? '#673ab7' : '#222'} />
                    if (label === 'Search') return <IcSearch stroke={isFocused ? '#673ab7' : '#222'} />
                    if (label === 'Inbox') return <IcInbox stroke={isFocused ? '#673ab7' : '#222'} />
                    if (label === 'Profile') {
                        return myProfile.photo ? (
                            <Image
                                source={{ uri: myProfile.photo }}
                                style={[
                                    styles.profileImage,
                                    { borderColor: isFocused ? '#673ab7' : '#222' }
                                ]}
                            />
                        ) : (
                            <View
                                style={[
                                    styles.defaultProfileIcon,
                                    { backgroundColor: isFocused ? '#673ab7' : '#222' }
                                ]}
                            />
                        );
                    }
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, alignItems: 'center' }}
                    >
                        <Icon />
                        {/* <Text style={{ color: isFocused ? '#673ab7' : '#222', textAlign: 'center' }}>{label}</Text> */}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default MyTabBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 24,
        paddingHorizontal: 24,
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16
    },
    profileImage: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
    },
    defaultProfileIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
}); 