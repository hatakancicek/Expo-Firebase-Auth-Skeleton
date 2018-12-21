import React from 'react';
import Settings from '../Screen/Settings';
import { primary, white } from '../Constants';
import UpdateMail from '../Screen/UpdateMail';
import UpdateName from '../Screen/UpdateName';
import { Ionicons } from '@expo/vector-icons';
import { tabBarIconSize, } from '../Constants';
import { scale } from 'react-native-size-matters';
import UpdatePassword from '../Screen/UpdatePassword';
import { createStackNavigator } from 'react-navigation';
 
const SettingsNavigator = createStackNavigator({
  Settings,
  UpdateName,
  UpdateMail,
  UpdatePassword,
}, {
  initialRouteName: "Settings",
  defaultNavigationOptions: {
    headerMode: "screen",
    headerStyle: {
        backgroundColor: primary,
    },
    headerTintColor: white,
  },
});

SettingsNavigator.navigationOptions = _ => ({
  tabBarIcon: ({ tintColor }) => 
    <Ionicons 
        color={tintColor}
        name="ios-settings" 
        size={scale(tabBarIconSize)} 
    />,
});

export default SettingsNavigator;