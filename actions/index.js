export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';

/**
 * Receive all decks.
 * @param {object} decks 
 */
export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

/**
 * Add new deck.
 * @param {object} deck 
 */
export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

/**
 * 
 * @param {string} key Deck key
 * @param {object} question Question object
 */
export function addQuestion({key, question}) {
    return {
        type: ADD_QUESTION,
        key,
        question
    }
}