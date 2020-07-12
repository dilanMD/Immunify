import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Dialpad from './Dialpad';
import CallLog from './CallLog';
import {COLORS} from '../constants/color';

const Tab = createMaterialBottomTabNavigator();
const {primary} = COLORS;

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dialpad"
      barStyle={{backgroundColor: primary}}>
      <Tab.Screen
        name="Dialpad"
        component={Dialpad}
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
