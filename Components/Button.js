import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { scale, } from 'react-native-size-matters';
import { secondary, white, black } from '../Constants';

export default ({ 
    text, 
    style, 
    color, 
    onPress, 
    outline, 
    disabled, 
    textStyle, 
    hideLoading,
    ...props,
}) =>
    <TouchableOpacity
        {...props}
        onPress={disabled ? _ => {} : onPress}
        style={{
            ...styles.root,
            ...style,
            backgroundColor: outline
                ? null
                : color || secondary,
            borderColor: color || secondary,
        }}
    >
        {!hideLoading && disabled &&
        <ActivityIndicator
            color={outline
                ? black
                : white
            }
            size="small"
            style={styles.indicator}
        />}
        <Text
            style={{
                ...styles.text,
                ...textStyle,
                color: outline
                    ? black
                    : white
            }}
        >
            {text}
        </Text>
    </TouchableOpacity>

const styles = StyleSheet.create({
    root: {
        paddingVertical: scale(8),
        justifyContent: 'center',
        borderWidth: scale(2),
        alignItems: 'center',
        alignSelf: 'stretch',
        flexDirection: "row",
        borderRadius: 70,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0
        },
        elevation: 1,
    },
    text: {
        fontSize: scale(14),
    },
    indicator: {
        marginRight: scale(10),
    },
});