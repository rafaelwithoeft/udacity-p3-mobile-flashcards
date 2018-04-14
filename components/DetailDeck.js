import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { darkBlue, lightBlue, grey, white, orange } from '../utils/colors';

export default class DetailDeck extends Component {
    render() {
        const { deck } = this.props;

        return null;
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