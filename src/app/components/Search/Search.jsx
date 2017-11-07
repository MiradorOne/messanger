import React, { Component } from 'react';

import '../../../styles/components/Search.css';

export default class Search extends Component {
    
    render() {
        return (
            <div className="Search bottom-border">
                <input type="text" placeholder="Search active conversations" className="input-default" onChange={this.props.handleChange}/>
            </div>
        )
    }
}