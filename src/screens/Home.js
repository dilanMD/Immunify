import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';

import Dialpad from './Dialpad';
import CallLog from './CallLog';
import {COLORS} from '../constants/color';

const Tab = createMaterialBottomTabNavigator();
const {primary} = COLORS;

const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');

  // Register background handler
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    navigation.navigate('Register');
  });

  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      navigation.navigate('Register');
    });

    return unsubscribe;
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
      console.log('Authorization status:', authStatus);
    }
  };

  const getFcmToken = async () => {
    const token = await messaging().getToken();
    if (token) {
      console.log(token);
      console.log('Your Firebase Token is:', token);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate('Register');
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute('Home');
          navigation.navigate('Register');
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Tab.Navigator
      initialRouteName="Dialpad"
      barStyle={{backgroundColor: primary}}>
      <Tab.Screen
        name="Dialpad"
        component={Dialpad}
        navigation={navigation}
        options={{
          tabBarLabel: 'Dialpad',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="dialpad" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="CallLog"
        component={CallLog}
        options={{
          tabBarLabel: 'CallLog',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="format-list-text"
              color={color}
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
