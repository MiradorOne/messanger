import React, { Component } from 'react';
import '../../../styles/components/EnterMessage.css';
import * as firebase from 'firebase';

export default class EnterMessage extends Component {
    constructor() {
        super();

        this.state = {
            message: ''
        }
    }

    handleKeyPress(e) {
        if (e.charCode === 13) {
            this.sendMessage(e.target.value);
            e.target.value = '';
        }
    }

    sendMessage(messageValue) {
        if (this.props.currentConversation && this.props.currentConversation !== 'null') {
            firebase.database().ref(`/conversations/${this.props.currentConversation}`).child('messages').push({
                from: firebase.auth().currentUser.email,
                value: messageValue
            })
        }
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleClick() {
        if (this.props.currentConversation && this.props.currentConversation !== 'null') {
            firebase.database().ref(`/conversations/${this.props.currentConversation}`).child('messages').push({
                from: firebase.auth().currentUser.email,
                value: this.state.message
            })
        }
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