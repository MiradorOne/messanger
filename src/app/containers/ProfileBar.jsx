import React, { Component } from 'react';
import FriendProfile from '../components/FriendProfile/FriendProfile';

import '../../styles/containers/ProfileBar.css';

class ProfileBar extends Component {
	render() {
		return (
			<div className="container Profile-Bar">
				<FriendProfile currentUser={this.props.currentUser}/>
			</div>
		);
	}
}

export default ProfileBar;