const Date = require('../models/date');

exports.deleteClientDate = function (req, res, next) {
    //User has already had their email and password auth'd
    //we just need to give them a token
    Date.findOne({ _id: id }, function (err, existingDate) {
        if (err) { return next(err); }

        //if a user with email does exist, delete it

        if (existingDate) {
            Date.remove({ _id: id },function (err) {
                if (err) { return next(err); }

                //respond to request indicating the Date was deleted
                res.json({ message: 'Date deleted!' });
            });
        }
        
        return res.status(422).send({
            error: 'No Date like this'
        });
    });
};

exports.addClientDate = function (req, res, next) {
    const nome =  req.body.nome;
    const email =  req.body.email;
    const telefone =  req.body.telefone;
    const observacao =  req.body.observacao;
    const endereco =  req.body.endereco;

    if (!email || !nome) {
        return res.status(422).send({ error: 'You must provide email and name' });
    }
    //see if a user with the given email exists
    Date.findOne({ email: email }, function (err, existingDate) {
        if (err) { return next(err); }

        //if a user with email does exist, return an error
        if (existingDate) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        //create and save user record
        const Date = new Date({
            nome: nome,
            email: email,
            telefone: telefone,
            obsevacao: observacao,
            endereco: endereco
        });

        Date.save(function (err) {
            if (err) { return next(err); }

            //respond to request indicating the user was created
            res.json({ id: Date._id });
        });
    });
};

exports.fetchData = function (req, res, next) {
    Date.find(function (err, data) {
        if (err) { return next(err); }

        if (data) {
            return res.send(data);
        }
    });
};

exports.updateDate = function (req, res, next) {
    const nome =  req.body.nome;
    const email =  req.body.email;
    const endereco =  req.body.endereco;
    const observacao =  req.body.observacao;
    const telefone =  req.body.telefone;    
    const cod =  req.body.cod;
    const venda =  req.body.venda;
    const debito =  req.body.debito;
    const novoCod =  req.body.novoCod;
    const dataAcerto =  req.body.dataAcerto;
    const valorAcerto =  req.body.valorAcerto;
    const pontos =  req.body.pontos;
    const proximoEncontro =  req.body.proximoEncontro;
    const observacaoDia =  req.body.observacaoDia;
    const semContato =  req.body.semContato;
    const inativa =  req.body.inativa;

    if (!email || !nome) {
        return res.status(422).send({ error: 'You must provide email and name' });
    }
    //see if a user with the given email exists
    Date.findOne({ email: email }, function (err, existingDate) {
        if (err) { return next(err); }

        //if a user with email does exist, update the record
        if (existingDate) {
            //create and save user record
            const Date = new Date({
                nome: nome,
                email: email,
                telefone: telefone,
                obsevacao: observacao,
                endereco: endereco,
                cod : cod,
                venda : valorVendido,
                debito : debito,
                novoCod : novoCod,
                dataAcerto : dataAcerto,
                acerto : acerto,
                pontos : pontos,
                proximoEncontro : proximoEncontro,
                observacaoDia : observacaoDia,
                semContato : semContato,
                inativa : inativa
            });

            existingClient.update(client, function (err, client) {
                if (err) { return next(err); }

                //respond to request sending the data updated!
                res.send(client);
            });
        }
        return res.status(422).send({ error: 'No user record with this email' });
    });
};
