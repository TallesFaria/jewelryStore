import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { term: '' };
    }

    onInputChange(term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }

    render() {
        return (
            <input 
                className="input-agenda" 
                placeholder='Pesquisar'
                value={this.state.term}
                onChange={event => this.onInputChange(event.target.value)} 
            />
        );  
    }
}

export default SearchBar;
