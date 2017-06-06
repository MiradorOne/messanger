import './index.css';

import React, {Component} from 'react';

import { initDB } from './db/index';
import Inbox from './app/containers/Inbox';
import FriendList from './app/containers/FriendList';
import Chat from './app/containers/Chat';
import ProfileBar from './app/containers/ProfileBar';
import AuthModal from './app/components/_common/AuthModal';

class App extends Component {

    componentWillMount() {
        initDB();
    }

    render() {
        return (
            <div className="App">
                <AuthModal type="signIn"/>
                <div className="App-header">
                    <Inbox />
                    <FriendList />
                    <Chat />
                    <ProfileBar />
                </div>
            </div>
        );
    }
}

export default App;
