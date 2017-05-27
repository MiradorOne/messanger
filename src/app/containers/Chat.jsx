import React, { Component } from 'react';
import ChatTopBar from '../components/ChatTopBar/ChatTopBar';
import ChatMessages from '../components/ChatMessages/ChatMessages';
import EnterMessage from '../components/EnterMessage/EnterMessage';
import Message from '../components/_common/Message';

import '../../styles/containers/Chat.css';

export default class Chat extends Component {

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