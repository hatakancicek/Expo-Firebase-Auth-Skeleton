import { 
  View, 
  Image,
  StyleSheet, 
  Dimensions, 
} from 'react-native';
import i18n from 'i18n-js';
import Logo from '../assets/splash.png';
import Title from '../Components/Title';
import React, { Component } from 'react';
import Button from '../Components/Button';
import { scale } from 'react-native-size-matters';
import { primary, black, name } from '../Constants';
import FacebookButton from '../Components/FacebookButton';

const { width } = Dimensions.get("screen");

export default class Landing extends Component {
  static navigationOptions = {
    header: null
  };

  navigateLogin = _ => 
    this.props.navigation.navigate('Login');

  navigateSignUp = _ => 
    this.props.navigation.navigate('SignUp');

  render() {
    const { navigateLogin, navigateSignUp } = this;
    
    return (
      <View style={styles.root} >
        <View style={styles.header} />
        <View style={styles.imageWrapper} >
          <Image style={styles.image} source={Logo} />
        </View>
        <View style={styles.body} >
          <View style={styles.titleWrapper} >
            <Title text={name} align="center" />
          </View>
          <View style={styles.buttonWrapper} >
            <FacebookButton />
            <Button 
              outline
              text={i18n.t("login")}
              onPress={navigateLogin}
            />
            <Button 
              text={i18n.t("signup")}
              style={styles.signUp}
              onPress={navigateSignUp}
            />
          </View>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    alignSelf: 'stretch',
  },
  body: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    paddingHorizontal: scale(30),
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  signUp: {
    marginTop: scale(10),
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  image: {
    width,
    height: width,
  },
});
