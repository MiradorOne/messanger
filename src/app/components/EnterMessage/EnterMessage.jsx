import React, { Component } from 'react';
import '../../../styles/components/EnterMessage.css';
import * as firebase from 'firebase';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { connect } from 'react-redux';

class EnterMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
        }
    }

    handleKeyPress(e) {
        if (e.charCode === 13) {
            this.sendMessage(e.target.value);
            e.target.value = '';
        }
    }

    sendMessage(messageValue) {
        if (this.props.currentConversation && this.props.currentConversation !== 'null' && this.state.message.length > 0) {
            this.props.firebase.push(`/conversations/${this.props.currentConversation}/messages`, {
                from: firebase.auth().currentUser.email,
                value: messageValue,
                timestamp: + new Date(),
            });
            this.setState({
                message: ''
            })
        }
    }

    handleChange(e) {
        const uid = this.props.auth.uid;
        let currentUserIndex = '';

         this.props.firebase.ref(`/conversations/${this.props.currentConversation}/users`).once('value',function(snapshot,) { //Get current user index from conversation
             
            const convUsers = snapshot.val();

            Object.keys(convUsers).map(value => {
                if (convUsers[value].id === uid) {
                    currentUserIndex = value;
                }
            })
             
        });
        
        this.props.firebase.update(`/conversations/${this.props.currentConversation}/users/${currentUserIndex}/`,{isTyping: true}) //Set directly in this active conversation user typing status
        
        this.setState({
            message: e.target.value,
        })

        const self = this;

        setTimeout(function() {
            self.props.firebase.update(`/conversations/${self.props.currentConversation}/users/${currentUserIndex}/`,{isTyping: false}) 
        },3500)

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

const wrapper = firebaseConnect()(EnterMessage);

export default connect(
    ({ firebase }) => ({
        auth: pathToJS(firebase, 'auth'),
    })
)(wrapper);