import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'

class ListDeck extends Component {
    render() {
        return (
            <View>
                <Text> test </Text>
            </View>
        )
    }
}

export default connect()(ListDeck);