import React from 'react';
import {connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

export default connect(s => ({ disabled: s.disabled }))(
    ({ disabled }) => 
        <View 
            style={
                disabled
                    ? styles.show
                    : styles.hidden
            }
        />
);

const styles = StyleSheet.create({
    show: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    hidden: {
        width: 0,
        height: 0,
        position: 'absolute',
    },  
});