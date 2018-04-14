import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { newDeck } from '../utils/storage';
import { addDeck } from '../actions';

import { generateRandomKey } from '../utils/helpers';
import { lightBlue, darkBlue } from '../utils/colors';

class AddDeck extends Component {
    state = {
        title: null
    }

    toHome = () => {
        this.props.navigation.navigate("ListDeck");
    }

    handleAddDeck = () => {
        const key = generateRandomKey();
        const deck = {
            title: this.state.title,
            questions: []
        };

        //Redux
        this.props.dispatch(addDeck({
            [key]: deck
        }));

        //Local state
        this.setState({ title: null });
        this.toHome();

        //AsyncStorage
        newDeck({ key, deck });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="New card name"
                    style={styles.input}
                    onChangeText={(text) => this.setState({ title: text })}
                    value={this.state.title}
                />
                <TouchableOpacity style={styles.button} onPress={this.handleAddDeck}>
                    <MaterialCommunityIcons name='plus' size={30} color={lightBlue} />
                    <Text style={styles.text}>ADD</Text>
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
    input: {
        flex: 1,
        flexWrap: "wrap",
        marginBottom: 80,
    },
    button: {
        flex: 1,
        position: "absolute",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        right: 0,
        left: 0,
        bottom: 0,
        marginBottom: 10,
        padding: 5,
        height: 45,
        backgroundColor: darkBlue,
    },
    text: {
        color: lightBlue,
        fontSize: 20
    }
})

export default connect()(AddDeck);