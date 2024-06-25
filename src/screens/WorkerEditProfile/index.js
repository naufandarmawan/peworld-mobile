import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../../components/base/button'
import Input from '../../components/base/input'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GreyPin from '../../assets/grey-pin.svg'
import ProfileSkill from '../../components/module/ProfileSkill'
import ProfileExperience from '../../components/module/ProfileExperience'
import ProfilePortfolio from '../../components/module/ProfilePortfolio'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import api from '../../configs/api'

import { useSelector, useDispatch } from 'react-redux';
import { setProfile } from '../../configs/redux/reducers/profileReducer';


const WorkerEditProfile = ({ navigation }) => {
  const dispatch = useDispatch()

  const myProfile = useSelector((state) => state.profile);

  const [form, setForm] = useState({
    name: myProfile.name || '',
    position: myProfile.position || '',
    location: myProfile.location || '',
    workplace: myProfile.workplace || '',
    description: myProfile.description || '',
    photo: myProfile.photo || '',
  });

  // const [myProfile, setMyProfile] = useState({})

  const getMyProfile = async () => {
    try {

      const res = await api.get(`/workers/profile/`);

      const profileData = res.data.data

      dispatch(setProfile(profileData))

      // console.log(myProfile);

      // setMyProfile(profileData)

      // setForm({
      //   name: profileData.name || '',
      //   position: profileData.position || '',
      //   location: profileData.location || '',
      //   workplace: profileData.workplace || '',
      //   description: profileData.description || '',
      //   photo: profileData.photo || '',
      // })
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

      const res = await api.put(`workers/profile`, {
          name: form.name,
          position: form.position,
          location: form.location,
          workplace: form.workplace,
          description: form.description,
        })

      getMyProfile()

      Toast.show({
        type: 'success',
        text1: res.data.status,
        text2: res.data.message
      });

      navigation.navigate('my-worker-profile')

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data.message || 'Something went wrong'
      });
    }
  }

  const handleChangeLibrary = async () => {
    try {
      const res = await launchImageLibrary(null);

      if (res.didCancel) {
        return;
      }

      const data = res.assets[0];

      const maxFileSize = 5 * 1024 * 1024;

      const mediaTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (data.fileSize > maxFileSize) {
        Toast.show({
          type: 'error',
          text1: 'File too large',
          text2: 'Please select a file smaller than 5 MB.'
        });
        return;
      }

      if (!mediaTypes.includes(data.type)) {
        Toast.show({
          type: 'error',
          text1: 'Invalid file type',
          text2: 'Please select a valid image file (JPEG, PNG).'
        });
        return;
      }

      const formData = new FormData();

      const dataImage = {
        uri: data.uri,
        name: data.fileName,
        filename: data.fileName,
        type: data.type,
      };

      formData.append('file', dataImage);

      const result = await api.put(
        `/workers/profile/photo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      Toast.show({
        type: 'success',
        text1: result.data.status,
        text2: result.data.message
      });

      getMyProfile()

    } catch (error) {
      console.log(error?.response.data);
    }
  };

  const handleChangeCamera = async () => {
    try {
      const res = await launchCamera(null);

      if (res.didCancel) {
        return;
      }

      const data = res.assets[0];

      const maxFileSize = 5 * 1024 * 1024;

      const mediaTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (data.fileSize > maxFileSize) {
        Toast.show({
          type: 'error',
          text1: 'File too large',
          text2: 'Please select a file smaller than 5 MB.'
        });
        return;
      }

      if (!mediaTypes.includes(data.type)) {
        Toast.show({
          type: 'error',
          text1: 'Invalid file type',
          text2: 'Please select a valid image file (JPEG, PNG).'
        });
        return;
      }

      const formData = new FormData();

      const dataImage = {
        uri: data.uri,
        name: data.fileName,
        filename: data.fileName,
        type: data.type,
      };

      formData.append('file', dataImage);

      const result = await api.put(
        `/workers/profile/photo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      Toast.show({
        type: 'success',
        text1: result.data.status,
        text2: result.data.message
      });

      getMyProfile()

    } catch (error) {
      console.log(error?.response.data);
    }
  };

  // useEffect(() => {
  //   getMyProfile();
  // }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <View style={styles.profileDetails}>
            <Image source={{ uri: `${myProfile.photo}` }} style={styles.profileImage} />
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <TouchableOpacity onPress={handleChangeLibrary}>
                <Text style={{ fontWeight: 600, fontSize: 22, color: '#9EA0A5' }}>Open Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleChangeCamera}>
                <Text style={{ fontWeight: 600, fontSize: 22, color: '#9EA0A5' }}>Open Camera</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profileText}>
              <Text style={{ fontWeight: 600, fontSize: 22, color: '#1F2A36' }}>{myProfile.name}</Text>
              <Text style={{ fontWeight: 400, fontSize: 14, color: '#1F2A36' }}>{myProfile.position}</Text>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <GreyPin />
                <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.location}</Text>
              </View>
              <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.workplace}</Text>
              <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.description}</Text>
            </View>
          </View>
        </View>

        <View style={{ gap: 20 }}>
          <Button variant='primary-purple' style={styles.button} onPress={handleSave} text='Simpan' />
          <Button variant='secondary-purple' style={styles.button} onPress={() => navigation.navigate('my-worker-profile')} text='Batal' />
        </View>

        <View style={styles.profileTabContainer}>
          <Text style={styles.skillsTitle}>Data Diri</Text>
          <View style={{ gap: 10 }}>
            <Input
              value={form.name}
              onChangeText={value => setForm({ ...form, name: value })}
              label="Nama lengkap"
              placeholder="Masukan nama lengkap"
            />
            <Input
              value={form.position}
              onChangeText={value => setForm({ ...form, position: value })}
              label="Job title"
              placeholder="Masukan job title"
            />
            <Input
              value={form.location}
              onChangeText={value => setForm({ ...form, location: value })}
              label="Domisili"
              placeholder="Masukan domisili"
            />
            <Input
              value={form.workplace}
              onChangeText={value => setForm({ ...form, workplace: value })}
              label="Tempat kerja"
              placeholder="Masukan tempat kerja"
            />
            <Input
              value={form.description}
              onChangeText={value => setForm({ ...form, description: value })}
              label="Deskripsi singkat"
              placeholder="Tuliskan deskripsi singkat"
            />
          </View>
        </View>

        <ProfileSkill />

        <ProfileExperience />

        <ProfilePortfolio />

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