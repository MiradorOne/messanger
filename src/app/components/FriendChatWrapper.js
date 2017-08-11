import React, {Component} from 'react';
import FriendList from '../containers/FriendList';
import Chat from '../containers/Chat';
import ProfileBar from '../containers/ProfileBar';


export default class FriendChatWrapper extends Component {
    constructor() {
        super();
        this.state = {
            activeConversation: null,
        }
        
        this.selectConversation = this.selectConversation.bind(this);
    }

    selectConversation({convID}, userID) {
        this.setState({
            activeConversation: convID,
            ...userID 
        })
    }

    render() {
        return (
            <span className="FriendChatWrapper">
                <FriendList 
                        activeConversation={this.state.activeConversation} 
                        selectConversation={this.selectConversation}/>

                <Chat currentUser={this.props.currentUser} selectedUser={this.state.userID} activeConversation={this.state.activeConversation}/>
                <ProfileBar currentUser={this.state.currentUser} selectedUser={this.state.userID} activeConversation={this.state.activeConversation}/> 
            </span>
        )
    }
}