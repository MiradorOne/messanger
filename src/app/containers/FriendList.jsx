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
            searchTerm: ''
        }
    }

    componentWillReceiveProps() {
        this.getConversation();
    }

    handleChange(e) {
        this.setState({
            searchTerm: e.target.value
        })
    }

    getConversation() {
        let self = this;
        firebase.database().ref(`/users/${this.props.currentUser.uid}/conversation`).once('value').then(function(snapshot) {

            const object = snapshot.val();

            if (object && object !== "null") {
                self.setState({
                    conversations: Object.keys(object).map((key) => {return object[key]})
                })
            }

        });
    }

    render() {
        const searchResult = this.state.conversations.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

        const noConversationsMessage = () => {
            return (
                <li className="dnth_conv">
                    You don't have conversation yet! Search friend to start conversation
                </li>
            )
        }

        const conversations = this.state.conversations.map((value) => {
            return (
                <Friend data={value}/>
            )
        })
        return (
            <div className="container Friend-List">
                <Search handleChange={this.handleChange.bind(this)}/>
                <ul>
                    {
                        this.state.conversations.length === 0 ? noConversationsMessage() :
                        searchResult.map((value, i) => {
                            return (
                                <li key={i}>
                                    <Friend email={value.email}/>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        )
    }
}
