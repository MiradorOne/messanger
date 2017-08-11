import React, { Component } from 'react';
import '../../../styles/components/FriendProfile.css';
import Placeholder from '../../../static/images/avatar-placeholder.png';
import UserMenu from '../_common/userMenu';
import * as firebase from 'firebase';
import { firebaseConnect, pathToJS} from 'react-redux-firebase';
import { connect } from 'react-redux';

const initialState = {
	userMenuIsVisible: false,
}

class FriendProfile extends Component {
	constructor(props) {
		super(props);

		this.state = initialState;
		this.getFriendProfile = this.getFriendProfile.bind(this);
	}

	reset() {
		this.setState(initialState);
	}

	componentWillReceiveProps(props) {
		if (props.selectedUser && props.selectedUser.length) {
			this.getFriendProfile(props.selectedUser)
		}
	}

	showUserMenu() {
		this.setState({
			userMenuIsVisible: !this.state.userMenuIsVisible
		})
	}

	getFriendProfile(id) {
		this.reset();
		this.props.firebase.ref(`users/${id}/`).once('value', (snapshot) => {
			let pictureKey = null;
			let pictureURL = null;
			if (snapshot.val().picture) {
				pictureKey = Object.keys(snapshot.val().picture)[0]
				pictureURL = snapshot.val().picture[pictureKey].downloadURL;
			}
			const data = {
				nickname: snapshot.val().nickname,
				tel: snapshot.val().telephone,
				date: snapshot.val().date,
				gender: snapshot.val().gender,
				language: snapshot.val().language,
				firstName: snapshot.val().firstName,
				lastName: snapshot.val().lastName,
				picture: pictureURL
			}
			this.setState({
				...data
			})
		})
	}

	render() {
		const friendProfile = ({firstName, lastName, nickname, tel, date, gender, language, picture}) => {
			if (this.props && this.props.selectedUser) {
				return (
					<div className="wrapper">
						<div className="user-image friend-profile">
							<div className="actions"></div>
							<img style={{maxWidth:'120px',height:'auto', borderRadius:'50%'}} src={picture || Placeholder} alt=""/>
							<h3 className='friend-info'>
								{firstName + ' ' + lastName}
								<span className="location"></span>
							</h3>
						</div>
						<ul className="full-info">
							<li>
								<span className="title">Nickname:</span>
								<span className="value">{nickname}</span>
							</li>
							<li>
								<span className="title">Tel:</span>
								<span className="value">{tel}</span>
							</li>
							<li>
								<span className="title">Date of Birth:</span>
								<span className="value">{date}</span>
							</li>
							<li>
								<span className="title">Gender:</span>
								<span className="value">{gender}</span>
							</li>
							<li>
								<span className="title">Language:</span>
								<span className="value">{language}</span>
							</li>
						</ul>
					</div>
				)
			}
		}

		return (
			<div className="Friend-Profile">
				<div className="top-bar">
					<i className="icon notifications" />
					<div className="user-menu" style={ {position: 'relative', textAlign: 'left', maxWidth: '100%', wordWrap: 'break-word'} } onClick={this.showUserMenu.bind(this)}>
						{this.state.userMenuIsVisible ? <UserMenu /> : ''}
						{this.props.currentUser ?
							`${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`
							: 'Anonymous'}
					</div>
				</div>
				{friendProfile(this.state)}
			</div>
		);
	}
}

const wrapper = firebaseConnect()(FriendProfile);

export default connect()(wrapper);