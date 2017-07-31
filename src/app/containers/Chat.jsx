import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChatTopBar from '../components/ChatTopBar/ChatTopBar';
import EnterMessage from '../components/EnterMessage/EnterMessage';
import Message from '../components/_common/Message';
import * as firebase from 'firebase';
import { firebaseConnect, pathToJS, dataToJS } from 'react-redux-firebase';
import { connect } from 'react-redux';
import _ from 'lodash';

import '../../styles/containers/Chat.css';

export default class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
        }
    }

    componentDidUpdate() {
        const node = ReactDOM.findDOMNode(this.refs['scroll']);
        const messageNode = _.last(node.childNodes);
        messageNode.scrollIntoView(false);
    }

    getMessages(convID) {
        let self = this;

        if (convID && convID !== 'null') {
            const ref = firebase.database().ref(`/conversations/${convID}/messages`);
            ref.on('value',function(snapshot) {
                console.log(snapshot.val())
                const object = snapshot.val();

                if (object && object !== "null") {
                    self.setState({
                        messages: object 
                    })
                } else {
                    self.setState({
                        messages: [] 
                    })
                }

            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeConversation !== this.props.activeConversation) {
            this.getMessages(nextProps.activeConversation);
        }
    }

    render() {
        const messages = Object.keys(this.state.messages).map((value,i) => {
            return (
                <Message key={i} data={this.state.messages[value]}/>
            )
        });

        return (
            <div className="container Chat">
                <ChatTopBar activeConversation={this.props.activeConversation}/>
                <div className="messages" ref='scroll'>
                    {messages.length > 0 ? messages : (<div style={{
                        position: 'absolute',
                        fontSize:'16px', 
                        textTransform:'uppercase',
                        top: '50%',
                        left: '50%',
                        transform: 'translateY(-50%) translateX(-50%)'
                    }}>Send your first message!</div>)}
                </div>
                <EnterMessage currentConversation={this.props.activeConversation}/>
            </div>
        )
    }
}
