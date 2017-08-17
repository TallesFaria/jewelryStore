const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    nome: String,
    email: { type: String, unique: true, lowercase: true },
    endereco: String,
    referencia: String,
    telefone1: String,
    telefone2: String,
    observacoes: String,
    cod: String,
    valorVendido: Number,
    debito: Number,
    novoCod: String,    
    dataAcerto: Date,
    valorAcertado: Number,
    observacao: String,
    pontos: Number, 
    dataProximoEncontro: Date,
    observacaoDia: String,
    semContato: Boolean,
    inativo: Boolean,
    dataInicio: Date,
    indicacao: String
});

const ModelClass = mongoose.model('client', clientSchema);

module.exports = ModelClass;

