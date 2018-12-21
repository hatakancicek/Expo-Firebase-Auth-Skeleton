
import { 
    SafeAreaView,
    View,
    Alert,
    Keyboard, 
    StyleSheet, 
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import { 
    red,
    grey, 
} from '../Constants';
import i18n from 'i18n-js';
import firebase from 'firebase';
import { connect } from 'react-redux';
import Title from '../Components/Title';
import Input from '../Components/Input';
import React, { Component } from 'react';
import Button from '../Components/Button';
import { scale } from 'react-native-size-matters';

class Name extends Component {
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

    save = _ => {
        Keyboard.dismiss();

        const { check } = this;
        const { set } = this.props;
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
        .then(_ => {
            this.props.navigation.navigate('Home');
        })
        .catch(err => {
            set("disabled", false);

            console.log(err);
            
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
            <SafeAreaView 
                style={styles.root} 
            >
                <KeyboardAvoidingView 
                    behavior="padding" 
                    style={[styles.root, styles.wrapper]} 
                >
                    <TouchableOpacity
                        onPress={Keyboard.dismiss}
                    >
                        <Title 
                            align="center"
                            style={styles.title}
                            text={i18n.t("name_t")} 
                        />
                        <Title 
                            align="center"
                            type="content"
                            style={styles.content}
                            text={i18n.t("name_c")} 
                        />
                    </TouchableOpacity>
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
            </SafeAreaView>
        );
    };
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    wrapper: {
        paddingVertical: scale(40),
    },
    title: {
        marginBottom: scale(5),
    },
    content: {
        color: grey,
        marginBottom: scale(30),
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
}))(Name);
