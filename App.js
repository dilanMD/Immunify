import 'react-native-gesture-handler';
import React, {Fragment, useState, useEffect} from 'react';
import {StyleSheet, Alert, View, StatusBar} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {createStackNavigator} from '@react-navigation/stack';

import Register from './src/screens/Register';
import Home from './src/screens/Home';
import VideoCall from './src/screens/VideoCall';
import Incoming from './src/screens/Incoming';
import Outgoing from './src/screens/Outgoing';
import {COLORS} from './src/constants/color';

const App = () => {
  const {primary, secondary} = COLORS;
  const Stack = createStackNavigator();

  return (
    // <NavigationContainer>
    //   <StatusBar backgroundColor={secondary} />
    //   <Stack.Navigator
    //     initialRouteName="Register"
    //     screenOptions={{
    //       headerShown: false,
    //     }}>
    //     <Stack.Screen name="Register">
    //       {(props) => <Register {...props} />}
    //     </Stack.Screen>
    //     <Stack.Screen name="Home">
    //       {(props) => <Home {...props} />}
    //     </Stack.Screen>
    //     {/* <Stack.Screen name="VideoCall">
    //       {(props) => <VideoCall {...props} />}
    //     </Stack.Screen> */}
    //     <Stack.Screen name="Incoming">
    //       {(props) => <Incoming {...props} />}
    //     </Stack.Screen>
    //     <Stack.Screen name="Outgoing">
    //       {(props) => <Outgoing {...props} />}
    //     </Stack.Screen>
    //   </Stack.Navigator>
    // </NavigationContainer>
    <VideoCall />
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
