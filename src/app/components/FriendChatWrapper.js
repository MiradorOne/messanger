import React, {Component} from 'react';
import FriendList from '../containers/FriendList';
import Chat from '../containers/Chat';

export default class FriendChatWrapper extends Component {
    constructor() {
        super();
        this.state = {
            activeConversation: null,
        }
        
        this.selectConversation = this.selectConversation.bind(this);
    }

    selectConversation({convID}) {
        this.setState({
            activeConversation: convID
        })
    }

    render() {
        return (
            <span className="FriendChatWrapper">
                <FriendList 
                        activeConversation={this.state.activeConversation} 
                        selectConversation={this.selectConversation}/>

                <Chat activeConversation={this.state.activeConversation}/>
            </span>
        )
    }
}