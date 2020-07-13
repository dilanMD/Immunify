import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Input} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

import {USER} from '../constants/user';
import {COLORS} from '../constants/color';
import {BASE_URL, FIREBASE_SERVER_KEY} from '../constants/credentials';

const Dialpad = (props) => {
  const [opponent, setOpponent] = useState('0767795737');
  const {GET_FCM_REQUEST, GET_FCM_SUCCESS, GET_FCM_FAILURE} = USER;
  const {primary} = COLORS;

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {loading, userData, error} = user;

  useEffect(() => console.log(userData), [userData]);

  const handleChange = (text) => {
    setOpponent(text);
  };

  const findFcm = () => {
    dispatch({type: GET_FCM_REQUEST});
    axios
      .get(`${BASE_URL}/${opponent}`)
      .then((response) => {
        console.log('Response', response.data.user);
        dispatch({type: GET_FCM_SUCCESS, payload: response.data.user});
        console.log('User Data', userData);
        sendNotification();
      })
      .catch((err) => {
        console.log(err);
        dispatch({type: GET_FCM_FAILURE, payload: err.message});
      });
  };

  const sendNotification = () => {
    console.log('click...');
    // props.navigation.navigate('VideoCall');
    // if (userData !== null) {
    const token = userData.token;
    const headers = {
      Authorization: `key=${FIREBASE_SERVER_KEY}`,
      'Content-Type': 'application/json',
    };
    const body = {
      to: token,
      notification: {
        sound: 'default',
        body: 'test body',
        title: 'test title',
        content_available: true,
        priority: 'high',
      },
      data: {
        sound: 'default',
        body: 'test body',
        title: 'test title',
        content_available: true,
        priority: 'high',
      },
    };
    axios
      .post('https://fcm.googleapis.com/fcm/send', body, {headers})
      .then((response) => console.log('FCM Response', response))
      .catch((error) => console.log(error));
    // }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Mobile Number"
        value={opponent}
        onChangeText={(text) => handleChange(text)}
        keyboardType="number-pad"
      />
      <Button title="Find FCM" onPress={findFcm} />
      {/* <Text>{user !== null && user.token}</Text> */}
      {loading && <ActivityIndicator size="large" color={primary} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dialpad;
