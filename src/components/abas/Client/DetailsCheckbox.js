import React, { Component } from 'react';

class DetailsCheckbox extends Component {
    renderCheckboxInfo() {
        if (this.props.client.semContato && this.props.client.inativo) {
            return (
                <div>
                    <strong className="semContato">Sem contato</strong> 
                    <hr />       
                    <strong className="semContato">Inativo</strong> 
                    <hr />       
                </div>    
            );
        }
        if (this.props.client.inativo) {
            return (
                <div>
                    <strong className="semContato">Inativo</strong> 
                    <hr />       
                </div>    
            );
        }
        if (this.props.client.semContato) {
            return (
                <div>
                    <strong className="semContato">Sem contato</strong> 
                    <hr />       
                </div>    
            );
        }
    }
    
    render() {
        return (
            <div>
                {this.renderCheckboxInfo()}
            </div>
        );
    }
}

export default DetailsCheckbox;
