import _ from 'lodash';
import {
    FETCH_DEVEDORES
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_DEVEDORES:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        default: 
            return state;    
    }
};
