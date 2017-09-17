import React, { Component } from 'react';
import { changeMessageTypeToUnread, changeMessageTypeToAll } from '../../actions/ui';
import {connect} from 'react-redux';
import {firebaseConnect, pathToJS} from 'react-redux-firebase';
import { countUnreadMessages } from '../../actions/messagesActions';

class Navigation extends Component {
    constructor(props) {
        super(props);
        if (props.auth) {
            props.dispatch(countUnreadMessages(props.auth.uid, props.auth.email))                
        }
    }

    render() {
        return (
            <div className="Navigation">
                <ul className="link-group messages-group bottom-border">
                    <li onClick={() => {this.props.dispatch(changeMessageTypeToAll())}} 
                        className={this.props.filter === 'all' ? 'active' : ''}>
                        All conversations
                    </li>

                    <li onClick={() => {this.props.dispatch(changeMessageTypeToUnread())}} 
                        className={this.props.filter === 'unread' ? 'active' : ''}>
                        Unread 
                        <span className="count">{this.props.filteredMessagesAmount.unread}</span>
                    </li>
                    {/* <li>Important <span className="count">228</span></li>
                    <li>Drafs <span className="count">66</span></li> */}
                </ul>
                {/* <ul className="link-group media-group bottom-border">
                    <li>Teams</li>
                    <li>Groups</li>
                    <li>Channels</li>
                    <li>Locations</li>
                    <li>Media</li>
                </ul> */}
                <ul className="link-group settings-group">
                    <li>Help</li>
                    <li>Settings</li>
                </ul>
            </div>
        )
    }
}

const wrappedComponent = firebaseConnect()(Navigation);

export default connect(
    ({ firebase, filteredMessagesAmount, ui }) => ({
        auth: pathToJS(firebase, 'auth'),
        filter: ui.messagesFilter,
        filteredMessagesAmount
    })
)(wrappedComponent);