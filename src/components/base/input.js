import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = ({ type = 'text', label = "Label", placeholder = 'Placeholder', style, ...props }) => {

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                {...props}
                style={[styles.input, style]}
                placeholder={placeholder}
            />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        marginBottom: 10,
    },
    label: {
        fontSize: 12,
        color: '#9EA0A5',
        paddingLeft: 5,
        marginBottom: 5,
    },
    input: {
        padding: 15,
        borderRadius: 4,
        fontSize: 14,
        color: '#1F2A36',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E2E5ED',
    },
});