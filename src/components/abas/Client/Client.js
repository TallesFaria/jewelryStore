import React from 'react';
import { Link } from 'react-router';

const Client = ({ nome, endereco, observacoes, telefone1, referencia, _id }) => (
    <div style={{ opacity: 1 }}>
        <Link to={`/client/${_id}`}>
            <span className="client-list">
                <strong className="link">Nome: </strong><span className="content-text">{nome}</span> 
                <br />
                <strong className="link">Endereço: </strong><span className="content-text">{endereco}</span> 
                <br />
                <strong className="link">Referência: </strong><span className="content-text">{referencia}</span>
                <br />
                <strong className="link">Telefone: </strong><span className="content-text">{telefone1}</span>
                <br />
                <strong className="link">Observações: </strong><span className="content-text">{observacoes}</span>
                <br />
                <br />
                {/*<button className="remove-comment" onClick = {this.props.removeComment.bind(null, this.props.params.postId, i)}> &times; Apagar cliente </button>*/}
            </span>
            <hr className="hr" />
        </Link> 
    </div>
);

export default Client;
