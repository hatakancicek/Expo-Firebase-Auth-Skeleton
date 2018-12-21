import React from 'react';
import firebase from 'firebase';
import AuthNavigator from '../Navigators/Auth';

class AuthContainer extends React.Component {
  static router = AuthNavigator.router;

  componentDidMount() {
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
    }
  };

  componentWillUnmount() {
    const { unsubscribeUser } = this.state;

    if(unsubscribeUser)
      unsubscribeUser();
  };

  render() {
    const { navigation } = this.props;

    return(
      <AuthNavigator navigation={navigation} />
    );
  };
};

export default AuthContainer;