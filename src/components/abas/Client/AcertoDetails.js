import React from 'react';
import { Link } from 'react-router';

const Acerto = ({ acerto }) => (
    <div className="agenda">
        <strong className="details">Cod/Mostruário: </strong> <span className="details-text"> {acerto.cod} </span>
        <hr />       
        <strong className="details">Data Acerto: </strong> <span className="details-text"> {acerto.dataAcerto} </span>
        <hr />       
        <strong className="details">Acerto: </strong> <span className="details-text"> {acerto.acerto} </span>
        <hr />       
        <strong className="details">Venda: </strong> <span className="details-text"> {acerto.venda} </span>
        <hr />       
        <strong className="details">Cod/Novo mostruário: </strong> <span className="details-text"> {acerto.novoCod} </span>
        <hr />       
        <strong className="details">Data do próximo acerto: </strong> <span className="details-text"> {acerto.proximoEncontro} </span>
        <hr />       
        <Link to={`/acertoEdit/${acerto._id}`}>
            <button className="input-agenda button-agenda">Editar</button>
        </Link>        
        <button className="input-agenda button-agenda">Voltar</button>
    </div>
);

export default Acerto;
