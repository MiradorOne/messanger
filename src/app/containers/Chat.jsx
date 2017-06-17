import React, { Component } from 'react';
import ChatTopBar from '../components/ChatTopBar/ChatTopBar';
import ChatMessages from '../components/ChatMessages/ChatMessages';
import EnterMessage from '../components/EnterMessage/EnterMessage';
import Message from '../components/_common/Message';
import * as firebase from 'firebase';

import '../../styles/containers/Chat.css';

export default class Chat extends Component {
    constructor() {
        super();

        this.state = {
            conversations: [],
        }
    }

    getConversation() {
        let self = this;
        firebase.database().ref(`/users/${this.props.currentUser.uid}/conversations`).once('value').then(function(snapshot) {

            const object = snapshot.val();

            if (object && object !== "null") {
                self.setState({
                    conversations: Object.keys(object).map((key) => {return object[key]})
                })
            }

        });
    }

    render() {
        return (
            <div className="container Chat">
                <ChatTopBar />
                <ChatMessages />
                <div className="messages">
                    <Message/>
                </div>
                <EnterMessage />
            </div>
        )
    }
}