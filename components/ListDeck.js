import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';

import Deck from './Deck'

import { receiveDecks } from '../actions'

import { getDecks, getDeck, clearStorage } from '../utils/storage';
import { darkBlue, lightBlue } from '../utils/colors';

class ListDeck extends Component {
    state = {
        contentLoading: true
    }

    componentDidMount() {
        const { dispatch } = this.props;

        const decks = getDecks()
            .then( (decks) => dispatch(receiveDecks(decks)) )
            .then(() => this.setState(() => ({ contentLoading: false })))
    }

    render() {
        const { contentLoading } = this.state;
        const { decks } = this.props;

        if (contentLoading) {
            return <AppLoading onError={console.warn} />;
        }

        return (
            <View style={styles.container}>
                {
                    contentLoading === false && 
                    decks !== null &&
                    <FlatList
                        data={Object.keys(decks)}
                        keyExtractor={item => item}
                        renderItem={({ item }) => <Deck key={item} deck={decks[item]} navigation={this.props.navigation} />}
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(ListDeck);