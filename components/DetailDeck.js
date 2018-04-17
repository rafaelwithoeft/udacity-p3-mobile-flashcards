import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { darkBlue, lightBlue, grey, white } from '../utils/colors';

class DetailDeck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params;

        return {
            title: "Details of Deck",
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

    render() {
        const { deck } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {deck.title}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <MaterialCommunityIcons name="plus" size={22} color={white} />
                        <Text style={styles.buttonText}> Add Question </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <MaterialCommunityIcons name="trophy" size={22} color={white} />
                        <Text style={styles.buttonText}> Start Quiz </Text>
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
        flex: 1
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

function mapStateToProps(state, { navigation }) {
    const { deck } = navigation.state.params;
    return {
        deck
    }
}

export default connect(mapStateToProps)(DetailDeck);