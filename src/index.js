import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import reduxThunk from 'redux-thunk';

//Auth
import App from './components/app';
import reducers from './reducers';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import { AUTH_USER } from './actions/types';

//Home
import Single from './components/abas/Client/Single';
import Agenda from './components/abas/Client/Agenda';
import TodosClientes from './components/abas/Client/TodosClientes';
import CadastroTotal from './components/abas/CadastroTotal';
import Devedores from './components/abas/Devedores';
import Relatorios from './components/abas/Relatorios';
import EditClient from './components/abas/Client/EditClient';

//Client's operations
import EditAcerto from './components/abas/Client/EditAcerto';
import AcertoSingle from './components/abas/Client/AcertoSingle';
import GoogleMap from './components/abas/Client/googleMap';
import Historico from './components/abas/Client/Historico';
import AgendaDia from './components/abas/Client/AgendaDia';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//if we have a token, consider the user to be signed in
if (token) {
  //we need to update application state
  store.dispatch({
    type: AUTH_USER
  });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="inicio" component={RequireAuth(AgendaDia)} />
        <Route path="feature" component={RequireAuth(Feature)} />
        <Route path="agenda" component={RequireAuth(Agenda)} />
        <Route path="clientes" component={RequireAuth(TodosClientes)} />
        <Route path="cadastro" component={RequireAuth(CadastroTotal)} />
        <Route path="devedores" component={RequireAuth(Devedores)} />
        <Route path="relatorios" component={RequireAuth(Relatorios)} />
        <Route path="client/:_id" component={RequireAuth(Single)} />   
        <Route path="clientEdit/:_id" component={RequireAuth(EditClient)} />   
        <Route path="acertoEdit/:_id" component={RequireAuth(EditAcerto)} />   
        <Route path="acerto/:_id" component={RequireAuth(AcertoSingle)} />   
        <Route path="map/:_id" component={RequireAuth(GoogleMap)} />   
        <Route path="data/:_id" component={RequireAuth(Historico)} />   
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.full-screen'));
