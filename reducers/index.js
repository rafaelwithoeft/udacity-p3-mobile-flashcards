import { RECEIVE_DECKS, ADD_DECK, UPDATE_DECK } from '../actions';

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
        case UPDATE_DECK:
            return {
                ...state,
                ...action.deck
            }
        default:
            return state;
    }
}

export default entries;
