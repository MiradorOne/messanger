import React, { Component } from 'react';
import * as firebase from 'firebase';

import '../../../styles/components/Friend.css';
import UserImage from '../../../static/images/user-image.png';

class Friend extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOnline: false 
        }
        this.watchOnlineStatus();
    }

    watchOnlineStatus() {
        const self = this;
        firebase.database().ref(`/users/${this.props.userID}/isOnline`).on('value', function(snapshot) {
             self.setState({
                 isOnline: snapshot.val() || false
             })
        })
    }

    render() {
        return (
            <div className={`Friend ${this.state.isOnline ? 'is-online' : ''}`} >
                <div className="profile-img">
                    <img src={UserImage} alt=""/>
                </div>
                <div className="content">
                    <div className="username">
                        {this.props.firstName + ' ' + this.props.lastName}
                    </div>
                    <span className="last-message">
                    Lorem ipsum dolore
                    </span>
                </div>
                <div className="additional">
                    <div className="actions" />
                    <span className="message-date">
                        5 min
                    </span>
                </div>
            </div>
        )
    }
}

export default Friend;