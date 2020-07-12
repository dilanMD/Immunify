import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Dialpad = () => {
  return (
    <View style={styles.container}>
      <Text>Dialpad.js</Text>
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
