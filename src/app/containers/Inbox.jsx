import React, { Component } from 'react';
import * as firebase from 'firebase';

import SearchPopup from '../components/_common/SearchPopup';
import Navigation from '../components/Navigation/Navigation';
import '../../styles/containers/Inbox.css';

export default class Inbox extends Component {
    constructor() {
        super();

        this.state = {
            showSearchPopup: false
        }
    }

    showSearchPopup() {
        this.setState({
            showSearchPopup: !this.state.showSearchPopup
        })
    }

    render() {
        return (
            <div className="container Inbox">
                <h2>Inbox<i className="icon-add-user" style={{ cursor: 'pointer' }} onClick={this.showSearchPopup.bind(this)}></i></h2>
                { this.state.showSearchPopup ? <SearchPopup/> : ''}
                <Navigation/>
            </div>
        )
    }
}
