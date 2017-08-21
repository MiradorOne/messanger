import * as firebase from 'firebase';
import _ from 'lodash';

export function getUnreadMessages(currentUserID) {
    return dispatch => {

        firebase.database().ref('/conversations').once('value', (f_snapshot) => {
        }).then((f_snapshot) => {
            
            firebase.database().ref(`/users/${currentUserID}/conversations/`).once('value', (s_snapshot) => {
                const allConversations = f_snapshot.val();                
                const userConversation = s_snapshot.val();

                const filteredConversations = _.reduce(userConversation, function(result, value, key) {
                    return _.isEqual(value, allConversations[key]) ?
                        result : _.assign(result,{[key]: allConversations[value]});
                }, {});

                let unreadMessages = [];
                
                _.filter(filteredConversations, function(object, conv_key) {
                    _.forOwn(object.messages, (val, key) => {
                        if (val.type) {
                            unreadMessages.push({
                                [conv_key]: object
                            });
                        }
                    });
                })
                dispatch({type: 'GET_UNREAD_MESSAGES', payload: unreadMessages})
            })
        })
    }
}

export function getAllMessages (currentUserID) {
    return dispatch => {
        firebase.database().ref('/conversations').once('value', (f_snapshot) => {
        }).then((f_snapshot) => {
            
            firebase.database().ref(`/users/${currentUserID}/conversations/`).once('value', (s_snapshot) => {
                const allConversations = f_snapshot.val();                
                const userConversation = s_snapshot.val();

                const filteredConversations = _.reduce(userConversation, function(result, value, key) {
                    return _.isEqual(value, allConversations[key]) ?
                        result : _.assign(result,{[key]: allConversations[value]});
                }, {});

                dispatch({type: 'GET_ALL_MESSAGES', payload: filteredConversations})
            })
        })
    }
}