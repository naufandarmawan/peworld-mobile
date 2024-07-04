import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../../components/base/button'
import Input from '../../components/base/input'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GreyPin from '../../assets/grey-pin.svg'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import GreyUpload from '../../assets/grey-upload.svg'
import GreyImage from '../../assets/grey-image.svg'
import GreySize from '../../assets/grey-size.svg'
import api from '../../configs/api'

const RecruiterEditProfile = ({ navigation }) => {

  const [form, setForm] = useState({
    photo: '',
    name: '',
    company: '',
    position: '',
    industry: '',
    location: '',
    description: '',
    phone: '',
    instagram: '',
    linkedin: '',
  });

  const [myProfile, setMyProfile] = useState({})

  const getMyProfile = async () => {
    try {

      const res = await api.get(`/recruiters/profile`);

      const profileData = res.data.data[0]

      setMyProfile(profileData)
      setForm({
        company: profileData.company || '',
        position: profileData.position || '',
        location: profileData.location || '',
        description: profileData.description || '',
        phone: profileData.phone || '',
        instagram: profileData.instagram || '',
        linkedin: profileData.linkedin || '',
        photo: profileData.photo || '',
        name: profileData.name || '',
        industry: profileData.industry || '',
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data.message || 'Something went wrong'
      });
    }
  }

  const handleSave = async () => {
    try {

      const res = await api.put(`/recruiters/profile`, form);

      Toast.show({
        type: 'success',
        text1: res.data.status,
        text2: res.data.message
      });

      navigation.navigate('recruiter-profile')

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data.message || 'Something went wrong'
      });
    }
  }

  const handleChangeImage = async () => {
    try {
      const res = await launchImageLibrary(null);

      if (res.didCancel) {
        return;
      }

      const data = res.assets[0];

      const formData = new FormData();

      const dataImage = {
        uri: data.uri,
        name: data.fileName,
        filename: data.fileName,
        type: data.type,
      };

      formData.append('file', {
        uri: data.uri,
        name: data.fileName,
        filename: data.fileName,
        type: data.type,
      });

      const result = await api.post(
        '/assets/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const image = result.data.data.file
      setForm({ ...form, photo: image });

    } catch (error) {
      console.log(error?.response.data);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <View style={styles.profileDetails}>
            {form.photo ? <Image source={{ uri: `${form.photo}` }} style={styles.profileImage} /> : <Image source={{ uri: `${myProfile.photo}` }} style={styles.profileImage} />}
            
            <TouchableOpacity onPress={handleChangeImage}>
              <Text style={{ fontWeight: 600, fontSize: 22, color: '#9EA0A5' }}>Change Photo</Text>
            </TouchableOpacity>
            <View style={styles.profileText}>
              <Text style={{ fontWeight: 600, fontSize: 22, color: '#1F2A36' }}>{myProfile.company}</Text>
              <Text style={{ fontWeight: 400, fontSize: 14, color: '#1F2A36' }}>{myProfile.industry}</Text>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <GreyPin />
                <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.location}</Text>
              </View>
              <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.description}</Text>
            </View>
          </View>
        </View>

        <View style={{ gap: 20 }}>
          <Button variant='primary-purple' style={styles.button} onPress={handleSave} text='Save' />
          <Button variant='secondary-purple' style={styles.button} onPress={() => navigation.navigate('recruiter-profile')} text='Cancel' />
        </View>

        <View style={styles.profileTabContainer}>
          <Text style={styles.skillsTitle}>Personal Information</Text>
          <View style={{ gap: 10 }}>
            <Input
              value={form.name}
              onChangeText={value => setForm({ ...form, name: value })}
              label="Name"
              placeholder="Enter your name"
            />
            {/* <Input
              value={form.position}
              onChangeText={value => setForm({ ...form, position: value })}
              label="Position"
              placeholder="Enter your position"
            /> */}
            <Input
              value={form.company}
              onChangeText={value => setForm({ ...form, company: value })}
              label="Company Name"
              placeholder="Enter company name (e.g., Financial)"
            />
            <Input
              value={form.industry}
              onChangeText={value => setForm({ ...form, industry: value })}
              label="Industry"
              placeholder="Enter industry"
            />
            <Input
              value={form.location}
              onChangeText={value => setForm({ ...form, location: value })}
              label="Location"
              placeholder="Enter location"
            />
            <Input
              value={form.description}
              onChangeText={value => setForm({ ...form, description: value })}
              label="Short Description"
              placeholder="Write a short description"
            />
            <Input
              value={form.phone}
              onChangeText={value => setForm({ ...form, phone: value })}
              label="Phone Number"
              placeholder="Enter phone number"
            />
            <Input
              value={form.instagram}
              onChangeText={value => setForm({ ...form, instagram: value })}
              label="Instagram"
              placeholder="Enter Instagram username"
            />
            <Input
              value={form.linkedin}
              onChangeText={value => setForm({ ...form, linkedin: value })}
              label="LinkedIn"
              placeholder="Enter LinkedIn profile"
            />
          </View>
        </View>

      </View>
      <Toast />
    </ScrollView>
  )
}

export default RecruiterEditProfile

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