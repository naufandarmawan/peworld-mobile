import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../../components/base/button'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GreyPin from '../../assets/grey-pin.svg'
import GreyMail from '../../assets/grey-mail.svg'
import GreyInstagram from '../../assets/grey-instagram.svg'
import GreyGithub from '../../assets/grey-github.svg'
import GreyGitlab from '../../assets/grey-gitlab.svg'
import api from '../../configs/api'


const WorkerProfile = ({ route, navigation }) => {
  const { id } = route.params

  const [profile, setProfile] = useState({})
  const [skills, setSkills] = useState([])
  const [portfolio, setPortfolio] = useState([]);
  const [experience, setExperience] = useState([]);

  const [toggle, setToggle] = useState(1);

  const getProfile = async () => {
    try {

      const res = await api.get(`/workers/profile/${id}`);

      setProfile(res.data.data[0])
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data.message || 'Something went wrong'
      });
    }
  }

  const getSkills = async () => {
    try {

      const res = await api.get(`/skill/${id}`);

      setSkills(res.data.data)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data.message || 'Something went wrong'
      });
    }
  }

  const getExperience = async () => {
    try {

      const res = await api.get(`/experience/${id}`);

      setExperience(res.data.data)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data.message || 'Something went wrong'
      });
    }
  }

  const getPortfolio = async () => {
    try {

      const res = await api.get(`/portfolio/${id}`);

      setPortfolio(res.data.data)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data.message || 'Something went wrong'
      });
    }
  }

  const handleToggle = (id) => {
    setToggle(id);
  };

  const handleNavigate = (link) => {
    Linking.openURL(link);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    getProfile();
    getSkills();
    getPortfolio()
    getExperience()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <View style={styles.profileDetails}>
            <Image source={{ uri: `${profile.photo}` }} style={styles.profileImage} />
            <View style={styles.profileText}>
              <Text style={{ fontWeight: 600, fontSize: 22, color: '#1F2A36' }}>{profile.name}</Text>
              <Text style={{ fontWeight: 400, fontSize: 14, color: '#1F2A36' }}>{profile.position}</Text>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <GreyPin />
                <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{profile.location}</Text>
              </View>
              <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{profile.workplace}</Text>
              <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{profile.description}</Text>
            </View>
            <Button variant='primary-purple' style={styles.button} onPress={() => navigation.navigate('')} text='Hire' />
          </View>

          <View style={styles.skillsContainer}>
            <Text style={styles.skillsTitle}>Skill</Text>
            <View style={styles.skillsList}>
              {skills.map((item) => (
                <View key={item.id} style={{ paddingHorizontal: 12, paddingVertical: 4, backgroundColor: '#FDD074', borderColor: '#FBB017', borderWidth: 1, borderRadius: 4 }}>
                  <Text style={{ fontWeight: 600, fontSize: 12, color: '#FFFFFF' }}>{item.skill_name}</Text>
                </View>
              ))}
            </View>

          </View>

          <View style={styles.socialContainer}>
            {profile.email &&
              <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                <GreyMail />
                <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{profile.email}</Text>
              </View>
            }
            {profile.instagram &&
              <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                <GreyInstagram />
                <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{profile.instagram}</Text>
              </View>
            }
            {profile.github &&
              <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                <GreyGithub />
                <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{profile.github}</Text>
              </View>
            }
            {profile.gitlab &&
              <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                <GreyGitlab />
                <Text style={{ fontWeight: 400, fontSize: 14, color: '#9EA0A5' }}>{profile.gitlab}</Text>
              </View>
            }
          </View>
        </View>

        <View style={styles.profileTabContainer}>
          <View style={{}}>
            <View style={styles.tabContainer}>
              <TouchableOpacity style={styles.tab} onPress={() => handleToggle(1)}>
                <Text style={toggle === 1 ? styles.activeTabText : styles.inactiveTabText}>Portfolio</Text>
                <View style={toggle === 1 ? styles.activeTabIndicator : styles.inactiveTabIndicator}></View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab} onPress={() => handleToggle(2)}>
                <Text style={toggle === 2 ? styles.activeTabText : styles.inactiveTabText}>Pengalaman Kerja</Text>
                <View style={toggle === 2 ? styles.activeTabIndicator : styles.inactiveTabIndicator}></View>
              </TouchableOpacity>
            </View>

            {toggle === 1 && (
              <View style={styles.contentContainer}>
                <View style={styles.list}>
                  {portfolio.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => handleNavigate(item.link)}>
                      <Image source={{ uri: item.image }} style={styles.image} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {toggle === 2 && (
              <View style={styles.contentContainer}>
                <View style={styles.list}>
                  {experience.map((item) => (
                    <View key={item.id} style={{ flexDirection: 'row', gap: 20 }}>
                      <Image source={require('../../assets/company-logo.png')} style={styles.companyLogo} />
                      <View style={{ gap: 6, flex:1 }}>
                        <Text style={{ fontWeight: 600, fontSize: 20, color: '#1F2A36' }}>{item.position}</Text>
                        <Text style={{ fontWeight: 400, fontSize: 18, color: '#46505C' }}>{item.company}</Text>
                        <Text style={{ fontWeight: 400, fontSize: 16, color: '#9EA0A5' }}>{formatDate(item.start_date)} - {formatDate(item.end_date)}</Text>
                        <Text style={{ fontWeight: 400, fontSize: 16, color: '#9EA0A5' }}>{item.duration_in_months} months</Text>
                        <Text style={{ fontWeight: 400, fontSize: 14, color: '#1F2A36' }}>{item.description}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
      <Toast />
    </ScrollView>
  )
}

export default WorkerProfile

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