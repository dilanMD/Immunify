import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import {useSelector, useDispatch} from 'react-redux';

import Logo from '../assets/imm-logo.png';
import {COLORS} from '../constants/color';
import {AUTH} from '../constants/auth';
import {BASE_URL} from '../constants/credentials';

const Register = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const {primary, secondary} = COLORS;
  const {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE} = AUTH;
  const [fcmToken, setFcmToken] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {msisdn, loading} = auth;

  const handleChange = (text) => {
    setMobile(text);
  };

  const register = () => {
    dispatch({type: REGISTER_REQUEST});
    axios
      .post(`${BASE_URL}/register`, {msisdn: mobile, token: fcmToken})
      .then((response) => {
        dispatch({type: REGISTER_SUCCESS, payload: response});
        navigation.navigate('Home');
        console.log(response);
      })
      .catch((err) => {
        dispatch({type: REGISTER_FAILURE, payload: err});
        console.log(err);
      });
  };

  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
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
      setFcmToken(token);
      console.log(token);
      console.log('Your Firebase Token is:', token);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color={primary} />}
      <TextInput
        placeholder="Mobile number"
        keyboardType="number-pad"
        value={msisdn}
        style={styles.input}
        onChangeText={(text) => handleChange(text)}
      />
      <Button
        title="Register"
        color={primary}
        style={styles.button}
        onPress={() => register()}
      />
      {/* <Text>{mobile}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  button: {
    borderRadius: 50,
  },
});

export default Register;
