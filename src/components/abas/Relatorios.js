import React, { Component } from 'react';
import Home from '../home';
import FormReports from './FormReports';
import Reports from './Reports';

class Relatorios extends Component {   
    render() {
        return (
            <div>
                <Home />
                <div className="agenda">
                    <FormReports />
                     <Reports /> 
                </div>
            </div>
        );
    }
}

export default Relatorios;
