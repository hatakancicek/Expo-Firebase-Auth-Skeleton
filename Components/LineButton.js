import React from 'react';
import { scale } from 'react-native-size-matters';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default ({text, style, color, ...props}) =>
    <TouchableOpacity
        style={{
            ...styles.root,
            ...style,
        }}
        {...props}
    >
        <Text
            style={{
                ...styles.text,
                color,
            }}
        >
            {text}
        </Text>
    </TouchableOpacity>

const styles = StyleSheet.create({
    root: {
        borderTopWidth: 1,
        alignSelf: 'stretch',
        borderColor: "#01579B",
        paddingVertical: scale(18),
        marginHorizontal: scale(15),
        paddingHorizontal: scale(5),
    },
    text: {
        fontSize: scale(12),
    },
});
