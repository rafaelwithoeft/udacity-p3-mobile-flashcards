import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Constants } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ListDeck from './components/ListDeck';
import AddDeck from './components/AddDeck';

import reducer from './reducers';
import { darkBlue, lightBlue, white } from './utils/colors';

function FlashCardStatusBar ({ backgroundColor, ...props }) {
  	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight}}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	);
}

const headerOptions = {
	headerStyle: {
		height: 25,
		backgroundColor: darkBlue,
		borderBottomColor: lightBlue,
		borderBottomWidth: 2,
	},
	headerTintColor: lightBlue,
	headerTitleStyle: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		textAlign: "center",
		fontSize: 18,
	},
};

const Tabs = TabNavigator(
	{
		ListDeck: {
			screen: ListDeck,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
			}
		},
		AddDeck: {
			screen: AddDeck,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='plus' size={30} color={tintColor} />
			}
		}
	},
	{
		tabBarPosition: "bottom",
		navigationOptions: {
			header: null
		},
		tabBarOptions: {
			showIcon: true,
			showLabel: false,
			activeTintColor: lightBlue,
			style: {
				height: 45,
				backgroundColor: darkBlue,
				shadowColor: 'rgba(0, 0, 0, 0.24)',
				shadowOffset: {
					width: 0,
					height: 3
				},
				shadowRadius: 6,
				shadowOpacity: 1
			}
		}
	}
);

const MainNavigator = StackNavigator(
	{
		Home: Tabs
	},
);

export default class App extends React.Component {
	componentDidMount() {
		//SET NOTIFICATION
	}

	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={{ flex: 1 }}>
					<FlashCardStatusBar backgroundColor={darkBlue} barStyle="light-content" />
					<MainNavigator />
				</View>
			</Provider>
		);
	}
}