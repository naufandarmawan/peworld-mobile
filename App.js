import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import MainRouter from './src/configs/router';


const App = () => {

  return (
    <NavigationContainer>
      <MainRouter />
    </NavigationContainer>
  )
}

export default App