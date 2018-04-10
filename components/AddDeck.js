import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { lightBlue, darkBlue } from '../utils/colors';

class AddDeck extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons name='plus' size={30} color={lightBlue} />
                    <Text style={styles.text}>Add</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkBlue
    },
    text: {
        color: lightBlue
    }
})

export default connect()(AddDeck);