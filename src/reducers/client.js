import {
    SET_CLIENT
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_CLIENT:
            return { ...state, client: action.payload };
        default: 
            return state;    
    }
};
