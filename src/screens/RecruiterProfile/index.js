import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../../components/base/button'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GreyPin from '../../assets/grey-pin.svg'
import GreyMail from '../../assets/grey-mail.svg'
import GreyInstagram from '../../assets/grey-instagram.svg'
import GreyPhone from '../../assets/grey-phone.svg'
import GreyLinkedin from '../../assets/grey-linkedin.svg'
import api from '../../configs/api'

const RecruiterProfile = ({ navigation }) => {

  const [myProfile, setMyProfile] = useState({})

  const getMyProfile = async () => {
    try {

      const res = await api.get(`/recruiters/profile`);

      setMyProfile(res.data.data[0])

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data.message || 'Something went wrong'
      });
    }
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    navigation.navigate('option-login')
  };

  useEffect(() => {
    getMyProfile();
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <View style={styles.profileDetails}>
            <Image source={{ uri: `${myProfile.photo}` }} style={styles.profileImage} />
            <View style={styles.profileText}>
              <Text style={{ fontWeight: 600, fontSize: 22, color: '#1F2A36' }}>{myProfile.company}</Text>
              <Text style={{ fontWeight: 400, fontSize: 14, color: '#1F2A36' }}>{myProfile.industry}</Text>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <GreyPin />
                <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.location}</Text>
              </View>
              <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.description}</Text>
            </View>
            <Button variant='primary-purple' style={styles.button} onPress={() => navigation.navigate('recruiter-edit-profile')} text='Edit' />
          </View>

          <View style={styles.socialContainer}>
            {myProfile.email &&
              <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                <GreyMail />
                <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.email}</Text>
              </View>
            }
            {myProfile.instagram &&
              <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                <GreyInstagram />
                <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.instagram}</Text>
              </View>
            }
            {myProfile.phone &&
              <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                <GreyPhone />
                <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.phone}</Text>
              </View>
            }
            {myProfile.linkedin &&
              <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                <GreyLinkedin />
                <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.linkedin}</Text>
              </View>
            }
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ marginTop: 20, fontWeight: 600, fontSize: 22, color: '#1F2A36', textAlign: 'center' }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </ScrollView>
  )
}

export default RecruiterProfile

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
    paddingBottom: 210,
  },
  profileContainer: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 10,
    marginBottom: 30,
  },
  profileDetails: {
    alignItems: 'center',
    marginBottom: 34,
  },
  profileText: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12
  },
  button: {
    width: '100%',
    marginTop: 20,
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
    gap: 24
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