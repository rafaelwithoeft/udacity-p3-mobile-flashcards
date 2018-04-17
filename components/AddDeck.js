import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { newDeck } from '../utils/storage';
import { addDeck } from '../actions';

import { generateRandomKey } from '../utils/helpers';
import { grey, white, darkBlue } from '../utils/colors';

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
            key: key,
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
                <View style={styles.inputContainer}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="New card name"
                        autoFocus={true}
                        autoCapitalize="words"
                        maxLength={40}
                        style={styles.inputText}
                        onChangeText={(text) => this.setState({ title: text })}
                        value={this.state.title}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={this.handleAddDeck}>
                        <MaterialCommunityIcons name='plus' size={22} color={white} />
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        margin: 3
    },
    inputContainer: {
        flex: 1,
        justifyContent: "center"
    },
    inputText: {
        fontSize: 35,
        textAlign: "center",
        fontWeight: "bold",
        color: darkBlue
    },
    buttonContainer: {
        flexDirection: "row"
    },
    button: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 2,
        borderColor: grey,
        backgroundColor: darkBlue,
        padding: 10,
        marginBottom: 10,
    },
    buttonText: {
        alignSelf: "center",
        fontSize: 14,
        fontWeight: "bold",
        color: white
    }
});

export default connect()(AddDeck);