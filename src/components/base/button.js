import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ variant = '', text = 'Button', style, ...props }) => {
    let buttonStyle;
    let textStyle;

    switch (variant) {
        case 'primary-purple':
            buttonStyle = styles.primaryPurple;
            textStyle = styles.textWhite;
            break;
        case 'secondary-purple':
            buttonStyle = styles.secondaryPurple;
            textStyle = styles.textPurple;
            break;
        case 'primary-yellow':
            buttonStyle = styles.primaryYellow;
            textStyle = styles.textWhite;
            break;
        default:
            buttonStyle = styles.defaultButton;
            textStyle = styles.textYellow;
    }

    return (
        <TouchableOpacity {...props} style={[buttonStyle, style]}>
            <Text style={[styles.textBase, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    primaryPurple: {
        padding: 15,
        backgroundColor: '#5E50A1',
        borderRadius: 4,
    },
    secondaryPurple: {
        padding: 15,
        backgroundColor: 'white',
        borderColor: '#5E50A1',
        borderWidth: 1,
        borderRadius: 4,
    },
    primaryYellow: {
        padding: 15,
        backgroundColor: '#FBB017',
        borderRadius: 4,
    },
    defaultButton: {
        padding: 15,
        backgroundColor: 'white',
        borderColor: '#FBB017',
        borderWidth: 1,
        borderRadius: 4,
    },
    textBase: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 20,
        textAlign: 'center',
    },
    textWhite: {
        color: '#FFFFFF',
    },
    textPurple: {
        color: '#5E50A1',
    },
    textYellow: {
        color: '#FBB017',
    },
});
