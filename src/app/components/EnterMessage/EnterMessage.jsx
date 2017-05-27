import React, { Component } from 'react';
import '../../../styles/components/EnterMessage.css';

export default class EnterMessage extends Component {

    render() {
        return (
            <div className="Enter-Message">
                <div className="attach">
                    <i className="icon icon-attach"/>
                </div>
                <div className="enter-field">
                    <input type="text" placeholder="Type your message" className="input-default"/>
                </div>
                <div className="emoji">
                    <i className="icon icon-emoji"/>
                </div>
                <button className="send input-default icon icon-send"/>
            </div>
        )
    }
}