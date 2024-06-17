import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home'
import OptionLogin from '../screens/OptionLogin';
import WorkerLogin from '../screens/WorkerLogin';
import WorkerRegister from '../screens/WorkerRegister';
import RecruiterLogin from '../screens/RecruiterLogin';
import RecruiterRegister from '../screens/RecruiterRegister';
import Notification from '../screens/Notification';
import Search from '../screens/Search';
import Inbox from '../screens/Inbox';
import WorkerProfile from '../screens/WorkerProfile';
import WorkerEditProfile from '../screens/WorkerEditProfile';
import MyWorkerProfile from '../screens/MyWorkerProfile';
import RecruiterProfile from '../screens/RecruiterProfile';
import RecruiterEditProfile from '../screens/RecruiterEditProfile';
import SplashScreen from '../screens/SplashScreen';
import { LogLevel, OneSignal } from 'react-native-onesignal';

import MyTabBar from '../components/module/tabbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ForgotPassword from '../screens/ForgotPassword';
import VerifyForgotPassword from '../screens/VerifyForgotPassword';
import RequestForgotPassword from '../screens/RequestForgotPassword';

const Tab = createBottomTabNavigator()
const stack = createNativeStackNavigator()

const MainTab = () => {
    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />} initialRouteName='Home' screenOptions={{
            headerShown: false,
        }}>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name='Search' component={SearchStack} />
            <Tab.Screen name='Inbox' component={Inbox} />
            <Tab.Screen name='Profile' component={ProfileStack} />

        </Tab.Navigator>
    )
}

const HomeStack = () => {
    return (
        <stack.Navigator initialRouteName='home' screenOptions={{
            headerShown: false,
        }}>
            <stack.Screen name='home' component={Home} />
            <stack.Screen name='notification' component={Notification} />
            <stack.Screen name='worker-profile' component={WorkerProfile} />
        </stack.Navigator>
    )
}

const SearchStack = () => {
    return (
        <stack.Navigator initialRouteName='search' screenOptions={{
            headerShown: false,
        }}>
            <stack.Screen name='search' component={Search} />
            <stack.Screen name='worker-profile' component={WorkerProfile} />
        </stack.Navigator>
    )
}

const ProfileStack = () => {
    // const [role, setRole] = useState(null);

    // useEffect(() => {
    //     const checkRole = async () => {
    //         try {
    //             const token = await AsyncStorage.getItem('token')

    //             const res = await axios.get(`https://fwm17-be-peword.vercel.app/v1/auth/check-role`, {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                 },
    //             });

    //             const { role } = res.data.data.data

    //             setRole(role)

    //         } catch (error) {
    //             console.log(error?.response.data);
    //         }
    //     }

    //     checkRole();
    // }, []);

    return (
        // <stack.Navigator initialRouteName={role === 'recruiter' ? 'recruiter-profile' : 'worker-profile'} screenOptions={{
        //     headerShown: false,
        // }}>
        <stack.Navigator initialRouteName='my-worker-profile' screenOptions={{
            headerShown: false,
        }}>
            <stack.Screen name='my-worker-profile' component={MyWorkerProfile} />
            <stack.Screen name='worker-edit-profile' component={WorkerEditProfile} />

            <stack.Screen name='recruiter-profile' component={RecruiterProfile} />
            <stack.Screen name='recruiter-edit-profile' component={RecruiterEditProfile} />
        </stack.Navigator>
    )
}

const MainRouter = () => {
    const navigation = useNavigation()

    // Remove this method to stop OneSignal Debugging
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize("81f21d3d-8fe1-4ebb-bad5-eefb4094ddd5");

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', (event) => {
        // console.log('OneSignal: notification clicked:', event);
        console.log(event.notification.additionalData)
        const userData = event.notification.additionalData.userData;
        console.log(userData);
        navigation.navigate('main-tab', {
            screen: 'Home',
            params: {
                screen: 'worker-profile',
                params: { userId: userData.userId },
            },
        })
    });

    return (
        <stack.Navigator initialRouteName='main-tab' screenOptions={{
            headerShown: false,
        }}>
            <stack.Screen name='splash-screen' component={SplashScreen} />
            <stack.Screen name='option-login' component={OptionLogin} />
            <stack.Screen name='worker-login' component={WorkerLogin} />
            <stack.Screen name='recruiter-login' component={RecruiterLogin} />
            <stack.Screen name='worker-register' component={WorkerRegister} />
            <stack.Screen name='recruiter-register' component={RecruiterRegister} />

            <stack.Screen name="request-forgot-password" component={RequestForgotPassword} />
            <stack.Screen name="verify-forgot-password" component={VerifyForgotPassword} />
            <stack.Screen name="forgot-password" component={ForgotPassword} />

            <stack.Screen name='main-tab' component={MainTab} />

        </stack.Navigator>
    )
}

export default MainRouter