import React from 'react';
import i18n from 'i18n-js';
import Store from './Store';
import Config from './Config';
import firebase from 'firebase';
import Root from './Navigators/Root';
import { tr, en } from './Languages';
import { Notifications } from 'expo';
import { Provider } from 'react-redux';
import Disable from './Components/Disable';
import { Localization } from 'expo-localization';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';

import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp(Config);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true};
firestore.settings(settings);

i18n.fallbacks = true;
i18n.defaultLocale = "en-EN";
i18n.translations = { tr, en };
i18n.locale = Localization.locale;

if (Platform.OS === 'android') {
  Notifications.createChannelAndroidAsync('messages', {
    name: 'Messages',
    priority: 'max',
    vibrate: [0, 250, 250, 250],
  });
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store} >
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
          />
          <Root />
          <Disable />
        </View>
      </Provider>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
