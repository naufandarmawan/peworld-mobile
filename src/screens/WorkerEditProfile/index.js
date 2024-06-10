import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../../components/base/button'
import Input from '../../components/base/input'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GreyPin from '../../assets/grey-pin.svg'


const WorkerEditProfile = () => {
  const [myProfile, setMyProfile] = useState({})
  const [mySkills, setMySkills] = useState([])
  const [myPortfolio, setMyPortfolio] = useState([]);
  const [myExperience, setMyExperience] = useState([]);

  const getMyProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token')

      const res = await axios.get(`https://fwm17-be-peword.vercel.app/v1/workers/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setMyProfile(res.data.data)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data.message || 'Something went wrong'
      });
    }
  }

  const getMySkills = async () => {
    try {
      const token = await AsyncStorage.getItem('token')

      const res = await axios.get(`https://fwm17-be-peword.vercel.app/v1/skills/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setMySkills(res.data.data)
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
    getMyProfile();
    getMySkills();
    getMyPortfolio()
    getMyExperience()
  }, [])

  // useEffect(() => {
  //   if (!profile.id || myProfile.id === profile.id) {
  //     setProfile(myProfile);
  //     setSkills(mySkills);
  //     setPortfolio(myPortfolio)
  //     setExperience(myExperience)
  //   }
  // }, [profile, myProfile, skills, mySkills, portfolio, myPortfolio, experience, myExperience]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <View style={styles.profileDetails}>
            <Image source={{ uri: `${myProfile.photo}` }} style={styles.profileImage} />
            <View style={styles.profileText}>
              <Text style={{ fontWeight: 600, fontSize: 22, color: '#1F2A36' }}>{myProfile.name}</Text>
              <Text style={{ fontWeight: 400, fontSize: 14, color: '#1F2A36' }}>{myProfile.job_desk}</Text>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <GreyPin />
                <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.domicile}</Text>
              </View>
              <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.workplace}</Text>
              <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.description}</Text>
            </View>
          </View>
        </View>

        <View style={{ gap: 20 }}>
          <Button variant='primary-purple' style={styles.button} onPress={() => navigation.navigate('')} text='Simpan' />
          <Button variant='secondary-purple' style={styles.button} onPress={() => navigation.goBack()} text='Batal' />
        </View>

        <View style={styles.profileTabContainer}>
          <Text style={styles.skillsTitle}>Skill</Text>
          <View style={{}}>
            <Input />
            <Input />
            <Input />
          </View>
        </View>

        <View style={styles.profileTabContainer}>
          <Text style={styles.skillsTitle}>Skill</Text>
          <View style={{}}>
            <Input />
            <Input />
            <Input />
          </View>
        </View>

        <View style={styles.profileTabContainer}>
          <Text style={styles.skillsTitle}>Skill</Text>
          <View style={{}}>
            <Input />
            <Input />
            <Input />
          </View>
        </View>

        <View style={styles.profileTabContainer}>
          <View style={{}}>
            <Input />
            <Input />
            <Input />
          </View>
        </View>

      </View>
      <Toast />
    </ScrollView>
  )
}

export default WorkerEditProfile

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
  },
  profileText: {
    width: '100%',
    alignItems: 'left',
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