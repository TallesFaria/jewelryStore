import _ from 'lodash';
import {
    ADD_CLIENT,
    DELETE_CLIENT, 
    FETCH_CLIENTS
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_CLIENT:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_CLIENT:
            return _.omit(state, action.payload);
        case FETCH_CLIENTS:
            return { ..._.mapKeys(action.payload, '_id') };
        default: 
            return state;    
    }
};
