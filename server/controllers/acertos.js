const Acerto = require('../models/acerto');

exports.deleteAcerto = function (req, res, next) {
    //User has already had their email and password auth'd
    //we just need to give them a token
    Acerto.findOne({ _id: id }, function (err, existingAcerto) {
        if (err) { return next(err); }

        //if a user with email does exist, delete it

        if (existingAcerto) {
            Acerto.remove({ _id: id }, function (err) {
                if (err) { return next(err); }

                //respond to request indicating the Acerto was deleted
                res.json({ message: 'Acerto deleted!' });
            });
        }
        
        return res.status(422).send({
            error: 'No Acerto like this'
        });
    });
};

exports.addAcerto = function (req, res, next) {
    const clientId = req.body.clientId;
    const cod = req.body.cod;
    const dataAcerto = req.body.dataAcerto;
    const acerto = req.body.acerto;
    const venda = req.body.venda;
    const novoCod = req.body.novoCod;
    const proximoEncontro = req.body.proximoEncontro;

    //see if a user with the given email exists
    Acerto.findOne({ clientId: clientId }, function (err, existingAcerto) {
        if (err) { return next(err); }

        // if (existingAcerto) {
        //     return res.status(422).send({ error: 'Anything...' });
        // }
        //create and save user record
        const acertoAux = new Acerto({
            clientId: clientId,
            cod: cod,
            dataAcerto: dataAcerto,
            acerto: acerto,
            venda: venda,
            novoCod: novoCod,
            proximoEncontro: proximoEncontro
        });

        acertoAux.save(function (err) {
            if (err) { return next(err); }

            //respond to request indicating the user was created
            res.json({ id: acertoAux._id });
        });
    });
};

exports.fetchAcertos = function (req, res, next) {
    const _id = req.body._id;
    console.log('Fetching acertos: ', req.body);
    Acerto.find({ clientId: _id }, function (err, data) {
        if (err) { return next(err); }

        if (data) {
            console.log(data);
            return res.send(data);
        }
    });
};

exports.getReports = function (req, res, next) {
    const dataInicio = new Date(req.body.dates.dataAcerto);
    const dataFinal = new Date(req.body.dates.proximoEncontro);
    let acertos = 0;
    let venda = 0;
    Acerto.find({ dataAcerto: { $gte: dataInicio, $lte: dataFinal } }, function (err, data) {
        if (err) { return next(err); }
        //{ $gte: dataInicio, $lte: dataFinal }
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (!isNaN(data[i].acerto) || !isNaN(data[i].venda)) {
                    acertos += data[i].acerto;
                    venda += data[i].venda;
                }
            }
            return res.send({
                acertos: acertos,
                venda: venda,
                debito: (venda - acertos),
                dataInicio: req.body.dates.dataAcerto,
                dataFinal: req.body.dates.proximoEncontro,
            });
        }
    });
};

exports.updateAcerto = function (req, res, next) {
    const _id = req.body._id;
    const clientId = req.body.clientId;
    const cod = req.body.cod;
    const dataAcerto = req.body.dataAcerto;
    const acerto = req.body.acerto;
    const venda = req.body.venda;
    const novoCod = req.body.novoCod;
    const proximaEncontro = req.body.proximaEncontro;
    console.log(req.body);

    //see if a user with the given email exists
    Acerto.findOne({ _id: _id }, function (err, existingAcerto) {
        if (err) { return next(err); }

        //if a user with email does exist, update the record
        if (existingAcerto) {
            //create and save user record
            const AcertoAux = new Acerto({
                clientId: clientId,
                cod: cod,
                dataAcerto: dataAcerto,
                acerto: acerto,
                venda: venda,
                novoCod: novoCod,
                proximaEncontro: proximaEncontro,
                _id: _id
            });

            existingAcerto.update(AcertoAux, function (err, AcertoAux) {
                if (err) { return next(err); }
            });
        }
        return res.status(422).send({ error: 'No user record with this email' });
    });
};
