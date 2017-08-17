const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AcertoSchema = new Schema({
    clientId: String,
    cod: String,  
    dataAcerto: Date,
    acerto: Number,
    venda: Number, 
    novoCod: String,  
    proximoEncontro: Date
});

const ModelClassAcerto = mongoose.model('acerto', AcertoSchema);

module.exports = ModelClassAcerto;
