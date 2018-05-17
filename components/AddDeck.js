import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { newDeck } from '../utils/storage';
import { addDeck } from '../actions';

import { generateRandomKey } from '../utils/helpers';
import { grey, white, darkBlue, red } from '../utils/colors';

class AddDeck extends Component {
    state = {
        title: null,
        error: null
    }

    toHome = key => {
        this.props.navigation.navigate("DetailDeck", { key });
    }

    handleAddDeck = () => {
        const { title } = this.state;

        if (title === null || title.trim().length === 0) {
            this.setState({ error: "Name can't be empty." });
            return;
        }

        const key = generateRandomKey();
        const deck = {
            key,
            title,
            questions: []
        };

        //Redux
        this.props.dispatch(addDeck({
            [key]: deck
        }));

        //Local state
        this.setState({ title: null, error: null });
        this.toHome(key);

        //AsyncStorage
        newDeck({ key, deck });
    }

    render() {
        const { error } = this.state;
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
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
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
        justifyContent: "space-between",
        margin: 3
    },
    inputContainer: {
        flex: 1,
        justifyContent: "center"
    },
    errorContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },
    errorText: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: red
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