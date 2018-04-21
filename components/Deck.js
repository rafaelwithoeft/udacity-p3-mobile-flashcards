import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { darkBlue, lightBlue, grey, white, orange } from '../utils/colors';

export default class Deck extends Component {
    render() {
        const { deck } = this.props;

        const countQuestions = deck.questions !== null ? deck.questions.length : 0;
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity 
                        onPress={() => {
                            this.props.navigation.navigate(
                                'DetailDeck',
                                { key: deck.key }
                            );
                        }}
                    >
                        <Text numberOfLines={2} style={styles.titleText}>
                            {deck.title}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{countQuestions} Question(s)</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        margin: 3,
        borderWidth: 2,
        borderRadius: 2,
        borderColor: grey,
        backgroundColor: white
    },
    titleContainer: {
        flex: 1,
        justifyContent: "center",
        paddingTop: 5
    },
    titleText: {
        fontSize: 18,
        textAlign: "center",
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#000",
        fontWeight: "bold",
        color: darkBlue
    },
    badgeContainer: {
        flex: 1,
        backgroundColor: grey,
        justifyContent: "center",
        borderRadius: 4,
        margin: 5,
        marginTop: 15,
    },
    badgeText: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        color: darkBlue
    }
});