import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CallLog = () => {
  return (
    <View style={styles.container}>
      <Text>CallLog.js</Text>
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

export default CallLog;
