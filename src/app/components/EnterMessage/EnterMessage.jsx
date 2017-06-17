import React, { Component } from 'react';
import '../../../styles/components/EnterMessage.css';

export default class EnterMessage extends Component {
    constructor() {
        super();

        this.state = {
            message: ''
        }
    }

    handleKeyPress(e) {
        if (e.charCode === 13) {
            console.log('Enter pressed!');
        }
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleClick(e) {

    }

    render() {
        return (
            <div className="Enter-Message">
                <div className="attach">
                    <i className="icon icon-attach"/>
                </div>
                <div className="enter-field">
                    <input type="text" placeholder="Type your message" className="input-default" 
                    onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
                </div>
                <div className="emoji">
                    <i className="icon icon-emoji"/>
                </div>
                <button className="send input-default icon icon-send" onClick={this.handleClick.bind(this)}/>
            </div>
        )
    }
}