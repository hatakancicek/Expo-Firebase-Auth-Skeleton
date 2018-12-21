import { 
    red, 
    grey,
    ERR_NO_USER, 
    ERR_BAD_MAIL, 
    ERR_WRONG_PASS,
} from '../Constants';
import { 
    View, 
    Text,
    Alert,
    Keyboard,
    StyleSheet, 
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import i18n from 'i18n-js';
import firebase from 'firebase';
import { connect } from 'react-redux';
import Input from '../Components/Input';
import Title from '../Components/Title';
import React, { Component } from 'react';
import Button from '../Components/Button';
import { scale } from 'react-native-size-matters';

class Login extends Component {
    static navigationOptions = _ => ({
        title: i18n.t("login"),
    });

    state = {
        mail: "",
        password: "",
        loading: false,
        mailError: false,
        passError: false,
    };
    
    setMail = mail =>
        this.setState({ mail });

    setPassword = password =>
        this.setState({ password });

    _mailNext = _ => {
        if(!this.state.password)
            this.password.focus();
        else 
            Keyboard.dismiss();
    };

    _passNext = _ =>  this.login();

    checkLogin = _ => {
        const { mail, password } = this.state;

        let mailError = false;
        let passError = false;

        if(!mail) mailError = true;
        if(!password) passError = true;

        this.setState({ mailError, passError });

        return mail && password;
    };

    login = _ => {
        const { checkLogin } = this;
        const { set } = this.props;

        if(!checkLogin()) return;

        const { 
            mail, 
            password,
        } = this.state;

        this.setState({
            loading: true,
        });

        set("disabled", true);

        firebase.auth().signInWithEmailAndPassword(mail, password)
        .catch(err => {
            let errText;
            switch(err.code) {
                case ERR_NO_USER:
                    errText = i18n.t("err_no_user");
                    break;
                
                case ERR_BAD_MAIL:
                    errText = i18n.t("err_bad_mail");
                    this.setState({ mailError: true });
                    break;

                case ERR_WRONG_PASS:
                    errText = i18n.t("err_wrong_pass");
                    this.setState({ passError: true });
                    break;

                default:
                    errText = i18n.t("err_unexpected");
            };

            set("disabled", false);

            Alert.alert(
                i18n.t("err_login"),
                errText,
                [ {text: i18n.t("OK")}, ],
                { cancelable: true },
            );

            this.setState({
                loading: false,
            });
        });
    };

    navigateToForgot = _ => 
        this.props.navigation.navigate("Forgot", { mail: this.state.mail });

    componentWillUnmount() {
        const { set } = this.props;

        Keyboard.dismiss();
        set("disabled", false);
    };

    render() {
        const {
            login,
            setMail,
            _mailNext,
            _passNext,
            setPassword,
            navigateToForgot,
        } = this;

        const {
            mail,
            loading,
            password,
            mailError,
            passError,
        } = this.state;

        return (
            <KeyboardAvoidingView style={styles.root} behavior="padding" >
                <TouchableOpacity
                    onPress={Keyboard.dismiss}
                >
                    <Title 
                        align="center"
                        style={styles.text}
                        text={i18n.t("good_to_see")} 
                    />
                </TouchableOpacity>
                <View style={styles.inputWrapper} >
                    <Input 
                        value={mail}
                        returnKeyType="next"
                        autoCapitalize="none"
                        onChangeText={setMail}
                        color={mailError && red}
                        onSubmitEditing={_mailNext}
                        placeholder={i18n.t("email")} 
                        autoFocus
                    />
                </View>
                <View style={styles.inputWrapper} >
                    <Input 
                        maxLength={24}
                        secureTextEntry
                        value={password}
                        returnKeyType="go"
                        color={passError && red}
                        onChangeText={setPassword}
                        onSubmitEditing={_passNext}
                        ref={ref => this.password = ref}
                        placeholder={i18n.t("password")} 
                    />
                </View>
                <TouchableOpacity
                    onPress={navigateToForgot}
                    style={styles.forgotWrapper}
                >
                    <Text style={styles.forgotText} >
                        {i18n.t("forgot")}
                    </Text>
                </TouchableOpacity>
                <View style={styles.buttonWrapper} >
                    <Button 
                        onPress={login}
                        disabled={loading}
                        text={i18n.t("login")} 
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
    forgotText: {
        color: grey,
        fontSize: scale(10),
        fontStyle: "italic",
        marginTop: scale(2),
    },
    forgotWrapper: {
        alignSelf: 'flex-end',
        marginBottom: scale(4),
        marginHorizontal: scale(40),
    }
});

export default connect(null, d => ({
    set: (target, data) => d({ target, data, type: "SET" }),
}))(Login);