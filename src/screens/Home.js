import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';

import Dialpad from './Dialpad';
import CallLog from './CallLog';
import {COLORS} from '../constants/color';
import {USER} from '../constants/user';
import {BASE_URL} from '../constants/credentials';
import Axios from 'axios';

const Tab = createMaterialBottomTabNavigator();
const {primary} = COLORS;
const {GET_FCM_REQUEST, GET_FCM_SUCCESS, GET_FCM_FAILURE, SET_MOBILE} = USER;

const Home = () => {
  const [mobile, setMobile] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');
  const dispatch = useDispatch();

  // Register background handler
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    navigation.navigate('Incoming');
  });

  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      navigation.navigate('Incoming');
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
      axios
        .get(`${BASE_URL}/token/${token}`)
        .then((res) => {
          // setMobile(res.data.user.msisdn);
          dispatch({type: SET_MOBILE, payload: res.data.user.msisdn});
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
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
      navigation.navigate('Incoming');
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
          navigation.navigate('Incoming');
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
