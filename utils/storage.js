import { AsyncStorage } from 'react-native';
import { STORAGE_KEY } from './constants';

/**
 * Get all decks.
 */
export function getDecks() {
    return AsyncStorage
        .getItem(STORAGE_KEY)
        .then(result => JSON.parse(results));
}

/**
 * Get an specific deck.
 * @param {string} key UUID
 */
export function getDeck(key) {
    return getDecks().then(decks => {
        return decks[key];
    });
}

/**
 * Add a new deck.
 * @param {string} key UUID
 * @param {object} deck
 */
export function addDeck(key, deck) {
    return AsyncStorage.mergeItem(
        STORAGE_KEY,
        JSON.stringify({ [key]: deck })
    );
}

/**
 * Add a new question.
 * @param {string} key 
 * @param {object} question 
 */
export function addQuestion(key, question) {
    return getDecks().then((decks) => {

        if (typeof decks[key] !== typeof undefined) {
            decks[key].questions.push(question);
        }
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    });
}