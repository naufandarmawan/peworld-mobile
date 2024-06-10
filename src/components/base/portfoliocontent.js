import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const PortfolioContent = ({title, image, link}) => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=>navigation.navigate(link)} style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.appName}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PortfolioContent

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginBottom: 20,
    },
    image: {
      width: 219,
      height: 148,
      resizeMode: 'cover',
    },
    appName: {
      fontSize: 14,
      color: '#1F2A36',
      marginTop: 8,
    },
  });