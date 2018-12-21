
import { 
    red,
    ERR_BAD_PASS,
    ERR_WRONG_PASS,
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

class UpdatePassword extends Component {
    static navigationOptions = _ => ({
        title: i18n.t("update_p"),
    });

    state = {
        check: "",
        password: "",
        hidden: false,
        loading: false,
        newPassword: "",
        checkError: false,
        emailError: false,
        passwordError: false,
    };

    setEMail = email =>
        this.setState({ email });

    setPassword = password =>
        this.setState({ password });

    setNewPassword = newPassword =>
        this.setState({ newPassword });

    setCheck = check =>
        this.setState({ check });

    _passNext = _ => {
        if(!this.state.newPassword)
            this.newPassword.focus();
        else 
            Keyboard.dismiss();
    };

    _newPassNext = _ => {
        if(!this.state.check)
            this.check.focus();
        else 
            Keyboard.dismiss();
    };

    _checkNext = _ =>
        this.save();

    check = _ => {
        const { newPassword, password, check } = this.state;

        const passwordError = !password;
        const newPasswordError = !newPassword;
        const checkError = !password || (newPassword !== check);

        this.setState({
            checkError,
            passwordError,
            newPasswordError,
        });

        return !checkError && !passwordError && !newPasswordError;
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
        const { password, newPassword } = this.state;

        if(!check()) 
            return;

        this.setState({
            loading: true,
        });

        set("disabled", true);

        firebase.auth().signInWithEmailAndPassword(this.props.email, password)
        .then(_ => firebase.auth().currentUser.updatePassword(newPassword))
        .then(_save)
        .catch(err => {
            set("disabled", false);

            let errText;
            switch(err.code) {
                case ERR_BAD_PASS:
                    errText = i18n.t("err_bad_pass");
                    this.setState({ passError: true, checkError: true });
                    break;


                case ERR_WRONG_PASS:
                    errText = i18n.t("err_wrong_pass");
                    this.setState({ passError: true });
                    break;

                default:
                    errText = i18n.t("err_unexpected");
            };

            Alert.alert(
                i18n.t("err_update_p"),
                errText,
                [ {text: i18n.t("OK")}, ],
                { cancelable: true },
            );

            this.setState({
                loading: false,
            });
        });
    };

    componentWillUnmount() {
        const { set } = this.props;
        set("disabled", false);
        Keyboard.dismiss();
    };

    render() {
        const { 
            save,
            setCheck,
            _passNext,
            _checkNext, 
            setPassword, 
            _newPassNext,
            setNewPassword,
        } = this;
        const { 
            check, 
            loading,
            password,
            checkError,
            newPassword,
            passwordError,
            newPasswordError,
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
                            maxLength={24}
                            secureTextEntry
                            value={password}
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={setPassword}
                            onSubmitEditing={_passNext}
                            color={passwordError && red}
                            placeholder={i18n.t("c_pass")} 
                        />
                    </View>
                    <View style={styles.inputWrapper} >
                        <Input 
                            maxLength={24}
                            secureTextEntry
                            value={newPassword}
                            returnKeyType="next"
                            onChangeText={setNewPassword}
                            onSubmitEditing={_newPassNext}
                            placeholder={i18n.t("n_pass")} 
                            color={newPasswordError && red}
                            ref={ref => this.newPassword = ref}
                        />
                    </View>
                    <View style={styles.inputWrapper} >
                        <Input 
                            value={check}
                            maxLength={24}
                            secureTextEntry
                            returnKeyType="send"
                            onChangeText={setCheck}
                            color={checkError && red}
                            onSubmitEditing={_checkNext}
                            placeholder={i18n.t("cn_pass")} 
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

export default connect(({ user: { email } }) => ({ email }), d => ({
    set: (target, data) => d({ target, data, type: "SET" }),
}))(UpdatePassword);
