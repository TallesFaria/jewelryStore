import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const Acerto = ({ acerto, cod, dataAcerto, novoCod, proximoEncontro, venda, _id }) => (
    <div className="acerto">
        <Link to={`/acerto/${_id}`}>
            <br />
            <strong className="details">Cod/Mostruário: </strong> <span className="details-text"> {cod} </span>
            <hr />       
            <strong className="details">Data Acerto: </strong> <span className="details-text"> {moment(dataAcerto).format('L')} </span>
            <hr />       
            <strong className="details">Acerto: </strong> <span className="details-text"> {acerto} </span>
            <hr />       
            <strong className="details">Venda: </strong> <span className="details-text"> {venda} </span>
            <hr />       
            <strong className="details">Cod/Novo mostruário: </strong> <span className="details-text"> {novoCod} </span>
            <hr />       
            <strong className="details">Data do próximo acerto: </strong> <span className="details-text"> {moment(proximoEncontro).format('L')} </span>
            <hr />
            <br />       
        </Link>
    </div>
);

export default Acerto;
