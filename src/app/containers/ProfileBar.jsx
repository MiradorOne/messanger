import React, { Component } from 'react';
import FriendProfile from '../components/FriendProfile/FriendProfile';
import { firebaseConnect, pathToJS} from 'react-redux-firebase';
import { connect } from 'react-redux';

import '../../styles/containers/ProfileBar.css';

class ProfileBar extends Component {
	render() {
		return (
			<div className="container Profile-Bar">
				<FriendProfile currentUser={this.props.profile}/>
			</div>
		);
	}
}

const wrappedComponent = firebaseConnect()(ProfileBar);

export default connect(({ firebase }) => (
    {
        profile: pathToJS(firebase, 'profile')
    }
))(wrappedComponent);