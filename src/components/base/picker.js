import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const CustomPicker = ({ selectedValue, onValueChange, items, placeholder }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelect = (value) => {
        onValueChange(value);
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity style={styles.pickerContainer} onPress={() => setModalVisible(true)}>
                <Text style={styles.pickerText}>{selectedValue || placeholder}</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <FlatList
                            data={items}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <Text style={styles.itemText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CustomPicker;

const styles = StyleSheet.create({
    pickerContainer: {
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    pickerText: {
        color: '#1F2A36',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight: '50%',
        width: '50%',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    itemText: {
        color: '#1F2A36',
    },
});

