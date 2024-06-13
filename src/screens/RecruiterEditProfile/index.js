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

const RecruiterEditProfile = ({ navigation }) => {
  const [form, setForm] = useState({
    company: '',
    position: '',
    city: '',
    description: '',
    phone: '',
    instagram: '',
    linkedin: '',
    photo: '',
    email: ''
  });

  const [myProfile, setMyProfile] = useState({})

  const getMyProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token')

      const res = await axios.get(`https://fwm17-be-peword.vercel.app/v1/recruiters/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const profileData = res.data.data

      setMyProfile(profileData)
      setForm({
        company: profileData.company || '',
        position: profileData.position || '',
        city: profileData.city || '',
        description: profileData.description || '',
        phone: profileData.phone || '',
        instagram: profileData.instagram || '',
        linkedin: profileData.linkedin || '',
        photo: profileData.photo || '',
        email: profileData.email || ''
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
      const token = await AsyncStorage.getItem('token')

      const res = await axios.put(`https://fwm17-be-peword.vercel.app/v1/recruiters/profile`, form, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

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
      console.log(data);


      const formData = new FormData();

      const dataImage = {
        uri: data.uri,
        name: data.fileName,
        filename: data.fileName,
        type: data.type,
      };

      console.log(dataImage);

      formData.append('file', {
        uri: data.uri,
        name: data.fileName,
        filename: data.fileName,
        type: data.type,
      });

      const result = await axios.post(
        'https://fwm17-be-peword.vercel.app/v1/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const image = result.data.data.file_url
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
            <Image source={{ uri: `${myProfile.photo}` }} style={styles.profileImage} />
            <TouchableOpacity onPress={handleChangeImage}>
              <Text style={{ fontWeight: 600, fontSize: 22, color: '#9EA0A5' }}>Edit</Text>
            </TouchableOpacity>
            <View style={styles.profileText}>
              <Text style={{ fontWeight: 600, fontSize: 22, color: '#1F2A36' }}>{myProfile.company}</Text>
              <Text style={{ fontWeight: 400, fontSize: 14, color: '#1F2A36' }}>{myProfile.position}</Text>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <GreyPin />
                <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.city}</Text>
              </View>
              <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{myProfile.description}</Text>
            </View>
          </View>
        </View>

        <View style={{ gap: 20 }}>
          <Button variant='primary-purple' style={styles.button} onPress={handleSave} text='Simpan' />
          <Button variant='secondary-purple' style={styles.button} onPress={() => navigation.navigate('worker-profile')} text='Batal' />
        </View>

        <View style={styles.profileTabContainer}>
          <Text style={styles.skillsTitle}>Data Diri</Text>
          <View style={{ gap: 10 }}>
            <Input
              value={form.company}
              onChangeText={value => setForm({ ...form, company: value })}
              label="Nama Perusahaan"
              placeholder="Masukan bidang perusahaan ex: Financial"
            />
            <Input
              value={form.position}
              onChangeText={value => setForm({ ...form, position: value })}
              label="Bidang"
              placeholder="Masukan job desk"
            />
            <Input
              value={form.city}
              onChangeText={value => setForm({ ...form, city: value })}
              label="Kota"
              placeholder="Masukan kota"
            />
            <Input
              value={form.description}
              onChangeText={value => setForm({ ...form, description: value })}
              label="Deskripsi singkat"
              placeholder="Tuliskan deskripsi singkat"
            />
            <Input
              value={form.phone}
              onChangeText={value => setForm({ ...form, phone: value })}
              label="Nomor Telepon"
              placeholder="Masukan nomor telepon"
            />
            <Input
              value={form.instagram}
              onChangeText={value => setForm({ ...form, instagram: value })}
              label="Instagram"
              placeholder="Masukan instagram"
            />
            <Input
              value={form.linkedin}
              onChangeText={value => setForm({ ...form, linkedin: value })}
              label="Linkedin"
              placeholder="Masukan Linkedin"
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