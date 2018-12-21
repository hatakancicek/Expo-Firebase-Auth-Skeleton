import React from 'react';
import firebase from 'firebase';
import { AdMobBanner } from 'expo';
import { connect } from 'react-redux';
import Notify from '../Notifications';
import HomeNavigator from '../Navigators/Home';
import { View, Platform } from 'react-native';

const addID = Platform.OS === "ios"
  ? "<IOS AdMob Banner Ad-Unit>"
  : "<Android AdMob Banner Ad-Unit>"

class AppContainer extends React.Component {
  static router = HomeNavigator.router;

  state = {
    unmounted: false,
    bannerError: false,
  };  
  
  componentWillMount() {
    const { set } = this.props;

    const user = firebase.auth().currentUser;

    Notify(user.uid);
    set("user", user);
  };

  componentWillUnmount() {
    const { set } = this.props;

    set("user", null);
  };

  _bannerError = err => {
    const { unmounted } = this.state;
    if(unmounted)
      return;

    console.log("Banner error.", err);

    this.setState({
      bannerError: true,
    });
  };

  render() {
    const { navigation } = this.props;
    const { bannerError } = this.state;

    return(
      <View style={{ alignSelf: 'stretch', flex: 1 }} >
        <HomeNavigator navigation={navigation} />
        {!bannerError && 
        <AdMobBanner
          style={{
            alignSelf: 'center',
          }}
          adUnitID={addID}
          testDeviceID="EMULATOR"
          bannerSize="smartBannerPortrait" 
          onDidFailToReceiveAdWithError={this._bannerError}
        />}
      </View>
    );
  };
};

export default connect(null,  d => ({
  set: (target, data) => d({ type: "SET", target, data, }),
}))(AppContainer);