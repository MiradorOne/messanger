import './index.css';
import './styles/scrollbar.css';

import React, {Component} from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux'
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase'
import { browserHistory } from 'react-router'

import { initDB } from './db/index';
import { getUserPermission } from './utils/notifications'
import Inbox from './app/containers/Inbox';
import FriendList from './app/containers/FriendList';
import Chat from './app/containers/Chat';
import ProfileBar from './app/containers/ProfileBar';

export class App extends Component {
    constructor() {
        super();
        initDB();

        this.state = {
            currentUser: '',
            activeConversation: null,
        };

        this.selectConversation = this.selectConversation.bind(this);
    }

    selectConversation({convID}) {
        this.setState({
            activeConversation: convID
        })
    }

    componentDidMount() {
        getUserPermission();
    }

    componentWillReceiveProps(props) {
        if (!props.profile) {
            firebase.app().delete();
            browserHistory.push('/auth');
        } else {
            this.props.firebase.update(`/users/${this.props.auth.uid}/`, {isOnline: true});
            this.setState({
                currentUser: this.props.auth.uid
            })
        }
    }

    componentWillUnmount() {
        if (this.state.currentUser) {
            this.props.firebase.update(`/users/${this.state.currentUser}/`, {isOnline: false});
        }      
    }

    render() {

        return (
            <div className="App">

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
])(App);

export default connect(
    ({ firebase }) => ({
        authError: pathToJS(firebase, 'authError'),
        auth: pathToJS(firebase, 'auth'),
        profile: pathToJS(firebase, 'profile')
    })
)(wrappedApp)