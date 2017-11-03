import React, { Component } from 'react';
import {createFilter} from 'react-search-input';
import {firebaseConnect, dataToJS, pathToJS} from 'react-redux-firebase';
import {connect} from 'react-redux';
import _ from 'lodash';

import '../../styles/containers/FriendList.css';
import Search from '../components/Search/Search';
import Friend from '../components/Friend/Friend';
import { getUnreadMessages, getAllMessages } from '../actions/messagesActions';

const KEYS_TO_FILTERS = ['users.firstName', 'users.lastName', 'users.email'];

export class FriendList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
        };

        if (props.auth && props.auth.uid.length > 0) {

            switch (props.ui.messagesFilter) {
                case 'unread': {
                    props.dispatch(getUnreadMessages(props.auth.uid, props.profile.email));                    
                    break;
                }
                case 'all': {
                    if (Object.keys(props.filteredMessages).length === 0 ) {
                        props.dispatch(getAllMessages(props.auth.uid));
                    }
                    break;
                }
                default: {
                    this.props.dispatch(getAllMessages(props.auth.uid));
                    break;
                }
            }
        }
    }

    componentWillReceiveProps({ui, auth, profile}) { 
        if (ui.messagesFilter !== this.props.ui.messagesFilter) {

            switch (ui.messagesFilter) {
                case 'unread': {
                    this.props.dispatch(getUnreadMessages(auth.uid, profile.email));
                    break;
                }
                case 'all': {
                    this.props.dispatch(getAllMessages(auth.uid));
                    break;
                }
                default: {
                    this.props.dispatch(getAllMessages(auth.uid));
                    break;
                }
            }
        }
    }


    handleChange(e) {
        this.setState({
            searchTerm: e.target.value
        })
    }

    render() {
        let searchResult = Object.keys(this.props.filteredMessages)
            .map(value => {

                return {
                    users: _.get(this.props.filteredMessages[value],'users'),
                    lastMessage: _.orderBy(_.get(this.props.filteredMessages[value],'messages'),'timestamp','desc')[0],
                    convID: value
                }

            })
            .filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

        searchResult = _.orderBy(searchResult,'lastMessage.timestamp','desc');
                            
        const noConversationsMessage = () => {
            if (this.props.ui.messagesFilter === 'all') {
                return (
                    <li className="no-conversation">
                        You don't have conversations yet! Search friend to start conversation
                    </li>
                )
            } else {
                return (
                    <li className="no-conversation">
                        No result
                    </li>
                )
            }
        };
        if (true) {
            return (
                <div className="container Friend-List">
                    <Search handleChange={this.handleChange.bind(this)}/>
                    <ul style={{ height: '100%', overflowY: 'scroll', paddingBottom: '200px', position: 'relative' }}>
                        {
                            Object.keys(this.props.filteredMessages).length === 0 ? noConversationsMessage() :
                                searchResult.map((value, i) => {

                                    const userID = value.users[1].id === (this.props.auth ? this.props.auth.uid : '') ? value.users[0].id : value.users[1].id;
                                    const firstName = value.users[1].firstName === (this.props.profile ? this.props.profile.firstName : '') ? value.users[0].firstName : value.users[1].firstName;
                                    const lastName = value.users[1].lastName === (this.props.profile ? this.props.profile.lastName : '') ? value.users[0].lastName : value.users[1].lastName;

                                    return (
                                        <li key={i}

                                            className={this.props.selectedUserID === userID ? 'selected' : ''}

                                            onClick={this.props.selectConversation.bind(this,
                                                                                        searchResult[i], 
                                                                                        {userID: value.users[1].id === (this.props.auth ? this.props.auth.uid : '') ? value.users[0].id : value.users[1].id})}>

                                            <Friend firstName={firstName}

                                                    lastName={lastName}

                                                    userID={userID}

                                                    lastMessage={value.lastMessage ? value.lastMessage : ''}
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
}

const wrappedComponent = firebaseConnect((props,firebase) => [
    '/conversations#'
])(FriendList);

export default connect(
    ({ firebase, filteredMessages, ui }) => ({
        allConversations: dataToJS(firebase, 'conversations'),
        profile: pathToJS(firebase, 'profile'),
        auth: pathToJS(firebase, 'auth'),
        ui,
        filteredMessages
    })
)(wrappedComponent);


