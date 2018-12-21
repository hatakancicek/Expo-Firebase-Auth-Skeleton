import React from 'react';
import { primary, white } from '../Constants';
import { Ionicons } from '@expo/vector-icons';
import { tabBarIconSize, } from '../Constants';
import Map from '../Screen/MapScreen';
import { scale } from 'react-native-size-matters';
import { createStackNavigator } from 'react-navigation';
 
const MapNavigator = createStackNavigator({
  Map,
}, {
  initialRouteName: "Map",
  defaultNavigationOptions: {
    headerMode: "screen",
    headerStyle: {
        backgroundColor: primary,
    },
    headerTintColor: white,
  },
});

MapNavigator.navigationOptions = _ => ({
  tabBarIcon: ({ tintColor }) => 
    <Ionicons 
        color={tintColor}
        name="ios-compass" 
        size={scale(tabBarIconSize)} 
    />,
});

export default MapNavigator;