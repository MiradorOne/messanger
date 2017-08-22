import React, { Component } from 'react';
import { changeMessageTypeToUnread, changeMessageTypeToAll } from '../../actions/ui';
import {connect} from 'react-redux';

class Navigation extends Component {
    render() {
        return (
            <div className="Navigation">
                <ul className="link-group messages-group bottom-border">
                    <li onClick={() => {this.props.dispatch(changeMessageTypeToAll())}} className={this.props.filter === 'all' ? 'active' : ''}>All conversations</li>
                    <li onClick={() => {this.props.dispatch(changeMessageTypeToUnread())}} className={this.props.filter === 'unread' ? 'active' : ''}>Unread <span className="count"></span></li>
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

function mapStateToProps(state) {
    return {
        filter: state.ui.messagesFilter
    }
}

export default connect(mapStateToProps)(Navigation);