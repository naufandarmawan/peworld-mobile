import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/configs/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/configs/navigation';

import MainRouter from './src/configs/router';


const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <MainRouter />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App