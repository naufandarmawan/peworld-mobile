import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationEmpty from '../../assets/inbox-empty.svg'

const Inbox = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#F6F7F8', padding: 30 }}>
      <Text style={{ fontWeight: 600, fontSize: 18, color: '#9EA0A5', textAlign: 'left' }}>Utama</Text>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <NotificationEmpty />
        <Text style={{ fontWeight: 600, fontSize: 14, color: '#1F2A36', textAlign: 'center' }}>Belum ada inbox</Text>
      </View>
    </View>
  )
}

export default Inbox

const styles = StyleSheet.create({})