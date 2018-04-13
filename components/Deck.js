import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Deck extends Component {
    render() {
        const { deck } = this.props;
        return (
            <View>
                <Text>{deck.title}</Text>
            </View>
        );
    }
}