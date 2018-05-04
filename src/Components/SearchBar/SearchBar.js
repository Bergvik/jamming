import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.search = this.search.bind(this);
    }

    handleTermChange(event) {
        this.setState({
            search: event.target.value
        });
    }

    search(term) {
        this.props.onSearch(this.state.search);
    }

    render() {
        return (
            <div className="SearchBar">
                <input onChange={this.handleTermChange} placeholder="Enter a Song, Album or Artist" />
                <a onClick={this.search}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;
