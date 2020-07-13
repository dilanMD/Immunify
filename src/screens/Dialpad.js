import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Input} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

import {USER} from '../constants/user';
import {CALL} from '../constants/call';
import {COLORS} from '../constants/color';
import {BASE_URL, FIREBASE_SERVER_KEY} from '../constants/credentials';

const Dialpad = ({navigation}) => {
  const [opponent, setOpponent] = useState('');
  const {GET_FCM_REQUEST, GET_FCM_SUCCESS, GET_FCM_FAILURE} = USER;
  const {OUTGOING_REQUEST, OUTGOING_SUCCESS, OUTGOING_FAILURE} = CALL;
  const {primary, success, danger, white} = COLORS;

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {loading, userData, error} = user;
  const initiator = user.mobile;

  const handleNumber = (value) => {
    setOpponent(opponent + value);
  };

  const saveOutgoing = () => {
    dispatch({type: OUTGOING_REQUEST});
    axios
      .post(`${BASE_URL}/${initiator}`)
      .then((response) => {
        console.log(response);
        findFcm();
      })
      .catch((err) => console.log(err));
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
      .then((response) => {
        console.log('FCM Response', response);
        navigation.navigate('Outgoing');
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{opponent}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleNumber(1)}>
          <Text style={styles.number}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleNumber(2)}>
          <Text style={styles.number}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleNumber(3)}>
          <Text style={styles.number}>3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleNumber(4)}>
          <Text style={styles.number}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleNumber(5)}>
          <Text style={styles.number}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleNumber(6)}>
          <Text style={styles.number}>6</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleNumber(7)}>
          <Text style={styles.number}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleNumber(8)}>
          <Text style={styles.number}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleNumber(9)}>
          <Text style={styles.number}>9</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleNumber('+')}>
          <Text style={styles.number}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleNumber(0)}>
          <Text style={styles.number}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleNumber('#')}>
          <Text style={styles.number}>#</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.iconContainer, {backgroundColor: primary}]}
        onPress={saveOutgoing}>
        <MaterialIcons name="call" size={36} color={white} />
      </TouchableOpacity>
      {/* {loading && <ActivityIndicator size="large" color={primary} />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  display: {
    fontSize: 30,
    marginBottom: 30,
  },
  buttons: {
    width: '100%',
    // flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: 5,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginHorizontal: 20,
    marginVertical: 15,
    backgroundColor: '#CCCCCC',
  },
  number: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Dialpad;
