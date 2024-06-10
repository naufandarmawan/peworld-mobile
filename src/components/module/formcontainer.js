import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FormContainer = ({ children, formTitle, formDescription, ...props }) => {
    return (
        <View style={styles.container}>
            {(formTitle || formDescription) &&
                <View style={styles.header}>
                    {formTitle && <Text style={styles.title}>{formTitle}</Text>}
                    {formDescription && <Text style={styles.description}>{formDescription}</Text>}
                </View>}
            <View {...props} style={styles.form}>
                {children}
            </View>
        </View>
    );
};

export default FormContainer;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingVertical: 32,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'column',
        marginBottom: 32,
        gap: 4,
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        color: '#46505C',
    },
    description: {
        fontSize: 18,
        fontWeight: '400',
        color: '#858D96',
    },
    form: {
        flexDirection: 'column',
        gap: 32,
    },
});

