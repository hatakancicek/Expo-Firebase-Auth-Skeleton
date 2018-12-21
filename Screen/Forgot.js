
import { 
    red,
    ERR_NO_USER, 
    ERR_BAD_MAIL, 
} from '../Constants';
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
import { connect } from 'react-redux';
import Title from '../Components/Title';
import Input from '../Components/Input';
import React, { Component } from 'react';
import Button from '../Components/Button';
import { scale } from 'react-native-size-matters';

class Forgot extends Component {
    static navigationOptions = _ => ({
        title: i18n.t("forgot"),
    });

    state = {
        mail: "",
        loading: false,
        mailError: false,
    };

    _mailNext = _ =>
        this.reset();

    setMail = mail =>
        this.setState({ mail });

    reset = _ => {
        Keyboard.dismiss();

        const { set } = this.props;
        const { mail } = this.state;

        if(!mail) {
            this.setState({
                mailError: true,
            });

            return;
        };

        this.setState({
            loading: true,
            mailError: false,
        });

        set("disabled", true);

        firebase.auth().sendPasswordResetEmail(mail)
        .then(_ => {
            Alert.alert(
                i18n.t("forgot_done_t"),
                i18n.t("forgot_done_c"),
                [ {text: i18n.t("OK")}, ],
                { cancelable: true },
            );

            this.props.navigation.goBack();
        })
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

                default:
                    errText = i18n.t("err_unexpected");
            };

            set("disabled", false);

            Alert.alert(
                i18n.t("err_forgot"),
                errText,
                [ {text: i18n.t("OK")}, ],
                { cancelable: true },
            );

            console.log(err.code);
            console.log(err.toString());
            this.setState({
                loading: false,
            });
        });
    };

    componentWillMount() {
        this.setState({
            mail: this.props.navigation.state.params.mail,
        });
    };

    componentWillUnmount() {
        const { set } = this.props;
        Keyboard.dismiss();
        set("disabled", false);
    };

    render() {
        const { setMail, _mailNext, reset } = this;
        const { mail, mailError, loading } = this.state;

        return (
            <KeyboardAvoidingView style={styles.root} behavior="padding" >
                <TouchableOpacity
                    onPress={Keyboard.dismiss}
                >
                    <Title 
                        align="center"
                        style={styles.title}
                        text={i18n.t("forgot_t")} 
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
                <View style={styles.buttonWrapper} >
                    <Button 
                        text={i18n.t("reset")} 
                        onPress={reset}
                        disabled={loading}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    };
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingVertical: scale(40),
    },
    title: {
        marginBottom: scale(30),
        marginHorizontal: scale(15),
    },
    inputWrapper: {
        marginHorizontal: scale(30),
        marginVertical: scale(4),
        alignSelf: 'stretch',
    },
    buttonWrapper: {
        marginHorizontal: scale(30),
        marginTop: scale(15),
        alignSelf: 'stretch',
        marginBottom: scale(20),
    },
    buttonWrapper: {
        marginHorizontal: scale(30),
        marginTop: scale(15),
        alignSelf: 'stretch',
        marginBottom: scale(20),
    },
});

export default connect(null, d => ({
    set: (target, data) => d({ target, data, type: "SET" }),
}))(Forgot);
