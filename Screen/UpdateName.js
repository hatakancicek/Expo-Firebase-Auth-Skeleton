
import { 
    red,
} from '../Constants';
import { 
    View,
    Alert,
    Keyboard, 
    StyleSheet, 
    KeyboardAvoidingView,
} from 'react-native';
import i18n from 'i18n-js';
import firebase from 'firebase';
import { connect } from 'react-redux';
import Input from '../Components/Input';
import React, { Component } from 'react';
import Button from '../Components/Button';
import { scale } from 'react-native-size-matters';

class UpdateName extends Component {
    static navigationOptions = _ => ({
        title: i18n.t("update_n"),
    });

    state = {
        name: "",
        lastname: "",
        hidden: false,
        loading: false,
        nameError: false,
        lastnameError: false,
    };

    _nameNext = _ => {
        const { name } = this.state;

        if(!name) 
            Keyboard.dismiss();
        
        else 
            this.refs.lastname.focus();
    };

    _lastnameNext = _ =>
        this.save();

    setName = name =>
        this.setState({ name });

    setLastname = lastname =>
        this.setState({ lastname });

    check = _ => {
        const { name, lastname } = this.state;

        const nameError = !name
        const lastnameError = !lastname;

        this.setState({
            nameError,
            lastnameError,
        });

        return name && lastname;
    };

    _save = _ => {
        const { set } = this.props;
        const user = firebase.auth().currentUser;
        set("user", user);
        this.props.navigation.goBack();
    }

    save = _ => {
        Keyboard.dismiss();

        const { set } = this.props;
        const { check, _save } = this;
        const { name, lastname } = this.state;

        if(!check()) 
            return;

        this.setState({
            loading: true,
        });

        set("disabled", true);

        firebase.auth().currentUser.updateProfile({
            displayName: name + " " + lastname,
        })
        .then(_save)
        .catch(err => {
            set("disabled", false);

            Alert.alert(
                i18n.t("err_update_n"),
                i18n.t("err_unexpected"),
                [ {text: i18n.t("OK")}, ],
                { cancelable: true },
            );

            this.setState({
                loading: false,
            });
        });
    };

    componentDidMount() {
        const { displayName } = this.props;
        const split = displayName.split(' ');
        const lastname = split[split.length - 1];
        const name = split.slice(0, split.length - 1).join(' ');

        this.setState({
            name,
            lastname,
        });
    }

    componentWillUnmount() {
        const { set } = this.props;
        Keyboard.dismiss();
        set("disabled", false);
    };

    render() {
        const { 
            save,
            setName, 
            _nameNext, 
            setLastname, 
            _lastnameNext, 
        } = this;
        const { 
            name, 
            loading,
            lastname, 
            nameError, 
            lastnameError,
        } = this.state;

        return (
            <View 
                style={styles.root} 
            >
                <KeyboardAvoidingView 
                    behavior="padding" 
                    style={[styles.root, styles.wrapper]} 
                >
                    <View style={styles.inputWrapper} >
                        <Input 
                            autoFocus
                            value={name}
                            returnKeyType="next"
                            autoCapitalize="words"
                            onChangeText={setName}
                            color={nameError && red}
                            onSubmitEditing={_nameNext}
                            placeholder={i18n.t("name")} 
                        />
                    </View>
                    <View style={styles.inputWrapper} >
                        <Input 
                            ref="lastname"
                            value={lastname}
                            returnKeyType="send"
                            autoCapitalize="words"
                            onChangeText={setLastname}
                            color={lastnameError && red}
                            placeholder={i18n.t("l_name")} 
                            onSubmitEditing={_lastnameNext}
                        />
                    </View>
                    <View style={styles.buttonWrapper} >
                        <Button 
                            onPress={save}
                            disabled={loading}
                            text={i18n.t("save")} 
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    wrapper: {
        paddingVertical: scale(40),
    },
    inputWrapper: {
        alignSelf: 'stretch',
        marginVertical: scale(4),
        marginHorizontal: scale(30),
    },
    buttonWrapper: {
        marginTop: scale(15),
        alignSelf: 'stretch',
        marginBottom: scale(20),
        marginHorizontal: scale(30),
    },
    buttonWrapper: {
        marginTop: scale(15),
        alignSelf: 'stretch',
        marginBottom: scale(20),
        marginHorizontal: scale(30),
    },
});

export default connect(({ user: { displayName } }) => ({ displayName }), d => ({
    set: (target, data) => d({ target, data, type: "SET" }),
}))(UpdateName);
