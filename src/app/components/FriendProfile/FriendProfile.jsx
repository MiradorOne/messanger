import React, { Component } from 'react';
import '../../../styles/components/FriendProfile.css';
import FriendImage from '../../../static/images/friend-image.png';

class FriendProfile extends Component {
	render() {
		return (
			<div className="Friend-Profile">
				<div className="top-bar">
					<i className="icon notifications" />
					<div className="user-menu">
						{this.props.currentUser.displayName ? this.props.currentUser.displayName : this.props.currentUser.email}
					</div>
				</div>
				<div className="user-image friend-profile">
					<div className="actions"></div>
					<img src={FriendImage} alt=""/>
					<h3 className='friend-info'>
						Kirsten Mckellar
						<span className="location">Cape Town, RSA</span>
					</h3>
				</div>
				<ul className="full-info">
					<li>
						<span className="title">Nickname:</span>
						<span className="value">Killa</span>
					</li>
					<li>
						<span className="title">Tel:</span>
						<span className="value">072 458 123</span>
					</li>
					<li>
						<span className="title">Date of Birth:</span>
						<span className="value">July 12, 1988</span>
					</li>
					<li>
						<span className="title">Gender:</span>
						<span className="value">Female</span>
					</li>
					<li>
						<span className="title">Language:</span>
						<span className="value">English</span>
					</li>
				</ul>
			</div>
		);
	}
}

export default FriendProfile;