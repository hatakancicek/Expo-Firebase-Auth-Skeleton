
import { 
    red,
    ERR_BAD_MAIL,
    ERR_USER_EXIST,
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

class UpdateMail extends Component {
    static navigationOptions = _ => ({
        title: i18n.t("update_e"),
    });

    state = {
        email: "",
        password: "",
        hidden: false,
        loading: false,
        emailError: false,
        passwordError: false,
    };

    _passwordNext = _ =>
        this.save();

    setEMail = email =>
        this.setState({ email });

    setPassword = password =>
        this.setState({ password });

    _emailNext = _ => {
        if(!this.state.password)
            this.password.focus();
        else 
            Keyboard.dismiss();
    };

    check = _ => {
        const { email, password } = this.state;

        const emailError = !email;
        const passwordError = !password;

        this.setState({
            emailError,
            passwordError,
        });

        return !!email;
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
        const { email, password } = this.state;

        if(!check()) 
            return;

        this.setState({
            loading: true,
        });

        set("disabled", true);

        firebase.auth().signInWithEmailAndPassword(this.props.email, password)
        .then(_ => firebase.auth().currentUser.updateEmail(email))
        .then(_save)
        .catch(err => {
            set("disabled", false);

            let errText;
            switch(err.code) {
                case ERR_USER_EXIST:
                    errText = i18n.t("err_user_exist");
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

            Alert.alert(
                i18n.t("err_update_e"),
                errText,
                [ {text: i18n.t("OK")}, ],
                { cancelable: true },
            );

            this.setState({
                loading: false,
            });
        });
    };

    componentDidMount() {
        const { email } = this.props;

        this.setState({
            email,
        });
    }

    componentWillUnmount() {
        const { set } = this.props;
        set("disabled", false);
        Keyboard.dismiss();
    };

    render() {
        const { 
            save,
            setEMail, 
            _emailNext, 
            setPassword,
            _passwordNext,
        } = this;
        const { 
            email, 
            loading,
            password,
            emailError,
            passwordError,
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
                            value={email}
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={setEMail}
                            color={emailError && red}
                            onSubmitEditing={_emailNext}
                            placeholder={i18n.t("email")} 
                        />
                    </View>
                    <View style={styles.inputWrapper} >
                        <Input 
                            maxLength={24}
                            secureTextEntry
                            value={password}
                            returnKeyType="send"
                            onChangeText={setPassword}
                            color={passwordError && red}
                            onSubmitEditing={_passwordNext}
                            ref={ref => this.password = ref}
                            placeholder={i18n.t("password")} 
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
}))(UpdateMail);
