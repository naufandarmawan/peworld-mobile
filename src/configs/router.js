import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
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
import RecruiterProfile from '../screens/RecruiterProfile';
import RecruiterEditProfile from '../screens/RecruiterEditProfile';

import MyTabBar from '../components/module/tabbar';

const Tab = createBottomTabNavigator()
const stack = createNativeStackNavigator()

const MainTab = () => {
    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />} initialRouteName='Profile' screenOptions={{
            headerShown: false,
        }}>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name='Search' component={Search} />
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

const ProfileStack = () => {
    return (
        <stack.Navigator initialRouteName='recruiter-profile' screenOptions={{
            headerShown: false,
        }}>
            <stack.Screen name='worker-profile' component={WorkerProfile} />
            <stack.Screen name='worker-edit-profile' component={WorkerEditProfile} />

            <stack.Screen name='recruiter-profile' component={RecruiterProfile} />
            <stack.Screen name='recruiter-edit-profile' component={RecruiterEditProfile} />
        </stack.Navigator>
    )
}

const MainRouter = () => {
    return (
        <NavigationContainer>
            <stack.Navigator initialRouteName='main-tab' screenOptions={{
                headerShown: false,
            }}>
                <stack.Screen name='option-login' component={OptionLogin} />
                <stack.Screen name='worker-login' component={WorkerLogin} />
                <stack.Screen name='recruiter-login' component={RecruiterLogin} />
                <stack.Screen name='worker-register' component={WorkerRegister} />
                <stack.Screen name='recruiter-register' component={RecruiterRegister} />

                <stack.Screen name='main-tab' component={MainTab} />

            </stack.Navigator>
        </NavigationContainer>
    )
}

export default MainRouter