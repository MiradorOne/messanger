import React, { Component } from 'react';
import '../../../styles/components/EnterMessage.css';
import * as firebase from 'firebase';
import { firebaseConnect, pathToJS, dataToJS } from 'react-redux-firebase';
import { connect } from 'react-redux';
import _ from 'lodash';

class EnterMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            typingTimer: 0,
            doneTypingInterval: 5000,
            currentUserConvIndex: 0,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentConversation && nextProps.currenConversation !== this.props.currentConversation) { // Change status of previous conv when user change active conversation
            this.props.firebase.update(`/conversations/${this.props.currentConversation}/users/${this.state.currentUserConvIndex}/`,{isTyping: false})

            if (this.state.message.length > 0) {

                localStorage.setItem(`${this.props.currentConversation}`,JSON.stringify({message: this.state.message}))

                this.setState({
                    message: '',
                })

            } else {
                localStorage.removeItem(`${this.props.currentConversation}`)
            }
        }
        const localStorageObj = JSON.parse(localStorage.getItem(`${nextProps.currentConversation}`)) || '';
        this.setState({
            message: localStorageObj.message || ''
        })
    }

    handleKeyPress(e) {
        if (e.charCode === 13) {
            this.sendMessage(e.target.value);
            e.target.value = '';
        }
    }

    makeMessagesAsRead (conv_id) {
        const self = this;
        firebase.database().ref(`/conversations/${conv_id}`).once('value', (snapshot) => {
        }).then((snapshot) => {
            const data = snapshot.val();

            _.forOwn(data.messages, function(message, key) {
                if (message.from !== self.props.auth.email && message.type === 'unread') {
                    firebase.database().ref(`/conversations/${conv_id}/messages/${key}/`).update({ type: ''});
                } 
            })   
        })
    }

    sendMessage(messageValue) {
        if (this.props.currentConversation && this.props.currentConversation !== 'null' && this.state.message.length > 0) {
            this.props.firebase.push(`/conversations/${this.props.currentConversation}/messages`, {
                from: firebase.auth().currentUser.email,
                value: messageValue,
                timestamp: + new Date(),
                type: 'unread'
            });
            this.setState({
                message: ''
            })
            this.makeMessagesAsRead(this.props.currentConversation);
        }
    }

    keyUpHandler() {
        const uid = this.props.auth.uid;
        let currentUserIndex = '';
        clearTimeout(this.state.typingTimer);

        this.props.firebase.ref(`/conversations/${this.props.currentConversation}/users`).once('value',function(snapshot,) { //Get current user index from conversation

            const convUsers = snapshot.val();

            Object.keys(convUsers).map(value => {
                if (convUsers[value].id === uid) {
                    currentUserIndex = value;
                }
            })

        });

        this.setState({
            currentUserConvIndex: currentUserIndex,
        })

        this.props.firebase.update(`/conversations/${this.props.currentConversation}/users/${currentUserIndex}/`,{isTyping: true}) //Set directly in this active conversation user typing status

        const self = this;

        self.state.typingTimer = setTimeout(function () {
            self.props.firebase.update(`/conversations/${self.props.currentConversation}/users/${currentUserIndex}/`,{isTyping: false})

        }, self.state.doneTypingInterval)
    }

    keyDownHandler() {
        clearTimeout(this.state.typingTimer);
    }

    handleChange(e) {
        this.setState({
            message: e.target.value,
        })
    }

    handleClick() {
        if (this.props.currentConversation && this.props.currentConversation !== 'null') {
            this.props.firebase.push(`/conversations/${this.props.currentConversation}/messages`, {
                from: firebase.auth().currentUser.email,
                value: this.state.message,
                timestamp: + new Date(),
            });
        }
    }

    render() {
        return (
            <div className="Enter-Message" style={{position: 'relative', top: '-15px'}}>
                <div className="attach">
                    <i className="icon icon-attach"/>
                </div>
                <div className="enter-field">
                    <input type="text" placeholder="Type your message" className="input-default" value={this.state.message}
                    onChange={this.handleChange.bind(this)} onKeyUp={this.keyUpHandler.bind(this)} onKeyDown={this.keyDownHandler.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
                </div>
                <div className="emoji">
                    <i className="icon icon-emoji"/>
                </div>
                <button className="send input-default icon icon-send" onClick={this.handleClick.bind(this)}/>
            </div>
        )
    }
}

const wrapper = firebaseConnect()(EnterMessage);

export default connect(
    ({ firebase }) => ({
        auth: pathToJS(firebase, 'auth'),
    })
)(wrapper);