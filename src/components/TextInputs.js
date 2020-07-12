import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';

const TextInputs = (props) => {
  const {placeholder, numberpad, secure} = props;
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  return (
    <Input
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      keyboardType={numberpad && 'number-pad'}
      secureTextEntry={secure}
    />
  );
};

const styles = StyleSheet.create({});

export default TextInputs;
