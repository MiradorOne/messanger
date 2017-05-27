import React, { Component } from 'react';
import '../../../styles/components/ChatTopBar.css';

export default class ChatTopBar extends Component {

    render() {
        return (
            <div className="Chat-TopBar">
                <div className="status">
                    <p>Kirsten Mckellar is typing...</p>
                </div>
                <div className="actions">
                    <div className="favourite">
                        <i className="icon icon-favourite"/>
                    </div>
                    <div className="call">
                        <i className="icon icon-call"/>
                    </div>
                    <div className="videocall">
                        <i className="icon icon-videocall"/>
                    </div>
                </div>
            </div>
        )
    }
}