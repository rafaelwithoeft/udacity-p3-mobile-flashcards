import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { newQuestion } from '../utils/storage';
import { addQuestion } from '../actions';

import { grey, white, darkBlue, lightBlue, red } from '../utils/colors';

class AddQuestion extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Add new question",
            headerStyle: {
                height: 30,
                backgroundColor: darkBlue,
                borderBottomColor: lightBlue,
                borderBottomWidth: 2
            },
            headerTintColor: white,
            headerTitleStyle: {
                flex: 1,
                textAlign: "center",
                alignSelf: "center",
                fontSize: 18,
            },
            headerRight: (<View></View>)
        }
    };

    state = {
        question: null,
        answer: null,
        error: null,
    }

    handleAddQuestion = () => {
        const { deck } = this.props;
        const { question, answer, error } = this.state;

        if (question === null || question.trim().length === 0) {
            this.setState({ error: "Question can't be empty." });
            return;
        }

        if (answer === null || answer.trim().length === 0) {
            this.setState({ error: "Answer can't be empty." });
            return;
        }

        const questionObject = { question, answer };

        //Redux
        this.props.dispatch(
            addQuestion({
                key: deck.key,
                question: questionObject
            })
        );

        //Local state
        this.props.navigation.goBack();
        this.setState({ question: null, answer: null, error: null });
        
        //AsyncStorage
        newQuestion({ key: deck.key, questionObject });
    }

    render() {
        const { error } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="Question"
                        autoFocus={true}
                        autoCapitalize="words"
                        maxLength={40}
                        style={styles.inputText}
                        onChangeText={(text) => this.setState({ question: text })}
                        value={this.state.question}
                    />
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="Answer"
                        autoCapitalize="words"
                        maxLength={40}
                        style={styles.inputText}
                        onChangeText={(text) => this.setState({ answer: text })}
                        value={this.state.answer}
                    />
                </View>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={this.handleAddQuestion}>
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

function mapStateToProps(state, { navigation }) {
    const { key } = navigation.state.params;
    return {
        deck: state[key]
    }
}

export default connect(mapStateToProps)(AddQuestion);