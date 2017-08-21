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
        }
    }

    componentWillReceiveProps({ui, auth}) { // Filter all conversations for user conversations
        if (auth && auth.uid.length > 0) {

            switch (ui.messagesFilter) {
                case 'unread': {
                    if (this.props.ui.messagesFilter !== ui.messagesFilter) {
                        this.props.dispatch(getUnreadMessages(auth.uid));
                    }
                    break;
                }
                case 'all': {
                    if (Object.keys(this.props.filteredMessages).length === 0 || this.props.ui.messagesFilter !== ui.messagesFilter) {
                        this.props.dispatch(getAllMessages(auth.uid));
                    }
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
            return (
                <li className="no-conversation">
                    You don't have conversations yet! Search friend to start conversation
                </li>
            )
        };
        return (
            <div className="container Friend-List">
                <Search handleChange={this.handleChange.bind(this)}/>
                <ul style={{ height: '100%', overflowY: 'scroll', paddingBottom: '200px', position: 'relative' }}>
                    {
                        Object.keys(this.props.filteredMessages).length === 0 ? noConversationsMessage() :
                            searchResult.map((value, i) => {
                                return (
                                    <li key={i}
                                        className={_.get(this.props.filteredMessages[this.props.activeConversation], 'users[1].email') === value.users[1].email ? 'selected' : ''}

                                        onClick={this.props.selectConversation.bind(this,searchResult[i], {userID: value.users[1].id === this.props.auth.uid ? value.users[0].id : value.users[1].id})}>

                                        <Friend firstName={value.users[1].firstName === this.props.profile.firstName ? value.users[0].firstName : value.users[1].firstName}

                                                lastName={value.users[1].lastName === this.props.profile.lastName ? value.users[0].lastName : value.users[1].lastName}

                                                userID={value.users[1].id === this.props.auth.uid ? value.users[0].id : value.users[1].id}

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


