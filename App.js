import 'react-native-gesture-handler';
import React, {Fragment, useState, useEffect} from 'react';
import {StyleSheet, Alert, View, StatusBar} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {createStackNavigator} from '@react-navigation/stack';

import Register from './src/screens/Register';
import Home from './src/screens/Home';
import VideoCall from './src/screens/VideoCall';
import {COLORS} from './src/constants/color';

const App = () => {
  const {primary, secondary} = COLORS;
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={secondary} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Register">
          {(props) => <Register {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {(props) => <Home {...props} />}
        </Stack.Screen>
        <Stack.Screen name="VideoCall">
          {(props) => <VideoCall {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
