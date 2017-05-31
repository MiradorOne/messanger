import React from 'react';
import UserImage from '../../../static/images/user-image.png';

const messageStyles = {
    backgroundColor: '#fff',
    padding: '15px',
    fontSize: '16px',
    fontWeight: '300',
    borderRadius: '5px',
    maxWidth: '405px',
    flexBasis: '100%'
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
};

const Message = () => {
    return (
        <div className="message-row" style={rowStyles}>
            <div className="user" style={userStyles}>
                <img src={UserImage} alt="User" style={imageStyles}/>
            </div>
            <div className="message" style={messageStyles}>
                <p>
                    This is a test message lorem ipsum
                    lorem ipsum lorem ipsum
                </p>
            </div>
        </div>
    )
};

export default Message;