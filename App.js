import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Constants } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ListDeck from './components/ListDeck';

import reducer from './reducers';
import { blue, white } from './utils/colors';

function FlashCardStatusBar ({ backgroundColor, ...props }) {
  	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight}}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

const Tabs = TabNavigator(
	{
		ListDeck: {
			screen: ListDeck,
			navigationOptions: {
				tabBarLabel: "Decks",
				tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
			}
		}
	},
	{
		navigationOptions: {
			header: null,
		},
		tabBarOptions: {
			activeTintColor: white,
			style: {
				height: 56,
				backgroundColor: blue
			},
			labelStyle: {
				fontSize: 18,
			},
		}
	}
);

export default class App extends React.Component {
	componentDidMount() {
		//SET NOTIFICATION
	}

	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={{ flex: 1 }}>
					<FlashCardStatusBar backgroundColor={blue} barStyle="light-content" />
					<Tabs />
				</View>
			</Provider>
		);
	}
}