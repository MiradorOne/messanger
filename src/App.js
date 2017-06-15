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
            currentUser: '',
        };

        this.checkCredentials = this.checkCredentials.bind(this);
    }
    
    componentDidUpdate(nextProps, nextState) {
        // firebase.database().ref('users/'+ this.state.currentUser.uid).set({
        //     username: 'Dimon',
        //     role: 'Bog',
        //     email: '228@gmail.com'
        // })
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

    checkCredentials(email,password,passwordConfirm,signIn,e) {
        e.preventDefault();
        let self = this;
        if (signIn) {
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                self.setState({
                    currentUser: null
                });
                throw new Error(error);
            });
        } else {
            if (password === passwordConfirm) {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                    firebase.database().ref('users/'+ firebase.auth().currentUser.uid).set({
                        email: email,
                        conversation: []
                    })
                })
            } else {
                console.error('Password confirmaion fail'); // TODO: Add form validation
            }
        }

        if (firebase.auth().currentUser) {
            this.setState({
                currentUser: firebase.auth().currentUser
            })
        }
    }

    render() {
        return (
            <div className="App">

                { this.state.currentUser ? '' : <AuthModal submitHandler={this.checkCredentials}/>}

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
