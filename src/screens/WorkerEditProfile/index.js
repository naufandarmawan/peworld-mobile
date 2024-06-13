import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../../components/base/button'
import Input from '../../components/base/input'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GreyPin from '../../assets/grey-pin.svg'
import ProfileExperience from '../../components/module/ProfileExperience'
import ProfilePortfolio from '../../components/module/ProfilePortfolio'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



const WorkerEditProfile = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    job_desk: '',
    domicile: '',
    workplace: '',
    description: '',
    photo: '',
  });

  const [skillForm, setSkillForm] = useState('')

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

      const profileData = res.data.data

      setMyProfile(profileData)
      setForm({
        name: profileData.name || '',
        job_desk: profileData.job_desk || '',
        domicile: profileData.domicile || '',
        workplace: profileData.workplace || '',
        description: profileData.description || '',
        photo: profileData.photo || '',
      })
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

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token')

      const res = await axios.put(`https://fwm17-be-peword.vercel.app/v1/workers/profile`, {
        name: form.name,
        job_desk: form.job_desk,
        domicile: form.domicile,
        workplace: form.workplace,
        description: form.description,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      Toast.show({
        type: 'success',
        text1: res.data.status,
        text2: res.data.message
      });

      navigation.navigate('worker-profile')

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data.message || 'Something went wrong'
      });
    }
  }

  const handleAddSkill = async () => {
    try {
      const token = await AsyncStorage.getItem('token')

      const res = await axios.post(`https://fwm17-be-peword.vercel.app/v1/skills`, { skill_name: skillForm }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      Toast.show({
        type: 'success',
        text1: res.data.status,
        text2: res.data.message
      });

      setSkillForm('')
      getMySkills()

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data.message || 'Something went wrong'
      });
    }
  }

  const handleDeleteSkill = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token')

      const res = await axios.delete(`https://fwm17-be-peword.vercel.app/v1/skills/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      Toast.show({
        type: 'success',
        text1: res.data.status,
        text2: res.data.message
      });

      getMySkills()

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

      formData.append('photo', {
        uri: data.uri,
        name: data.fileName,
        filename: data.fileName,
        type: data.type,
      });

      const result = await axios.put(
        'https://fwm17-be-peword.vercel.app/v1/workers/profile/photo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      getMyProfile()

    } catch (error) {
      console.log(error?.response.data);
    }
  };

  useEffect(() => {
    getMyProfile();
    getMySkills();
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
          <Button variant='primary-purple' style={styles.button} onPress={handleSave} text='Simpan' />
          <Button variant='secondary-purple' style={styles.button} onPress={() => navigation.navigate('worker-profile')} text='Batal' />
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
              value={form.job_desk}
              onChangeText={value => setForm({ ...form, job_desk: value })}
              label="Job title"
              placeholder="Masukan job title"
            />
            <Input
              value={form.domicile}
              onChangeText={value => setForm({ ...form, domicile: value })}
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

        <View style={styles.profileTabContainer}>
          <Text style={styles.skillsTitle}>Skill</Text>
          <View style={{ gap: 10 }}>
            <Input label='' placeholder='Masukkan skill' value={skillForm} onChangeText={(value) => setSkillForm(value)} />
            <Button variant='primary-yellow' text="Tambah" onPress={handleAddSkill} />
            <View style={{ flexDirection: 'column', gap: 10 }}>
              {mySkills.map((item) => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      backgroundColor: '#FDD074',
                      borderColor: '#FBB017',
                      borderWidth: 1,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 12,
                        color: '#FFFFFF',
                      }}
                    >
                      {item.skill_name}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDeleteSkill(item.id)}>
                    <Text style={{ color: 'red' }}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

        </View>

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