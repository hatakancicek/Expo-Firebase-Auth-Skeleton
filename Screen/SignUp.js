import { 
    View, 
    Alert,
    Keyboard,
    StyleSheet, 
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import i18n from 'i18n-js';
import firebase from 'firebase';
import {connect } from 'react-redux';
import Input from '../Components/Input';
import Title from '../Components/Title';
import React, { Component } from 'react';
import Button from '../Components/Button';
import { scale } from 'react-native-size-matters';
import { red, ERR_USER_EXIST, ERR_BAD_MAIL, ERR_BAD_PASS, } from '../Constants';



class SignUp extends Component {
    static navigationOptions = _ => ({
        title: i18n.t("signup"),
    });

    state = {
        mail: "",
        check: "",
        password: "",
        loading: false,
        mailError: false,
        passError: false,
        checkError: false,
    };
    
    setMail = mail =>
        this.setState({ mail });

    setPassword = password =>
        this.setState({ password });

    setCheck = check =>
        this.setState({ check });

    _mailNext = _ => {
        if(!this.state.password)
            this.password.focus();
        else 
            Keyboard.dismiss();
    };

    _passNext = _ => {
        if(!this.state.password)
            Keyboard.dismiss();
        else 
            this.check.focus();
    };

    _checkNext = _ =>  this.signUp();

    checkSignUp = _ => {
        const { mail, password, check, } = this.state;

        let mailError = false;
        let passError = false;
        let checkError = false;

        if(!mail) 
            mailError = true;
        if(!password) 
            passError = true;
        if(!password || password !== check || !check) 
            checkError = true;

        this.setState({ mailError, passError, checkError });

        return mail && password && (password === check);
    };

    signUp = _ => {
        const { checkSignUp } = this;
        const { set } = this.props;

        if(!checkSignUp()) return;

        const { 
            mail, 
            password,
        } = this.state;

        this.setState({
            loading: true,
        });

        set("disabled", true);

        firebase.auth().createUserWithEmailAndPassword(mail, password)
        .catch(err => {
            let errText;
            switch(err.code) {
                case ERR_BAD_MAIL:
                    errText = i18n.t("err_bad_mail");
                    this.setState({ mailError: true });
                    break;

                case ERR_USER_EXIST:
                    errText = i18n.t("err_user_exist");
                    break;

                case ERR_BAD_PASS:
                    errText = i18n.t("err_bad_pass");
                    this.setState({ passError: true, checkError: true });
                    break;

                default:
                    errText = i18n.t("err_unexpected");
            };

            set("disabled", false);

            Alert.alert(
                i18n.t("err_signup"),
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

        Keyboard.dismiss();
        set("disabled", false);
    };

    render() {
        const {
            signUp,
            setMail,
            setCheck,
            _mailNext,
            _passNext,
            _checkNext,
            setPassword,
        } = this;

        const {
            mail,
            check,
            loading,
            password,
            mailError,
            passError,
            checkError,
        } = this.state;

        return (
            <KeyboardAvoidingView style={styles.root} behavior="padding" >
                <TouchableOpacity
                    onPress={Keyboard.dismiss}
                >
                    <Title 
                        align="center"
                        style={styles.text}
                        text={i18n.t("welcome")} 
                    />
                </TouchableOpacity>
                <View style={styles.inputWrapper} >
                    <Input 
                        value={mail}
                        placeholder={i18n.t("email")} 
                        onChangeText={setMail}
                        returnKeyType="next"
                        autoCapitalize="none"
                        onSubmitEditing={_mailNext}
                        color={mailError && red}
                        autoFocus
                    />
                </View>
                <View style={styles.inputWrapper} >
                    <Input 
                        maxLength={24}
                        secureTextEntry
                        value={password}
                        returnKeyType="next"
                        color={passError && red}
                        onChangeText={setPassword}
                        onSubmitEditing={_passNext}
                        ref={ref => this.password = ref}
                        placeholder={i18n.t("password")} 
                    />
                </View>
                <View style={styles.inputWrapper} >
                    <Input 
                        value={check}
                        maxLength={24}
                        secureTextEntry
                        returnKeyType="go"
                        onChangeText={setCheck}
                        color={checkError && red}
                        onSubmitEditing={_checkNext}
                        ref={ref => this.check = ref}
                        placeholder={i18n.t("check")} 
                    />
                </View>
                <View style={styles.buttonWrapper} >
                    <Button 
                        onPress={signUp}
                        disabled={loading}
                        text={i18n.t("signup")} 
                    />
                </View>
            </KeyboardAvoidingView>
        );
    };
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginBottom: scale(30),
        marginHorizontal: scale(15),
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
});

export default connect(null, d => ({
    set: (target, data) => d({ target, data, type: "SET" }),
}))(SignUp);