import React from 'react';
import { Link } from 'react-router';

const Debtors = ({ nome, endereco, debito, valorVendido, dataAcerto, _id, proximoEncontro }) => (
    <div style={{ opacity: 1 }}>
        <Link to={`/client/${_id}`}>
            <div className="client-list">
                <strong className="link debito">Débito: </strong><span className="content-text debito">{debito}</span> 
                <br />
                <strong className="link">Nome: </strong><span className="content-text">{nome}</span> 
                <br />
                <strong className="link">Endereço: </strong><span className="content-text">{endereco}</span> 
                <br />
                <strong className="link">Valor vendido total: </strong><span className="content-text">{valorVendido}</span>
                <br />
                <strong className="link">Data do último acerto: </strong><span className="content-text">{dataAcerto}</span>
                <br />
                <strong className="link">Data do próximo acerto: </strong><span className="content-text">{proximoEncontro}</span>
                <br />
                <br />
                {/*<button className="remove-comment" onClick = {this.props.removeComment.bind(null, this.props.params.postId, i)}> &times; Apagar cliente </button>*/}
            </div>
            <hr className="hr" />
        </Link> 
    </div>
);

export default Debtors;
