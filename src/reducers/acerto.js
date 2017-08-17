import {
    SET_ACERTO
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_ACERTO:
            return { ...state, acerto: action.payload };
        default: 
            return state;    
    }
};
