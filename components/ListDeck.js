import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';

import Deck from './Deck'

import { getDecks, getDeck } from '../utils/storage';
import { darkBlue, lightBlue } from '../utils/colors';

class ListDeck extends Component {
    state = {
        contentLoading: true,
        decks: null
    }

    componentDidMount() {
        const decks = getDecks().then( (decks) => {
            this.setState({contentLoading: false, decks});
        });
    }

    render() {
        const { contentLoading, decks } = this.state;

        return (
            <View style={styles.container}>
                {contentLoading && <AppLoading />}
                {
                    contentLoading === false && 
                    decks !== null &&
                    Object.keys(decks).map( keyName => <Deck key={keyName} deck={decks[keyName]} /> )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    }
});

export default connect()(ListDeck);