import './index.css';
import './styles/scrollbar.css';

import React, {Component} from 'react';
// import * as firebase from 'firebase';
import { connect } from 'react-redux'
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase'

import { initDB } from './db/index';
import Inbox from './app/containers/Inbox';
import FriendList from './app/containers/FriendList';
import Chat from './app/containers/Chat';
import ProfileBar from './app/containers/ProfileBar';
import AuthModal from './app/components/_common/AuthModal';

export class App extends Component {
    constructor() {
        super();
        // initDB();
        // this.authObserver();

        this.state = {
            currentUser: '',
            activeConversation: null,
        };

        this.checkCredentials = this.checkCredentials.bind(this);
        // this.selectConversation = this.selectConversation.bind(this);
    }
    //
    // authObserver() {
    //     const self = this;
    //     firebase.auth().onAuthStateChanged(function(user) {
    //         if (user) {
    //             self.setState({
    //                 currentUser: user
    //             })
    //         }
    //     });
    // }

    selectConversation(convID) {
        this.setState({
            activeConversation: convID
        })
    }

    checkCredentials(email,password,passwordConfirm,firstName,lastName,signIn,e) {
        e.preventDefault();
        this.props.firebase.login({
            email: email,
            password: password,
            type: 'redirect',
        }).then((user) => {
            this.setState({
                currentUser: user
            })
        })
    }

    render() {
        return (
            <div className="App">
                { this.props.profile ? '' : <AuthModal submitHandler={this.checkCredentials}/>}

                <div className="App-header">
                    <Inbox />
                    <FriendList currentUser={this.props.auth && this.props.auth.uid}
                    activeConversation={this.state.activeConversation} 
                    selectConversation={this.selectConversation}/>

                    <Chat activeConversation={this.state.activeConversation}/>
                    
                    <ProfileBar currentUser={this.state.currentUser}/>
                </div>
            </div>
        );
    }
}

const wrappedApp = firebaseConnect([
    // '/users',
    '/conversations'
])(App);

export default connect(
    ({ firebase }) => ({
        // users: dataToJS(firebase, 'users'),
        conversation: dataToJS(firebase, 'conversations'),
        authError: pathToJS(firebase, 'authError'),
        auth: pathToJS(firebase, 'auth'),
        profile: pathToJS(firebase, 'profile')
    })
)(wrappedApp)