import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';
import { primary } from '../Constants';

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: primary,
    marginBottom: 15,
    borderRadius: 70,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
        height: 0,
        width: 0
    },
    elevation: 1,
  },
  text: {
    fontSize: 14,
    color: '#FAFAFA',
  },
});

loginWithFacebook = async () => {
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      '322232905202165',
      { permissions: ['public_profile'], behaviour: 'native' }
    );
  
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
  
      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
        throw error;
      });
    }
    else if (type === "cancel") 
      return
    else 
      throw new Error("FB Login cancelled")
  } catch (err) {
    console.log(err);
    Alert.alert(
      'Beklenmeyen bir hata oluştu.',
      'Lütfen daha sonra tekrar dene.',
      [{ text: 'Tamam', onPress: null }],
    ); 
  };
}

export default () =>
<TouchableOpacity 
  style={styles.wrapper} 
  onPress={loginWithFacebook}
>
  <Text style={styles.text} >
    Facebook ile devam et
  </Text>
</TouchableOpacity>