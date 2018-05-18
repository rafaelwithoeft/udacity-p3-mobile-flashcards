import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AddDeck from './components/AddDeck';
import AddQuestion from './components/AddQuestion';
import DetailDeck from './components/DetailDeck';
import ListDeck from './components/ListDeck';
import Quiz from './components/Quiz';
import ResultQuiz from './components/ResultQuiz';

import reducer from './reducers';

import { setLocalNotification } from './utils/helpers';
import { darkBlue, white } from './utils/colors';

function FlashCardStatusBar ({ backgroundColor, ...props }) {
  	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight}}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	);
}

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
				tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='shape-square-plus' size={30} color={tintColor} />
			}
		}
	},
	{
		tabBarPosition: "bottom",
		headerRight: (<View></View>),
		navigationOptions: {
			header: null
		},
		tabBarOptions: {
			showIcon: true,
			showLabel: false,
			activeTintColor: white,
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
		},
	}
);

const MainNavigator = StackNavigator(
	{
		Home: {
			screen: Tabs
		},
		DetailDeck: {
			screen: DetailDeck
		},
		AddQuestion: {
			screen: AddQuestion
		},
		Quiz: {
			screen: Quiz
		},
		ResultQuiz: {
			screen: ResultQuiz
		}
	},
);

export default class App extends React.Component {
	componentDidMount() {
		setLocalNotification();
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
