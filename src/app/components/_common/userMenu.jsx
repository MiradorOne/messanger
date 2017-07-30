import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { browserHostory } from 'react-router';
import {Link} from 'react-router';

const menuStyles = {
    border: '1px solid #eee',
    position: 'absolute',
    zIndex: '10',
    width: '100%',
    background: '#fff',
    bottom: '-90px',
    minWidth: '100px',
};

class UserMenu extends Component {

    render() {
        return (
            <div className="user-menu" style={menuStyles}>
                <ul>
                    <li style={{ padding: '10px 0', textAlign: 'center' }}>
                        <Link to="profile" >Profile</Link>
                    </li>
                    <li style={{ borderBottom: '1px solid #eee', padding: '10px 0', textAlign: 'center' }}><a href="#"
                    onClick={() => {this.props.firebase.logout().then(() => {browserHostory.push('/auth')})}}>Log out</a></li>
                </ul>
            </div>
        )
    }
}

export default firebaseConnect()(UserMenu);