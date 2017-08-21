import React, { Component } from 'react';
import { changeMessageTypeToUnread, changeMessageTypeToAll } from '../../actions/ui';
import {connect} from 'react-redux';

class Navigation extends Component {


    render() {
        return (
            <div className="Navigation">
                <ul className="link-group messages-group bottom-border">
                    <li onClick={() => {this.props.dispatch(changeMessageTypeToAll())}} className="active">All messages</li>
                    <li onClick={() => {this.props.dispatch(changeMessageTypeToUnread())}}>Unread <span className="count">5</span></li>
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

export default connect()(Navigation);