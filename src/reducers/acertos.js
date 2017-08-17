import _ from 'lodash';
import {
    ADD_ACERTO,
    DELETE_ACERTO,
    EDIT_ACERTO, 
    FETCH_ACERTOS
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_ACERTO:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_ACERTO:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_ACERTO:
            return _.omit(state, action.payload);
        case FETCH_ACERTOS:
            return { ..._.mapKeys(action.payload, '_id') };
        default: 
            return state;    
    }
};
