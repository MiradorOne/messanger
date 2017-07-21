import React, { Component } from 'react';

import '../../../styles/components/Friend.css';
import UserImage from '../../../static/images/user-image.png';

export default class Friend extends Component {

    render() {
        return (
            <div className="Friend is-online" >
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