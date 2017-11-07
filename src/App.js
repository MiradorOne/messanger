import './index.css';
import './styles/scrollbar.css';

import React, {Component} from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux'
import { firebaseConnect, pathToJS } from 'react-redux-firebase'
import { browserHistory } from 'react-router'

import { initDB } from './db/index';
import { getUserPermission } from './utils/notifications'
import Inbox from './app/containers/Inbox';
import FriendChatWrapper from './app/components/FriendChatWrapper';

export class App extends Component {
    constructor() {
        super();
        try {
            initDB();
        } catch (e) {
        }  

        this.state = {
            currentUser: '',
        };
        this.handleWindowClose =this.handleWindowClose.bind(this);
    }

    handleWindowClose(e) {
        e.preventDefault();
        if (this.state.currentUser) {
            this.props.firebase.update(`/users/${this.state.currentUser}/`, {isOnline: false}).then(() => {
                return e.returnValue = true;
            });
        };
    }

    componentDidMount() {
        getUserPermission();
        window.addEventListener("beforeunload",this.handleWindowClose);
        if (this.props.auth && this.props.auth.uid) {
            this.props.firebase.update(`/users/${this.props.auth.uid}/`, {isOnline: true});
        }        
    }

    componentWillReceiveProps(props) {
        if (!props.profile) {
            firebase.app().delete();
            browserHistory.push('/auth');
        } else {
            this.setState({
                currentUser: this.props.auth.uid
            })
        }
    }

    componentWillUnmount() {
        if (this.state.currentUser) {
            this.props.firebase.update(`/users/${this.state.currentUser}/`, {isOnline: false});
        }  
        window.removeEventListener('onbeforeunload',this.handleWindowClose);
    }

    render() {

        return (
            <div className="App">

                <div className="App-header">
                    <Inbox />
                    <FriendChatWrapper currentUser={this.state.currentUser}/>
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