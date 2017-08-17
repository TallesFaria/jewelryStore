import {
    GET_REPORTS
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_REPORTS:
            return { ...action.payload };
        default: 
            return state;    
    }
};
