import React, {Component} from 'react';
import '../../styles/containers/UserProfile.css';
import * as firebase from 'firebase';
import {browserHistory, Link} from 'react-router';
import Placeholder from '../../static/images/friend-image.png';


export default class UserProfile extends Component {
    constructor() {
        super();

        this.state = {
            isEditable: false,
        }
    }
    render() {

        const fields = () => {
            if (this.state.isEditable) {
                return (
                    <ul>
                        <li>Nickname: <span><input className="input-default" type="text" placeholder="Lorem"/></span></li>
                        <li>Telephone: <span><input className="input-default" type="text" placeholder="987 654 321"/></span></li>
                        <li>Date of Birth: <span><input className="input-default" type="date" placeholder="17.02.1990"/></span></li>
                        <li>Gender: <span><input className="input-default" type="text" placeholder="Male"/></span></li>
                        <li>Language: <span><input className="input-default" type="text" placeholder="English"/></span></li>
                    </ul>
                )
            } else {
                return (
                    <ul>
                        <li>Nickname: <span>Lorem</span></li>
                        <li>Telephone: <span>987 654 321</span></li>
                        <li>Date of Birth: <span>17.02.1990</span></li>
                        <li>Gender: <span>Male</span></li>
                        <li>Language: <span>English</span></li>
                    </ul>
                )
            }
        }

        return (
            <div className="User-Profile">
                <div className="topbar">
                    <a href="#">Back</a>
                </div>
                <main>
                    <div className="container">
                        <div className="profile-picture">
                            <img src={Placeholder} alt=""/>
                        </div>
                        <div className="profile-info">
                            <div className="full-name">
                                <p>
                                    First Last
                                    <i className={`icon ${this.state.isEditable ? 'icon-edit-active' : 'icon-edit'}`}
                                       onClick={() => {this.setState({isEditable: !this.state.isEditable})}}></i>
                                </p>
                            </div>
                            <div className="info-list edit">
                                {fields()}
                            </div>
                        </div>
                    </div>
                </main>
                <footer>

                </footer>
            </div>
        )
    }
}