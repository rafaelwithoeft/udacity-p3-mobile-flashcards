import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation';
import { AppLoading } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ResultQuiz from './ResultQuiz';

import { darkBlue, lightBlue, grey, white, green, red } from '../utils/colors';

class Quiz extends Component {
    state = {
        questions: [],
        currentIndex: 0,
        totalQuestions: 0,
        correct: 0,
        wrong: 0,
        showAnswer: false,
        contentLoading: true
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Quiz",
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

    componentDidMount() {
        const { deck } = this.props;

        this.setState({
            questions: deck.questions,
            totalQuestions: deck.questions.length,
            contentLoading: false
        });
    }

    handleShowAnswer = () => {
        this.setState({
            showAnswer: true
        }) ;
    }

    handleCorrectAnswer = () => {
        this.setState((prevState) => {
            return {
                correct: prevState.correct + 1,
                currentIndex: prevState.currentIndex + 1,
                showAnswer: false
            }
        });
    }

    handleWrongAnswer = () => {
        this.setState((prevState) => {
            return {
                wrong: prevState.wrong + 1,
                currentIndex: prevState.currentIndex + 1,
                showAnswer: false
            }
        });
    }

    handleRestart = () => {
        this.setState((prevState) => {
            return {
                correct: 0,
                currentIndex: 0,
                wrong: 0,
                showAnswer: false
            }
         });
    }

    handleBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        const { 
            currentIndex,
            questions, 
            totalQuestions, 
            showAnswer, 
            contentLoading, 
            correct, 
            wrong 
        } = this.state;

        if (contentLoading) {
            return <AppLoading onError={console.warn} />;
        }

        if (totalQuestions === 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            This deck has no questions.
                        </Text>
                    </View>
                </View>
            );
        }

        if (currentIndex < totalQuestions) {
            return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            {!showAnswer && questions[currentIndex].question}
                            {showAnswer && questions[currentIndex].answer}
                        </Text>
                    </View>
                    <View style={styles.answeredContainer}>
                        <Text style={styles.answeredText}>
                            You answered {currentIndex} of {totalQuestions} questions.
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        {
                            !showAnswer && 
                            <TouchableOpacity style={styles.button} onPress={this.handleShowAnswer}>
                                <MaterialCommunityIcons name="forward" size={22} color={white} />
                                <Text style={styles.buttonText}> Show answer </Text>
                            </TouchableOpacity>
                        }
                        {
                            showAnswer &&
                            <TouchableOpacity style={[styles.button, styles.buttonCorrect]} onPress={this.handleCorrectAnswer}>
                                <MaterialCommunityIcons name="check-circle-outline" size={22} color={white} />
                                <Text style={styles.buttonText}> Correct </Text>
                            </TouchableOpacity>
                        }
                        {
                            showAnswer &&
                            <TouchableOpacity style={[styles.button, styles.buttonWrong]} onPress={this.handleWrongAnswer}>
                                <MaterialCommunityIcons name="close-circle-outline" size={22} color={white} />
                                <Text style={styles.buttonText}> Wrong </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            );
        }

        return (
            <ResultQuiz 
                correct={correct}
                totalQuestions={totalQuestions}
                handleRestart={this.handleRestart}
                handleBack={this.handleBack}
            />
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
        flex: 1,
        justifyContent: "center"
    },
    titleText: {
        fontSize: 35,
        textAlign: "center",
        fontWeight: "bold",
        color: darkBlue
    },
    answeredContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },
    answeredText: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        justifyContent: "flex-end",
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
    buttonCorrect: {
        backgroundColor: green
    },
    buttonWrong: {
        backgroundColor: red
    },
    buttonText: {
        alignSelf: "center",
        fontSize: 14,
        fontWeight: "bold",
        color: white
    },
    questionContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    questionText: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        color: darkBlue
    }
});

function mapStateToProps(state, { navigation }) {
    const { key } = navigation.state.params;
    
    return {
        deck: state[key]
    }
}

export default connect(mapStateToProps)(Quiz);
