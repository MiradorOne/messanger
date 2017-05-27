import React, { Component } from 'react';

export default class Navigation extends Component {


    render() {
        return (
            <div className="Navigation">
                <ul className="link-group messages-group bottom-border">
                    <li>All messages <span className="count">21</span></li>
                    <li>Unread <span className="count">1337</span></li>
                    <li className="active">Important <span className="count">228</span></li>
                    <li>Drafs <span className="count">66</span></li>
                </ul>
                <ul className="link-group media-group bottom-border">
                    <li>Teams</li>
                    <li>Groups</li>
                    <li>Channels</li>
                    <li>Locations</li>
                    <li>Media</li>
                </ul>
                <ul className="link-group settings-group">
                    <li>Help</li>
                    <li>Settings</li>
                </ul>
            </div>
        )
    }
}