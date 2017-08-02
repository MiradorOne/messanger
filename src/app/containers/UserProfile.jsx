import React, {Component} from 'react';
import '../../styles/containers/UserProfile.css';
// import * as firebase from 'firebase';
import {browserHistory, Link} from 'react-router';
import Placeholder from '../../static/images/avatar-placeholder.png';
import {firebaseConnect, pathToJS} from 'react-redux-firebase';
import {connect} from 'react-redux';


class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditable: false,
        }

        this.updateProfile = this.updateProfile.bind(this);
        this.fileSelect = this.fileSelect.bind(this);        
    }

    handleChange(field, e) {
        this.setState({
            [field]: e.target.value
        })
    }

    updateProfile() {
        this.props.firebase.update(`users/${this.props.auth.uid}/`, {
            nickname: this.state.nickname,
            telephone: this.state.telephone,
            date: this.state.date,
            gender: this.state.gender,
            language: this.state.language,
        }).then(() => {
            this.setState({
                isEditable: false
            })
        })
    }

    fileSelect(e) {
        if (e.target.files.length === 1) {
            this.props.firebase.remove(`users/${this.props.auth.uid}/picture`);
            this.props.firebase.uploadFile(`/users/${this.props.auth.uid}/`, e.target.files[0], `users/${this.props.auth.uid}/picture`)
        }
    }

    render() {

        const fields = ({...profile}) => {
            if (this.state.isEditable) {
                return (
                    <ul>
                         <li>Nickname: <span><input onChange={this.handleChange.bind(this,'nickname')} className="input-default" type="text" placeholder={profile.nickname || 'Your nickname'}/></span></li>
                        <li>Telephone: <span><input onChange={this.handleChange.bind(this,'telephone')} className="input-default" type="text" placeholder={profile.telephone || 'Telephone'}/></span></li>
                        <li>Date of Birth: <span><input onChange={this.handleChange.bind(this,'date')} className="input-default" type="date" placeholder={profile.date || 'Date of Birth'}/></span></li>
                        <li>Gender: <span><input onChange={this.handleChange.bind(this,'gender')} className="input-default" type="text" placeholder={profile.gender || 'Gender'}/></span></li>
                        <li>Language: <span><input onChange={this.handleChange.bind(this,'language')} className="input-default" type="text" placeholder={profile.language || 'Language'}/></span></li> 
                    </ul>
                )
            } else {
                return (
                    <ul>
                        <li>Nickname: <span>{profile.nickname || 'Your nickname'}</span></li>
                        <li>Telephone: <span>{profile.telephone || 'Telephone'}</span></li>
                        <li>Date of Birth: <span>{profile.date || 'Date of Birth'}</span></li>
                        <li>Gender: <span>{profile.gender || 'Gender'}</span></li>
                        <li>Language: <span>{profile.language || 'Language'}</span></li>
                    </ul>
                )
            }
        }

        const pictureKey = this.props && this.props.profile && Object.keys(this.props.profile.picture)[0];
        const pictureURL = this.props.profile && this.props.profile.picture[pictureKey].downloadURL;

        return (
            <div className="User-Profile">
                <div className="topbar">
                    <a href="#">Back</a>
                </div>
                <main>
                    <div className="container">
                        <div className="profile-picture">
                            <img src={pictureURL || Placeholder} alt=""/>
                            <input onChange={this.fileSelect} className='input-file' id='file' type="file" multiple='false' accept='.jpg,.png,.jpeg'/>
                            <label htmlFor='file'>Choose a picture</label>
                        </div>
                        <div className="profile-info">
                            <div className="full-name">
                                <p>
                                    {this.props.profile && this.props.profile.firstName + ' ' + this.props.profile.lastName}
                                    <i className={`icon ${this.state.isEditable ? 'icon-edit-active' : 'icon-edit'}`}
                                       onClick={() => {this.setState({isEditable: !this.state.isEditable})}}></i>
                                </p>
                            </div>
                            <div className="info-list edit">
                                 {fields(this.props && this.props.profile)} 
                            </div>
                        </div>                        
                    </div>
                    <div className="row">
                        {this.state.isEditable ? <button style={{color: '#000'}} type='submit' onClick={this.updateProfile} className='btn btn-default'>Save</button> : ''}
                    </div>
                </main>
                <footer>

                </footer>
            </div>
        )
    }
}

const wrapper = firebaseConnect()(UserProfile);

export default connect(
    ({ firebase }) => ({
        auth: pathToJS(firebase, 'auth'),
        profile: pathToJS(firebase, 'profile')
    })
)(wrapper);