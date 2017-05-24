import React, { Component } from 'react';

export default class Navigation extends Component {


    render() {
        return (
            <div className="Navigation">
                <ul className="link-group messages-group bottom-border">
                    <li>All messages</li>
                    <li>Unread</li>
                    <li className="active">Important</li>
                    <li>Drafs</li>
                </ul>
                <ul className="link-group media-group bottom-border">
                    <li>Teams</li>
                    <li>Groups</li>
                    <li>Channels</li>
                    <li>Locations</li>
                    <li>Media</li>
                </ul>
                <ul className="link-group settings-group bottom-border">
                    <li>Help</li>
                    <li>Settings</li>
                </ul>
            </div>
        )
    }
}