import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react'

const ExperienceContent = ({companyLogo, position, company, workMonth, workYear, description}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={companyLogo ? { uri: companyLogo } : require('../../assets/company-logo.png')} />
      <View style={styles.details}>
        <Text style={styles.position}>{position}</Text>
        <Text style={styles.company}>{company}</Text>
        <View style={styles.workPeriod}>
          <Text style={styles.workText}>{`${workMonth} - ${workYear}`}</Text>
          <Text style={styles.workText}>6 months</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.separator}></View>
      </View>
    </View>
  )
}

export default ExperienceContent

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 20,
    },
    logo: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
    details: {
      marginLeft: 16,
      flex: 1,
    },
    position: {
      fontSize: 18,
      fontWeight: '600',
      color: '#1F2A36',
    },
    company: {
      fontSize: 16,
      color: '#46505C',
    },
    workPeriod: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    workText: {
      fontSize: 14,
      color: '#9EA0A5',
      marginRight: 8,
    },
    description: {
      fontSize: 14,
      color: '#1F2A36',
      marginTop: 8,
    },
    separator: {
      height: 1,
      backgroundColor: '#E2E5ED',
      marginTop: 8,
    },
  });