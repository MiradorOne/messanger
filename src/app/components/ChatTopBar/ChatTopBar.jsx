import React, { Component } from 'react';
import '../../../styles/components/ChatTopBar.css';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

class ChatTopBar extends Component {
    constructor(){
        super()

        this.state = {
            friend: {},
            friendIsTyping: false,
        }
        this.watchUserTypingStatus = this.watchUserTypingStatus.bind(this);   
       
    }

    componentDidUpdate() {
        this.watchUserTypingStatus();                  
    }

    watchUserTypingStatus() {
        if (this.props.activeConversation) {
            
            const self = this;
            const uid = this.props.auth.uid;
            let friendUserIndex = '';
            let friendUserId = '';
            let friendIsTyping = false;            

            self.props.firebase.ref(`/conversations/${this.props.activeConversation}/users`).once('value',function(snapshot) { //Get current user index from conversation
             
                const convUsers = snapshot.val();

                Object.keys(convUsers).map(value => {
                    if (convUsers[value].id !== uid) {
                        friendUserIndex = value;
                        friendUserId = convUsers[value].id;
                    }
                })
             
                //Get friend name
                self.props.firebase.ref(`/users/${friendUserId}/`).once('value').then((snapshot) => {
                    self.setState({
                        friend: snapshot.val()
                    })
                })
            });
        

            firebase.database().ref(`/conversations/${this.props.activeConversation}/users/${friendUserIndex}/`).on('value', function(snapshot) {
                friendIsTyping = snapshot.val().isTyping;

                if (self.state.friendIsTyping !== friendIsTyping) {
                    self.setState({
                        friendIsTyping: friendIsTyping 
                    })
                }   
            })
        }
    }

    render() {
    
        return (
            <div className="Chat-TopBar">
                <div className="status">
                    <p>{this.state.friendIsTyping ? (`${this.state.friend.firstName} ${this.state.friend.lastName} is typing`) : ''}</p>
                </div>
                {/* <div className="user-actions">
                    <div className="favourite">
                        <i className="icon icon-favourite"/>
                    </div>
                    <div className="call">
                        <i className="icon icon-call"/>
                    </div>
                    <div className="videocall">
                        <i className="icon icon-videocall"/>
                    </div>
                </div> */}
            </div>
        )
    }
}

const wrapper = firebaseConnect()(ChatTopBar);

export default connect(
    ({ firebase }) => ({
        auth: pathToJS(firebase, 'auth'),
    })
)(wrapper);