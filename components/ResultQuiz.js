import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation';
import { AppLoading } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { setLocalNotification } from '../utils/helpers';

import { darkBlue, lightBlue, grey, white, green, red } from '../utils/colors';

export default class ResultQuiz extends Component {
    componentDidMount() {
        setLocalNotification();
    }

    render() {
        const { totalQuestions, correct, handleBack, handleRestart } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        You correctly answered {correct} of {totalQuestions} questions.
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleRestart}>
                        <MaterialCommunityIcons name="restart" size={22} color={white} />
                        <Text style={styles.buttonText}> Restart Quiz </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleBack}>
                        <MaterialCommunityIcons name="reply-all" size={22} color={white} />
                        <Text style={styles.buttonText}> Back to Deck </Text>
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
    titleContainer: {
        flex: 1,
        justifyContent: "center"
    },
    titleText: {
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