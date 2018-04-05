export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const UPDATE_DECK = 'UPDATE_DECK';

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
 * Update deck.
 * @param {object} deck 
 */
export function updateDeck(deck) {
    return {
        type: UPDATE_DECK,
        deck
    }
}