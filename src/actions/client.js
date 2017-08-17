import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_ERROR, ADD_CLIENT, DELETE_CLIENT, FETCH_CLIENTS, SET_CLIENT } from './types';

const ROOT_URL = 'http://localhost:3090';

export function addClient({ nome, email, observacao, endereco, telefone }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/addClient`, { nome, email, observacao, endereco, telefone })
            .then((response) => {
                dispatch({
                    type: ADD_CLIENT,
                    payload: {
                        nome, email, observacao, endereco, telefone, id: response.data.id
                    }
                });
                browserHistory.push('/agenda');
            })
            .catch((response) => {
                dispatch(authError(response.data.error));
            });
    };
}

export function deleteClient({ id }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/deleteClient`, { id })
            .then(() => {
                dispatch({
                    type: DELETE_CLIENT,
                    payload: { id }
                });
                browserHistory.push('/agenda');
            })
            .catch((response) => {
                dispatch(authError(response.data.error));
            });
    };
}

export function setClient(client) {
    return function (dispatch) {
        dispatch({
            type: SET_CLIENT,
            payload: client
        });
    };
}

export const fetchClients = () => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/fetchClients`, { headers: { authorization: localStorage.getItem('token') } })
            .then((response) => {
                dispatch({
                    type: FETCH_CLIENTS,
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
