import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import IcHome from '../../assets/icons/icHome.svg'
import IcSearch from '../../assets/icons/icSearch.svg'
import IcInbox from '../../assets/icons/icInbox.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import axios from 'axios';


const MyTabBar = ({ state, descriptors, navigation }) => {
    const [myProfile, setMyProfile] = useState({})

    const getProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const response = await axios.get(`https://fwm17-be-peword.vercel.app/v1/workers/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setMyProfile(response.data.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

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