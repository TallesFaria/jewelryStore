import React, { Component } from 'react';
import Header from './header';

export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="">
                    <div >
                        <div className="home">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div>
                            <a className="nav-down" href="#/">
                                <span className="glyphicon glyphicon-briefcase" />
                                Criado por Talles O. Faria
                  </a>
                        </div>
                    </div>
                </nav>
            </div >
        );
    }
}
