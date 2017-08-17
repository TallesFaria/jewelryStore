const passport = require('passport');

const Authentication = require('./controllers/authentication');
const Client = require('./controllers/client');
const Acertos = require('./controllers/acertos');

const passportService = require('./services/passport');
const ClientDB = require('./models/client');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
    app.get('/fetchClients', requireAuth, Client.fetchData);
    app.get('/fetchDevedores', requireAuth, Client.fetchDevedores);
    app.post('/fetchAcertos', Acertos.fetchAcertos);
    app.post('/fetchClientsByDate', Client.fetchClientsByDate);
    app.post('/getReports', Acertos.getReports);
    app.get('/', requireAuth, function (req, res) {
        res.send({ message: 'Super secret code is aufsdifah' });
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.post('/addClient', Client.addClient);
    app.post('/deleteClient', Client.deleteClient);
    app.post('/updateClient', Client.updateClient);
    app.post('/addAcerto', Acertos.addAcerto);
    app.post('/deleteAcerto', Acertos.deleteAcerto);
    app.post('/updateAcerto', Acertos.updateAcerto);
    app.post('/updateAcertoClient', Client.updateAcertoClient);
};
