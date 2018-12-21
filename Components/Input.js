import React from 'react';
import { primary, grey } from '../Constants';
import { scale } from 'react-native-size-matters';
import { TextInput, StyleSheet, Platform } from 'react-native';

export default class Input extends React.Component {
    focus = _ => 
        this.refs.input.focus();

    render() {
        const { color, ...props } = this.props;

        return(
            <TextInput
                ref="input"
                placeholderTextColor={grey}
                { ...props }
                style={{
                    ...styles.root,
                    borderColor: color || primary,
                    ...props.style,
                }}
                underlineColorAndroid="transparent"
            />
        );
    }
};
    
const styles = StyleSheet.create({
    root: {
        paddingHorizontal: scale(12),
        paddingVertical: scale(Platform.OS === 'ios' ? 8 : 0),
        borderWidth: scale(2),
        borderColor: primary,
        alignSelf: 'stretch',
        borderRadius: 70,
    },
});
