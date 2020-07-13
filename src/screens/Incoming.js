import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {COLORS} from '../constants/color';

const {success, danger, white} = COLORS;

const Incoming = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.name}>Caller Name</Text>
        <Text style={styles.duration}>00:20</Text>
      </View>
      <View style={styles.userDetails}></View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.iconContainer, {backgroundColor: success}]}>
          <MaterialIcons name="call" size={36} color={white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconContainer, {backgroundColor: danger}]}>
          <MaterialIcons name="call-end" size={36} color={white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 2,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  duration: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  userDetails: {
    flex: 6,
  },
  buttons: {
    width: '100%',
    flex: 2,
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
    marginHorizontal: 60,
  },
});

export default Incoming;
