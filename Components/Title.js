import React from 'react';
import { black } from '../Constants';
import { Text, StyleSheet, } from 'react-native';
import { scale } from 'react-native-size-matters';

export default ({ text, align, type, style }) =>
    <Text style={{
        ...styles.root,
        ...type==="content" &&
            styles.content,
        ...type==="subContent" &&
            styles.subContent,
        ...style,
        textAlign: align || "left",
    }} >{text}</Text>

const styles = StyleSheet.create({
    root: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: black,
    },
    content: {
        fontSize: scale(14),
        fontWeight: 'normal',
    },
    subContent: {
        fontSize: scale(12),
        fontWeight: 'normal',
        fontStyle: 'italic',
    }
});