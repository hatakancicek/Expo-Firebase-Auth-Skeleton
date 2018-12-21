import axios from 'axios';
import React from 'react';
import i18n from 'i18n-js';
import firebase from 'firebase';
import { connect } from 'react-redux';
import Title from '../Components/Title';
import { scale } from 'react-native-size-matters';
import LineButton from '../Components/LineButton';
import { grey, } from '../Constants';
import { Alert, StyleSheet, View, ScrollView, Image } from 'react-native';

const PUSH_ENDPOINT = '<YOUR PUSH NOTFICATION REGISTER ENDPOINT>';

signOut = navigate => {
    Alert.alert(
        i18n.t("sign_out"),
        i18n.t("sign_out_c"),
        [
            {text: i18n.t("sign_out"), onPress: () => {
                axios.post(PUSH_ENDPOINT, {
                    userID: firebase.auth().currentUser.uid, 
                 });
                firebase.auth().signOut();
                navigate("Auth");
            }},
            {text: i18n.t("cancel"), onPress: {}, style: 'cancel'},
        ],
        { cancelable: false }
    );
};

const Settings = ({ navigation: { navigate }, user: { displayName, email }}) => {
    const split = displayName.split(' ');
    const lastname = split[split.length - 1];
    const name = split.slice(0, split.length - 1).join(' ');

    return (
    <ScrollView style={styles.root} >
        <View
            style={styles.head}
        >
            <Image
                source={require('../assets/icon.png')}
                style={styles.image}
            />
            <View  
                style={styles.header}
            >
                <Title
                    text={name}
                />
                <Title
                    text={lastname}
                />
                <Title
                    type="content"
                    text={email}
                    style={styles.content}
                />
            </View>
        </View>
        <LineButton
            text={i18n.t("update_n")}
            onPress={_ => navigate("UpdateName")}
        />
       {!!email &&
       <LineButton
            text={i18n.t("update_e")}
            onPress={_ => navigate("UpdateMail")}
        />}
        {!! email && 
        <LineButton
            text={i18n.t("update_p")}
            onPress={_ => navigate("UpdatePassword")}
        />}
        <LineButton
            text={i18n.t("sign_out")}
            onPress={_ => signOut(navigate)}
            color="#F44336"
        />
    </ScrollView>
    );
};

Settings.navigationOptions = _ => ({
    title: i18n.t("settings"),
});

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignSelf: 'stretch',
    },
    head: {
        paddingTop: scale(30),
        paddingHorizontal: scale(15),
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: scale(10),
    },
    header: {
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    content: {
        color: grey,
        marginTop: scale(10),
    },
    image: {
      width: 100,
      height: 100,
      marginRight: 15,
      alignSelf: 'center',
      resizeMode: 'contain',
    },
});

export default connect(({ user }) => ({ user }), d => ({
    set: (target, data) => d({ target, data, type: "SET" }),
}))(Settings);