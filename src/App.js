import './index.css';

import React, {Component} from 'react';

import { initDB } from './db/index';
import Inbox from './app/containers/Inbox';
import FriendList from './app/containers/FriendList';
import Chat from './app/containers/Chat';

class App extends Component {

    componentWillMount() {
        initDB();
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <Inbox />
                    <FriendList />
                    <Chat />
                </div>
            </div>
        );
    }
}

export default App;
