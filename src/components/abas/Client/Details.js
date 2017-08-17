import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const Details = ({ client, _id }) => (
    <div>
        <strong className="details">Nome completo: </strong> 
        <span className="details-text"> {client.nome} </span>
        <hr />
        <strong className="details">Email: </strong> 
        <span className="details-text"> {client.email} </span>
        <hr />       
        <strong className="details">Endereço: </strong> 
        <span className="details-text"> {client.endereco} </span>
        <hr />       
        <strong className="details">Referência: </strong> 
        <span className="details-text">{client.referencia} </span>
        <hr />       
        <strong className="details">Telefone1: </strong> 
        <span className="details-text">{client.telefone1} </span>
        <hr />       
        <strong className="details">Telefone2: </strong> 
        <span className="details-text">{client.telefone2} </span>
        <hr />       
        <strong className="details">Observações: </strong> 
        <span className="details-text">{client.observacoes} </span>
        <hr />       
        <hr />       
        <hr />       
        <strong className="details">Cod/Mostruário: </strong> 
        <span className="details-text">{client.cod} </span>
        <hr />       
        <strong className="details">Valor vendido: </strong> 
        <span className="details-text">{client.valorVendido} </span>
        <hr />       
        <strong className="details">Débito: </strong> 
        <span className="details-text">{client.debito} </span>
        <hr />       
        <strong className="details">Cod/Novo mostruário: </strong> 
        <span className="details-text">{client.novoCod} </span>
        <hr />       
        <strong className="details">Data do último acerto: </strong> 
        <span className="details-text">{moment(client.dataAcerto).format('L')} </span>
        <hr />       
        <strong className="details">Valor acertado: </strong> 
        <span className="details-text">{client.valorAcertado} </span>
        <hr />       
        <strong className="details">Pontos: </strong> 
        <span className="details-text">{client.pontos} </span>
        <hr />       
        <strong className="details">Data do próximo encontro: </strong> 
        <span className="details-text">{moment(client.dataProximoEncontro).format('L')} </span>
        <hr />       
        <strong className="details">Observação do dia: </strong> 
        <span className="details-text">{client.observacaoDia} </span>
        <hr />       
        <strong className="details">Data Início</strong> 
        <span className="details-text">{moment(client.dataInicio).format('L')} </span>
        <hr />       
        <strong className="details">Indicação</strong> 
        <span className="details-text">{client.indicacao} </span>
        <hr />       
        <Link className="link" to={`/clientEdit/${client._id}`}>
            <button className="input-agenda button-agenda">Editar</button>
        </Link>        
    </div>
);

export default Details;
