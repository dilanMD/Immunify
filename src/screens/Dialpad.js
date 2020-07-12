import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';

const Dialpad = () => {
  const [opponent, setOpponent] = useState('');

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {loading, fcm, error} = user;

  const handleChange = (e) => {
    e.preventDefault();
    setOpponent(e.target.value);
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Mobile Number"
        value={opponent}
        onChange={handleChange}
        keyboardType="number-pad"
      />
      <Button title="Find FCM" />
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
