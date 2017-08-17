import React, { Component } from 'react';
import formatDate from '../../helpers/formatDate';

class SearchBarAgenda extends Component {
    constructor(props) {
        super(props);
        this.state = { term: '' };
    }

    onInputChange(input) {
        let term = input;
        term = formatDate(term);
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }

    render() {
        return (
            <div>
                <input 
                    className="input-agenda" 
                    placeholder={this.props.text}
                    value={this.state.term}
                    onChange={event => this.onInputChange(event.target.value)} 
                />
            </div> 
        );  
    }
}

export default SearchBarAgenda;
