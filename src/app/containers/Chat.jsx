import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChatTopBar from '../components/ChatTopBar/ChatTopBar';
import EnterMessage from '../components/EnterMessage/EnterMessage';
import Message from '../components/_common/Message';
import Loading from '../components/_common/Loading';
import * as firebase from 'firebase';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import '../../styles/containers/Chat.css';

export default class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            isLoading: false,
        }
    }

    componentDidUpdate() {
        window.requestAnimationFrame(() => {
            const node = ReactDOM.findDOMNode(this.refs['scroll']);
            const messageNode = _.last(node.childNodes);
            node.scrollTop = node.scrollHeight;
        })
    }

    shouldComponentUpdate(nextProps, state) {
        if (_.isEqual(this.props, nextProps) && _.isEqual(this.state, state)) {
            return false;
        } else {
            return true;                   
        }
    
    }

    getMessages(convID) {
        let self = this;
        self.setState({
            isLoading: true 
        })

        if (convID && convID !== 'null') {
            const ref = firebase.database().ref(`/conversations/${convID}/messages`);
            ref.on('value',function(snapshot) {
                const object = snapshot.val();

                if (object && object !== "null") {
                    self.setState({
                        messages: object,
                        isLoading: false
                    })
                } else {
                    self.setState({
                        messages: [],
                    })
                }

            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeConversation !== this.props.activeConversation) {
            this.getMessages(nextProps.activeConversation);
            setTimeout(() => { 
                this.setState({isLoading: false})
            },1500)
        }
        this.getUsersImages(nextProps)        
    }

    getUsersImages(nextProps) {
        
        firebase.database().ref(`/users/${nextProps.currentUser}/picture/`).once('value', (snapshot) => {
            let pictureKey = '';
            let currentUserImage = '';        
			if (snapshot.val()) {
                pictureKey = Object.keys(snapshot.val())[0]
                currentUserImage = snapshot.val()[pictureKey].downloadURL;
                this.setState({
                    currentUserImage: currentUserImage
                })
            } else {
                this.setState({
                    currentUserImage: null
                })
            }
        })

        firebase.database().ref(`/users/${nextProps.selectedUser}/picture/`).once('value', (snapshot) => {
            let pictureKey = '';
            let selectedUserImage = '';        
			if (snapshot.val()) {
                pictureKey = Object.keys(snapshot.val())[0]
                selectedUserImage = snapshot.val()[pictureKey].downloadURL;
                this.setState({
                    friendPictureURL: selectedUserImage 
                })
            } else {
                this.setState({
                    friendPictureURL: null
                })
            }
        })

    }

    render() {
        const messages = Object.keys(this.state.messages).map((value,i) => {
            return (
                <Message key={i}
                         data-key={i} 
                         friendImage={this.state.friendPictureURL} 
                         currentUserImage={this.state.currentUserImage} 
                         data={this.state.messages[value]}/>
            )
        });

        const firstMessage = () => {
            if (this.state.isLoading) {
                return (
                    <Loading />
                )
            } else {
                return (
                    <p>Send your first message</p>
                )
            }
        }
            
        return (
            <div className="container Chat">
            
                <ChatTopBar activeConversation={this.props.activeConversation}/>

                    <div className="messages" style={{minHeight: 'calc(100% - 145px)', marginBottom: '15px'}} ref='scroll'>

                        {messages.length > 0  ? 
                        
                        <ReactCSSTransitionGroup 
                            transitionName="fade-in"
                            transitionAppear={true}
                            transitionEnter={false}
                            transitionLeave={false}                            
                            transitionAppearTimeout={400}
                        >

                            {messages} 
                    
                        </ReactCSSTransitionGroup>

                        : (<div style={{
                            position: 'absolute',
                            fontSize:'16px', 
                            textTransform:'uppercase',
                            top: '50%',
                            left: '50%',
                            transform: 'translateY(-50%) translateX(-50%)'
                        }}>{firstMessage()}</div>)}

                    </div>
          
                {messages.length > 0 && this.props.activeConversation ? 
                
                <EnterMessage 
                    currentConversation={this.props.activeConversation}/> 
                : 
                <EnterMessage 
                    currentConversation={this.props.activeConversation}/>}
            </div>
        )
    }
}