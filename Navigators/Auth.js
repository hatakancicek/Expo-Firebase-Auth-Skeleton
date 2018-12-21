import React from 'react';
import Login from '../Screen/Login';
import SignUp from '../Screen/SignUp';
import Forgot from '../Screen/Forgot';
import Landing from '../Screen/Landing';
import { createStackNavigator, } from 'react-navigation';
import { primary, white } from '../Constants';

export default createStackNavigator({
  Login,
  SignUp,
  Forgot,
  Landing,
}, {
  initialRouteName: "Landing",
  defaultNavigationOptions: {
    headerMode: "screen",
    headerStyle: {
        backgroundColor: primary,
    },
    headerTintColor: white,
  },
});