import React, {PureComponent} from 'react';
import Placeholder from '../../../static/images/avatar-placeholder.png';
import * as firebase from 'firebase';
import { detectTime } from '../../../utils/timeDetector'

const messageStyles = {
    backgroundColor: '#fff',
    padding: '15px',
    fontSize: '16px',
    fontWeight: '300',
    borderRadius: '5px',
    maxWidth: '405px',
    flexBasis: '100%',
    wordWrap: 'break-word'
};

const rowStyles = {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0'
};

const userStyles = {
    margin: '0 3.5%'
};

const imageStyles = {
    width: '35px',
    height: '35px',
    borderRadius: '50%'
};

export default class Message extends PureComponent {

    render() {
        const messageType = () => {
            return this.props.data.from === firebase.auth().currentUser.email ? 'message-row my-message' : 'messsage-row';
        };
        return (
            <div className={messageType()} style={rowStyles}>
                <div className="user" style={userStyles}>
                    <img src={messageType() === 'message-row my-message' ? this.props.currentUserImage : (this.props.friendImage ? this.props.friendImage : Placeholder)} alt="User" style={imageStyles}/>
                </div>
                <div className="message" style={messageStyles}>
                    <p>
                        {this.props.data.value}
                    </p>
                </div>
                <span className="timestamp" style={{
                    fontSize:'11px',
                    color: '#a5a9ae',
                    display: 'block',
                    width: '70px',
                    paddingRight: '.3em',
                    paddingLeft: '0.6em'
                }}>{detectTime(this.props.data.timestamp)}</span>
            </div>
        )
    }
}