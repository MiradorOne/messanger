import React, { Component } from 'react';
// import * as firebase from 'firebase';
import {createFilter} from 'react-search-input';
import {firebaseConnect, dataToJS, pathToJS, getFirebase} from 'react-redux-firebase';
import {connect} from 'react-redux';
import _ from 'lodash';

import '../../styles/containers/FriendList.css';
import Search from '../components/Search/Search';
import Friend from '../components/Friend/Friend';

const KEYS_TO_FILTERS = ['firstName', 'lastName', 'email'];

export class FriendList extends Component {
    constructor() {
        super();

        this.state = {
            conversations: [],
            searchTerm: '',
        }
    }

    componentWillReceiveProps({allConversations, profile}) {
        // console.log('FriendList: ', conversations);
        // console.log('profile: ', profile);


        const userConversations = _.reduce(profile && profile.conversations, function(result, value, key) {
            return _.isEqual(value, allConversations[key]) ?
                result : _.assign(result,{[key]: allConversations[value]});
        }, {});

        this.setState({
            conversations: userConversations,
        });

        console.log(userConversations);


        // this.getConversation(currentUser.uid);
    }


    handleChange(e) {
        this.setState({
            searchTerm: e.target.value
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
        };

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

const wrappedComponent = firebaseConnect((props,firebase) => [
    '/conversations#'
])(FriendList);

export default connect(
    ({ firebase }) => ({
        allConversations: dataToJS(firebase, 'conversations'),
        profile: pathToJS(firebase, 'profile')
    })
)(wrappedComponent);


