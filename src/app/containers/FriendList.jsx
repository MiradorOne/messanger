import React, { Component } from 'react';

import '../../styles/containers/FriendList.css';
import Search from '../components/Search/Search';
import Friend from '../components/Friend/Friend';

export default class FriendList extends Component {


    render() {
        return (
            <div className="container Friend-List">
                <Search />
                <ul>
                    <li>
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                    </li>
                </ul>
            </div>
        )
    }
}