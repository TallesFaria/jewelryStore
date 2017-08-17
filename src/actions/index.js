import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
    AUTH_USER,
    UNAUTH_USER, 
    AUTH_ERROR, 
    FETCH_MESSAGE, 
    ADD_CLIENT, 
    DELETE_CLIENT, 
    FETCH_CLIENTS, 
    FETCH_DEVEDORES, 
    SET_CLIENT, 
    EDIT_CLIENT,
    ADD_ACERTO, 
    DELETE_ACERTO, 
    FETCH_ACERTOS, 
    EDIT_ACERTO,
    SET_ACERTO,
    GET_REPORTS
 } from './types';

// const ROOT_URL = 'http://localhost:3090';
const ROOT_URL = '';

export function signinUser({ email, password }) {
    return function (dispatch) { 
        //submit email/password to the server
        axios.post(`${ROOT_URL}signin`, { email, password })
            .then((response) => {
                //if request is good
                //update state to indicate user is authenticated
                dispatch({
                    type: AUTH_USER
                });
                //save the JWT token
                localStorage.setItem('token', response.data.token);
                //redirect to the route '/feature'
                browserHistory.push('/inicio');
            })
            .catch(() => {
                //if request is bad
                //show an error to the user
                dispatch(authError('Bad login info'));
            });
    };
}

export function signupUser({ email, password }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}signup`, { email, password })
            .then((response) => {
                dispatch({
                    type: AUTH_USER
                });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/inicio');
            })
            .catch((response) => {
                dispatch(authError(response.data.error));
            });
    };
}

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    };
};

export const signoutUser = () => {
    localStorage.removeItem('token');

    return {
        type: UNAUTH_USER
    };
};

export const fetchMessage = () => {
    return (dispatch) => {
        axios.get(ROOT_URL, { headers: { authorization: localStorage.getItem('token') } })
            .then((response) => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                });     
            });
    };
};


export function addClient(client) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}addClient`, client)
            .then((response) => {
                dispatch({
                    type: ADD_CLIENT,
                    payload: {
                        client,
                        id: response.data.id
                    }
                });
                // client/${response.data.id}
                browserHistory.push('/inicio');
            })
            .catch((response) => {
                dispatch(authError(response.data.error));
            });
    };
}

export function deleteClient({ _id }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}deleteClient`, { _id })
            .then((response) => {
                dispatch({
                    type: DELETE_CLIENT,
                    payload: { _id }
                });
                browserHistory.push('/inicio');
            })
            .catch((response) => {
                dispatch(authError(response.data.error));
            });
    };
}

export function editClient(client) {
    console.log(client);
    return function (dispatch) {
        axios.post(`${ROOT_URL}updateClient`, client)
            .then(() => {
                dispatch({
                    type: EDIT_CLIENT,
                    payload: client
                });
                // browserHistory.push('/client/client._id');
                browserHistory.push('/inicio');
            })
            .catch((response) => {
                browserHistory.push('/inicio');
                dispatch(authError(response.data.error));
            });
    };
}

export const fetchClients = () => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}fetchClients`, { headers: { authorization: localStorage.getItem('token') } })
            .then((response) => {
                dispatch({
                    type: FETCH_CLIENTS,
                    payload: response.data
                });     
            });
    };
};

export const fetchDevedores = () => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}fetchDevedores`, { headers: { authorization: localStorage.getItem('token') } })
            .then((response) => {
                dispatch({
                    type: FETCH_DEVEDORES,
                    payload: response.data
                });     
            });
    };
};

export const fetchClientsByDate = (date) => {
    return (dispatch) => {
        axios.post(`${ROOT_URL}fetchClientsByDate`, { date })
            .then((response) => {
                dispatch({
                    type: FETCH_CLIENTS,
                    payload: response.data
                });     
            });
    };
};

export function setClient(client) {
    return function (dispatch) {
        dispatch({
            type: SET_CLIENT,
            payload: client
        });
    };
}

export function addAcerto(acerto) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}addAcerto`, acerto)
            .then((response) => {
                axios.post(`${ROOT_URL}updateAcertoClient`, acerto)
                    .then(() => {
                        browserHistory.push('/inicio');
                    })
                    .catch(() => {
                        dispatch(authError(response.data.error));
                    });
                    
                dispatch({
                    type: ADD_ACERTO,
                    payload: {
                        acerto,
                        id: response.data.id
                    }
                });
            })
            .catch((response) => {
                dispatch(authError(response.data.error));
            });
    };
}

export function deleteAcerto({ _id }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}deleteAcerto`, { _id })
            .then(() => {
                dispatch({
                    type: DELETE_ACERTO,
                    payload: { _id }
                });
                browserHistory.push('/inicio');
            })
            .catch((response) => {
                browserHistory.push('/inicio');
                dispatch(authError(response.data.error));
            });
    };
}

export const fetchAcertos = (_id) => {
    return (dispatch) => {
        axios.post(`${ROOT_URL}fetchAcertos`, { _id })
            .then((response) => {
                dispatch({
                    type: FETCH_ACERTOS,
                    payload: response.data
                });     
            });
    };
};

export const getReports = (dates) => {
    console.log(dates);
    return (dispatch) => {
        axios.post(`${ROOT_URL}getReports`, { dates })
            .then((response) => {
                dispatch({
                    type: GET_REPORTS,
                    payload: response.data
                });     
            });
    };
};

export function editAcerto(acerto) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}updateAcerto`, acerto)
            .then((response) => {
                dispatch({
                    type: EDIT_ACERTO,
                    payload: acerto
                });
                // browserHistory.push('/acerto/acerto._id');
                browserHistory.push('/inicio');
            })
            .catch((response) => {
                browserHistory.push('/inicio');
                dispatch(authError(response.data.error));
            });
    };
}

export function setAcerto(acerto) {
    return function (dispatch) {
        dispatch({
            type: SET_ACERTO,
            payload: acerto
        });
    };
}
