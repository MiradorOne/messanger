import React from 'react';

const componentStyles = {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)'
};

const modalStyles = {
    position: 'absolute',
    zIndex: '99',
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
    backgroundColor: 'rgba(35,42,50,0.5)',
    padding: '50px 80px',
    textAlign: 'center'
};

const inputStyles = {
    padding: '10px 5px',
    display: 'block',
    margin: '15px 0'
};

const AuthModal = ({ type }) => {

    const login = () => {
        return (
            <div className="modal login" >
                <form action="#">
                    <input type="text" placeholder="Email" className="input-default" style={inputStyles}/>
                    <input type="password" placeholder="Password" name="password" className="input-default" style={inputStyles}/>
                    <button className="btn-default" type="submit">Sign in</button>
                </form>
            </div>
        )
    };

    const register = () => {
        return (
            <div className="modal register">
                <form action="#">
                    <input type="text" placeholder="Email" className="input-default" style={inputStyles}/>
                    <input type="password" placeholder="Password" name="password" className="input-default" style={inputStyles}/>
                    <input type="password" placeholder="Confirm password" name="password_confirm" className="input-default" style={inputStyles}/>
                    <button className="btn-default" type="submit">Sign up</button>
                </form>
            </div>
        )
    };

    return (
        <div className="Auth-Modal" style={componentStyles}>
            <div className="modal-group" style={modalStyles}>
                { type === 'signIn' ? login() : register() }
            </div>
        </div>
    )
};

export default AuthModal;