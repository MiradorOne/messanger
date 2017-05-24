import React, { Component } from 'react';


import Navigation from '../components/Navigation/Navigation';
import '../../styles/containers/Inbox.css';

export default class Inbox extends Component {


    render() {
        return (
            <div className="container Inbox">
                <h2>Inbox</h2>
                <Navigation/>
            </div>
        )
    }
}