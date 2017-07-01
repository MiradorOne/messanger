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
        firebase.database().ref(`/users/${uid}/conversations`).on('value', function(snapshot) {
                
            const result = snapshot.val() || null;

            if (snapshot.val()) {
                Object.keys(snapshot.val()).map((value,i,result) => {

                firebase.database().ref('/conversations/' + value + '/users/').once('value').then(function(snapshot) {
                    let conversationDetails = null;
                    if (snapshot.val()) {
                        conversationDetails = snapshot.val().filter((user) => {
                            if (user.email !== firebase.auth().currentUser.email) {
                                return user;
                            }
                        });

                        result = {
                            [value]: conversationDetails[0],
                        }   
                    }
                    
                }).then(() => {
                    if (result && result !== "null") {
                        self.setState({
                            conversations: {
                                ...self.state.conversations,
                                ...result
                            }
                        })
                    }
                })
            })
            }
        })
    }

    render() {       
        const searchResult = Object.keys(this.state.conversations)
                            .map(value => {return {
                                ...this.state.conversations[value],
                                convID: value
                            }})
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
                <ul style={{ height: '100%', overflowY: 'scroll', paddingBottom: '200px' }}>
                    {
                        Object.keys(this.state.conversations).length === 0 ? noConversationsMessage() :
                        searchResult.map((value, i) => {
                            return (
                                <li key={i} 
                                className={this.state.conversations[this.props.activeConversation] && 
                                    this.state.conversations[this.props.activeConversation].email === value.email ? 'selected' : ''} 

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
