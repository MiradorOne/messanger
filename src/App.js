import './index.css';

import React, {Component} from 'react';
import * as firebase from 'firebase';

import { initDB } from './db/index';
import Inbox from './app/containers/Inbox';
import FriendList from './app/containers/FriendList';
import Chat from './app/containers/Chat';
import ProfileBar from './app/containers/ProfileBar';
import AuthModal from './app/components/_common/AuthModal';

class App extends Component {
    constructor() {
        super();
        initDB();
        this.authObserver();

        this.state = {
            currentUser: ''
        };

        this.checkCredentials = this.checkCredentials.bind(this);
    }

    authObserver() {
        const self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.setState({
                    currentUser: user
                })
            }
        });
    }

    checkCredentials(email,password,e) {
        e.preventDefault();
        let self = this;
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            self.setState({
                currentUser: null
            });
            throw new Error(error);
        });

        if (firebase.auth().currentUser) {
            this.setState({
                currentUser: firebase.auth().currentUser
            })
        }
    }

    render() {
        return (
            <div className="App">

                { this.state.currentUser ? '' : <AuthModal type="signIn" submitHandler={this.checkCredentials}/>}

                <div className="App-header">
                    <Inbox />
                    <FriendList />
                    <Chat />
                    <ProfileBar currentUser={this.state.currentUser}/>
                </div>
            </div>
        );
    }
}

export default App;
