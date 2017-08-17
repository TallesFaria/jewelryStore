import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
    render() {
        return (
            <div className="fundoHome"> 
                <nav className="nav nav-bar">
                    <div className="navigation-bar">
                        <Link className="options" to="/agenda" > Agenda </Link>
                        <Link className="options" to="/clientes" > Clientes </Link>
                        <Link className="options" to="/cadastro" > Cadastro </Link>
                        <Link className="options" to="/devedores" > Devedores </Link>
                        <Link className="options" to="/relatorios" > Relatórios </Link>
                    </div>
                </nav>
            </div>
        );
    }
}


export default Home;
