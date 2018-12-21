
import { 
  View,
  Image, 
  Dimensions,
  StyleSheet,  
  ActivityIndicator,
} from 'react-native';
import { Font } from 'expo';
import firebase from 'firebase';
import Logo from '../assets/splash.png';
import React, { Component } from 'react';

const { width } = Dimensions.get("screen");

export default class LoadingScreen extends Component {
  state = {};
  
  async componentDidMount() {

    await Font.loadAsync({
        'Jura': require('../assets/fonts/Jura.ttf'),
        'Anton': require('../assets/fonts/Anton.ttf'),
        'Bungee': require('../assets/fonts/Bungee.ttf'),
        'Ubuntu': require('../assets/fonts/Ubuntu.ttf'),
        'Monoton': require('../assets/fonts/Monoton.ttf'),
        'Lobster': require('../assets/fonts/Lobster.ttf'),
        'Sancreek': require('../assets/fonts/Sancreek.ttf'),
        'Merri-Bold': require('../assets/fonts/Merri-Bold.ttf'),
        'Merri-Light': require('../assets/fonts/Merri-Light.ttf'),
    });

    const { updateUser } = this;
    const unsubscribeUser = firebase.auth().onAuthStateChanged(updateUser);
    this.setState({ unsubscribeUser });
  };

  componentWillUnmount() {
    const { unsubscribeUser } = this.state;
    if(unsubscribeUser)
      unsubscribeUser();
  };

  updateUser = user => {
    const { navigation: { navigate }} = this.props;

    if (user) {
        if(user.displayName) {
          navigate("Home");
        }
        else {
          navigate("Name");
        };
    } else {
      navigate("Auth");
    };
  };

  render() {
    return(
      <View style={styles.root} >
        <Image style={styles.image} source={Logo} />
        <ActivityIndicator style={styles.loading} size="large" color="primary" />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  root: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width,
    height: width,
  },
  loading: {
    left: 0,
    right: 0,
    bottom: 30,
    position: 'absolute',
  },
});