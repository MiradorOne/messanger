import React, { Component } from 'react';
import * as firebase from 'firebase';
import SearchInput, {createFilter} from 'react-search-input';

import '../../styles/containers/FriendList.css';
import Search from '../components/Search/Search';
import Friend from '../components/Friend/Friend';

const KEYS_TO_FILTERS = ['firstName', 'lastName', 'email'];

export default class FriendList extends Component {
    constructor() {
        super()

        this.state = {
            conversations: [],
            searchTerm: '',
        }
    }

    componentWillReceiveProps({currentUser}) {
        this.getConversation(currentUser.uid);
    }


    handleChange(e) {
        this.setState({
            searchTerm: e.target.value
        })
    }

    getConversation(uid) {
        let self = this;
        firebase.database().ref(`/users/${uid}/conversations`).once('value').then(function(snapshot) {
                
            const result = snapshot.val();

            snapshot.val().map((value,result) => {

                firebase.database().ref(`/conversations/${value}/users/1`).once('value').then(function(snapshot) {

                    const conversationDetails = snapshot.val();    

                    result = {
                        ...result,
                        [value]: conversationDetails
                    }
                    
                }).then(() => {
                    if (result && result !== "null") {
                        self.setState({
                            conversations: result
                        })
                    }
                })

            })
        })
    }

    render() {       
        const searchResult = Object.keys(this.state.conversations)
                            .map(value => {return this.state.conversations[value]})
                            .filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
                            
        const noConversationsMessage = () => {
            return (
                <li className="no-conversation">
                    You don't have conversations yet! Search friend to start conversation
                </li>
            )
        }

        const conversations = Object.keys(this.state.conversations).map((value) => {
            return (
                <Friend data={this.state.conversations[value]}/>
            )
        })
        return (
            <div className="container Friend-List">
                <Search handleChange={this.handleChange.bind(this)}/>
                <ul>
                    {
                        Object.keys(this.state.conversations).length === 0 ? noConversationsMessage() :
                        searchResult.map((value, i) => {
                            return (
                                <li key={i} className={this.state.conversations[this.props.activeConversation] ? 'selected' : ''} 
                                onClick={this.props.selectConversation.bind(this,Object.keys(this.state.conversations)[i])}>
                                    <Friend firstName={value.firstName} 
                                    lastName={value.lastName}
                                    convID={value.id} 
                                    />
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        )
    }
}
