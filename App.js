import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Waiting from './screens/Waiting';
import Home from './screens/Home';

import PageSign from './screens/Login/PageSign';
import SignUp from './screens/Login/SignUp';
import SignIn from './screens/Login/SignIn';
import Parametres from './screens/Home/Parametres';
// import Play from './screens/Home/Play';
import Shop from './screens/Home/Shop'
import Play2 from './screens/Home/Play2';
import GameOver from './screens/Home/GameOver';
import Test from './screens/Home/TestIdinarouille';



import Skin from './screens/Home/Skin';


import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';




const Stack = createNativeStackNavigator();

// options={{gestureEnabled: false}}
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Waiting" component={Waiting} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="PageSign" component={PageSign} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Skin" component={Skin} />
            <Stack.Screen name="Parametres" component={Parametres} />
            {/* <Stack.Screen name="Play" component={Play} /> */}
            <Stack.Screen name="Play2" component={Play2} />
            <Stack.Screen name="Shop" component={Shop} />
            <Stack.Screen name="GameOver" component={GameOver} />
            <Stack.Screen name="Test" component={Test} />




            {/*<Stack.Screen name="TabNavigator" component={TabNavigator} />  */}
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
