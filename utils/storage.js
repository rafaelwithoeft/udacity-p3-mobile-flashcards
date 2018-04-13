import { AsyncStorage } from 'react-native';
import { STORAGE_KEY } from './constants';

/**
 * Get all decks.
 */
export function getDecks() {
    return AsyncStorage
        .getItem(STORAGE_KEY)
        .then( results => JSON.parse(results) )
        .catch(e => console.log('err', e));
}

/**
 * Get an specific deck.
 * @param {string} key UUID
 */
export function getDeck(key) {
    return getDecks().then(decks => {
        console.log(decks);
        return decks[key];
    });
}

/**
 * Add a new deck.
 * @param {string} key UUID
 * @param {object} deck
 */
export function newDeck({ key, deck }) {
    console.log(key, deck);
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
export function newQuestion(key, question) {
    return getDecks().then((decks) => {

        if (typeof decks[key] !== typeof undefined) {
            decks[key].questions.push(question);
        }
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    });
}