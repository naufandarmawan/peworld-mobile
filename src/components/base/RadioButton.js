import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ options, onSelect, selectedOption }) => {
  return (
    <View style={styles.radioContainer}>
      {options.map((option, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.radioButton} 
          onPress={() => onSelect(option)}
        >
          <View style={styles.radioOuterCircle}>
            {selectedOption === option && <View style={styles.radioInnerCircle} />}
          </View>
          <Text style={styles.radioText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};


export default RadioButton;

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20
  },
  radioOuterCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6200EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#6200EA',
  },
  radioText: {
    marginLeft: 8,
    fontSize: 14,
  },
});

