import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_ERROR, ADD_ACERTO, DELETE_ACERTO, FETCH_ACERTOS } from './types';

const ROOT_URL = 'http://localhost:3090';

export function addAcerto({ id, cod, dataAcerto, acerto, venda, proximoMostruario, proximaData }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/addAcerto`, { id, cod, dataAcerto, acerto, venda, proximoMostruario, proximaData })
            .then(() => {
                dispatch({
                    type: ADD_ACERTO,
                    payload: {
                        id, cod, dataAcerto, acerto, venda, proximoMostruario, proximaData
                    }
                });
                browserHistory.push('/agenda');
            })
            .catch((response) => {
                dispatch(authError(response.data.error));
            });
    };
}

export function deleteAcerto({ id }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/deleteAcerto`, { id })
            .then(() => {
                dispatch({
                    type: DELETE_ACERTO,
                    payload: { id }
                });
            })
            .catch((response) => {
                dispatch(authError(response.data.error));
            });
    };
}

export const fetchAcertos = () => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/fetchAcertos`, { headers: { authorization: localStorage.getItem('token') } })
            .then((response) => {
                dispatch({
                    type: FETCH_ACERTOS,
                    payload: response.data
                });     
            });
    };
};

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    };
};
