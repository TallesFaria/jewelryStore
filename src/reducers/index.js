import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import clientsReducer from './clients';
import devedoresReducer from './devedores';
import currentClientReducer from './client';
import acertosReducer from './acertos';
import currentAcertoReducer from './acerto';
import reportsReducer from './reports';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  clients: clientsReducer,
  currentClient: currentClientReducer,
  acertos: acertosReducer,
  currentAcerto: currentAcertoReducer,
  devedores: devedoresReducer,
  reports: reportsReducer
});

export default rootReducer;
