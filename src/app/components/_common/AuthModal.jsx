import React, { Component } from 'react';

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
    backgroundColor: 'rgba(35,42,50,0)',
    border: '2px solid #fff',
    borderRadius: '5px',
    padding: '50px 80px',
    textAlign: 'center'
};

const inputStyles = {
    padding: '10px 5px',
    display: 'block',
    margin: '15px 0'
};

class AuthModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signIn: true,            
            email: '',
            password: '',
            passwordConfirm: '',
        };

    }

    handleChange(type,e) {
        this.setState({
            ...this.state,
            [type]: e.target.value
        })
    }

    changeType() {
        this.setState({
            signIn: !this.state.signIn
        })
    }

    render() {
        const login = () => {
            return (
                <div className="modal login" >
                    <form action="#" method="POST" onSubmit={this.props.submitHandler.bind(this, this.state.email, this.state.password, this.state.signIn)}>
                        <input type="text" placeholder="Email" className="input-default" style={inputStyles} onChange={this.handleChange.bind(this,'email')}/>
                        <input type="password" placeholder="Password" name="password" className="input-default" style={inputStyles} onChange={this.handleChange.bind(this,'password')}/>
                        <button className="btn-default" type="submit">Sign in</button>
                    </form>
                    <button className="btn-default" style={{ marginTop: '15px', width: '102px' }} onClick={this.changeType.bind(this)}>Register</button>
                </div>
            )
        };

        const register = () => {
            return (
                <div className="modal register">
                    <form action="#" method="POST" onSubmit={this.props.submitHandler.bind(this, this.state.email, this.state.password, this.state.passwordConfirm, this.state.signIn)}>
                        <input type="text" placeholder="Email" className="input-default" style={inputStyles} onChange={this.handleChange.bind(this,'email')}/>
                        <input type="password" placeholder="Password" name="password" className="input-default" style={inputStyles} onChange={this.handleChange.bind(this,'password')}/>
                        <input type="password" placeholder="Confirm password" name="password_confirm" className="input-default" style={inputStyles} onChange={this.handleChange.bind(this,'passwordConfirm')}/>
                        <button className="btn-default" type="submit">Register</button>
                    </form>
                    <button className="btn-default" style={{ marginTop: '15px', width: '102px' }} onClick={this.changeType.bind(this)}>Sign in</button>
                </div>
            )
        };
        return (
            <div className="Auth-Modal" style={componentStyles}>
                <div className="modal-group" style={modalStyles}>
                    { this.state.signIn ? login() : register() }
                </div>
            </div>
        )
    }
};

export default AuthModal;