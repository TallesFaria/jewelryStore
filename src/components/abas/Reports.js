import React, { Component } from 'react';
import { connect } from 'react-redux';

class Reports extends Component {
    render() {
        const { reportsData: { venda, acertos, debito, dataInicio, dataFinal } } = this.props;

        return (
            <div className="reports">
                <div className="reports-header">
                    <strong className="reports-text">Data Início: </strong>
                    <span className="reports-content-text">{dataInicio}</span> 
                    <hr />
                    <strong className="reports-text">Data Final: </strong>
                    <span className="reports-content-text">{dataFinal}</span> 
                    <hr />
                </div>
                <div className="reports-body">
                    <strong className="reports-body-text">Venda total no período: </strong>
                    <span className="reports-content-text">R${' '}{venda}</span> 
                    <hr />
                    <strong className="reports-body-text">Acerto total no período: </strong>
                    <span className="reports-content-text">R${' '} {acertos}</span> 
                    <hr />
                    <strong className="reports-body-text">Débito total no período: </strong>
                    <span className="reports-content-text">R${' '} {debito}</span>
                    <hr />
                </div>
                <br />
                <br />
                <hr className="hr" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reportsData: state.reports
    };
};

export default connect(mapStateToProps)(Reports);
