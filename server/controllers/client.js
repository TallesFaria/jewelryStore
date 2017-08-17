const Client = require('../models/client');

exports.deleteClient = function (req, res, next) {
    //User has already had their email and password auth'd
    //we just need to give them a token
    Client.findOne({ _id: id }, function (err, existingClient) {
        if (err) { return next(err); }

        //if a user with email does exist, delete it

        if (existingClient) {
            Client.remove({ _id: id }, function (err) {
                if (err) { return next(err); }

                //respond to request indicating the client was deleted
                res.json({ message: 'client deleted!' });
            });
        }
        
        return res.status(422).send({
            error: 'No client like this'
        });
    });
};

exports.addClient = function (req, res, next) {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone1 = req.body.telefone1;
    const telefone2 = req.body.telefone2;
    const observacoes = req.body.observacoes;
    const endereco = req.body.endereco;
    const indicacao = req.body.indicacao;
    const dataInicio = req.body.dataInicio;
    const referencia = req.body.referencia;

    if (!email || !nome) {
        return res.status(422).send({ error: 'You must provide email and name' });
    }
    //see if a user with the given email exists
    Client.findOne({ email: email }, function (err, existingClient) {
        if (err) { return next(err); }

        //if a user with email does exist, return an error
        if (existingClient) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        //create and save user record
        const client = new Client({
            nome: nome,
            email: email,
            telefone1: telefone1,
            telefone2: telefone2,
            observacoes: observacoes,
            endereco: endereco,
            indicacao: indicacao,
            dataInicio: dataInicio,
            referencia: referencia
        });

        client.save(function (err) {
            if (err) { return next(err); }

            //respond to request indicating the user was created
            res.json({ id: client._id });
        });
    });
};

exports.fetchData = function (req, res, next) {
    Client.find(function (err, data) {
        if (err) { return next(err); }

        if (data) {
            return res.send(data);
        }
    });
};

exports.fetchDevedores = function (req, res, next) {
    Client.find(
        {
            debito: { $gt: 0 }
        }, function (err, data) {
        if (err) { return next(err); }
        if (data) {
            return res.send(data);
        }
    });
};

exports.fetchClientsByDate = function (req, res, next) {
    const date = req.body.date;
    console.log('Fetching clients by date: ', req.body);
    Client.find({ dataProximoEncontro: new Date(date) }, function (err, data) {
        if (err) { return next(err); }

        if (data) {
            console.log(data);
            return res.send(data);
        }
    });
};

exports.updateClient = function (req, res, next) {
    console.log(req.body);
    const _id =  req.body._id;
    const nome =  req.body.nome;
    const email =  req.body.email;
    const endereco =  req.body.endereco;
    const referencia =  req.body.referencia;
    const telefone1 =  req.body.telefone1;    
    const telefone2 =  req.body.telefone2;    
    const observacoes =  req.body.observacoes;
    const cod =  req.body.cod;
    const valorVendido =  req.body.valorVendido;
    const debito =  req.body.debito;
    const novoCod =  req.body.novoCod;
    const dataProximoAcerto = req.body.dataProximoAcerto;    
    const valorAcertado = req.body.valorAcertado;    
    const pontos =  req.body.pontos;
    const dataProximoEncontro =  req.body.dataProximoEncontro;
    const observacaoDia =  req.body.observacaoDia;
    const semContato =  req.body.semContato;
    const inativo =  req.body.inativo;
    const dataInicio =  req.body.dataInicio;
    const indicacao =  req.body.indicacao;

    if (!email || !nome) {
        return res.status(422).send({ error: 'You must provide email and name' });
    }
    //see if a user with the given email exists
    Client.findOne({ _id: _id }, function (err, existingClient) {
        if (err) { return next(err); }

        //if a user with email does exist, update the record
        if (existingClient) {
            //create and save user record
            const client = new Client({
                nome: nome,
                email: email,
                endereco: endereco,
                referencia: referencia,
                telefone1: telefone1,
                telefone2: telefone2,
                observacoes: observacoes,
                cod : cod,
                valorVendido: valorVendido,
                debito : debito,
                novoCod : novoCod,
                dataProximoAcerto: dataProximoAcerto,
                valorAcertado: valorAcertado,
                pontos : pontos,
                dataProximoEncontro: dataProximoEncontro,
                observacaoDia : observacaoDia,
                semContato : semContato,
                inativo : inativo, 
                dataInicio : dataInicio,
                indicacao: indicacao,
                _id: _id
            });

            console.log('CLIENT: ', client);

            existingClient.update(client, function (err, client) {
                if (err) { return next(err); }
                console.log('Found + updating CLIENT: ');
                //respond to request sending the data updated!
            });
        }
        return res.status(422).send({ error: 'No user record with this email' });
    });
};

exports.updateAcertoClient = function (req, res, next) {
    console.log('UPDATE ACERTO CLIENTE ', req.body);
    const cod = req.body.cod;
    const valorVendido = req.body.venda;
    const novoCod = req.body.novoCod;
    const valorAcertado = req.body.acerto;    
    const dataProximoEncontro = req.body.proximoEncontro;
    const clientId = req.body.clientId;
    const dataAcerto = req.body.dataAcerto;
    const debito = valorVendido - valorAcertado;
    //see if a user with the given email exists
    Client.update(
        { _id: clientId }, 
        { 
            $set:
            {
                cod: cod,
                valorAcertado: valorAcertado,
                dataProximoEncontro: dataProximoEncontro,
                novoCod: novoCod,
                dataAcerto: dataAcerto
            },
            $inc: {
                valorVendido: valorVendido,
                debito: debito
            }
        }, 
        function (err, existingClient) {
            if (err) { return next(err); }
            console.log('ATUALIZANDO ACERTO DO CLIENTE');
            //if a user with email does exist, update the record
            if (!existingClient) {
                return res.status(422).send({ error: 'No user record with this email' });    
            }
            
        }
    );
};
