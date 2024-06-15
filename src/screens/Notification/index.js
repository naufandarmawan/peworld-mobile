import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BlackBack from '../../assets/black-back.svg'
import NotificationEmpty from '../../assets/notification-empty.svg'

const Notification = ({navigation}) => {
  return (
    <View style={{ flex:1, backgroundColor: '#F6F7F8', padding:30}}>
      <View style={{ flexDirection: 'row', alignItems:'center'}}>
        <BlackBack onPress={() => navigation.navigate('home')} />
        <Text style={{ flex: 1, fontWeight: 600, fontSize: 18, color: '#1F2A36', textAlign: 'center' }}>Notifikasi</Text>
        <View style={{ width: 32, height: 32 }} />
      </View>
      <View style={{ flex: 1, alignItems:'center', justifyContent:'center', gap: 20 }}>
        <NotificationEmpty />
        <Text style={{ fontWeight: 400, fontSize: 14, color: '#1F2A36', textAlign: 'center' }}>Belum ada notifikasi</Text>
      </View>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})