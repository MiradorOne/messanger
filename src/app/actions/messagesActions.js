import * as firebase from 'firebase';
import _ from 'lodash';

export function getUnreadMessages(currentUserID, userEmail) {
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

                let unreadMessages = {};
                let messagesCounter = 0;
                
                _.filter(filteredConversations, function(object, conv_key) {
                    _.forOwn(object.messages, (val, key) => {
                        if (val.type && val.from !== userEmail) {
                            messagesCounter++;
                            unreadMessages[conv_key] = object;
                        }
                    });
                })
                dispatch({type: 'GET_UNREAD_MESSAGES', payload: unreadMessages})                
            })
        })
    }
}

export function countUnreadMessages(currentUserID, userEmail) {
    return dispatch => {
        
        firebase.database().ref('/conversations').on('value', (f_snapshot) => {
            firebase.database().ref(`/users/${currentUserID}/conversations/`).on('value', (s_snapshot) => {
                const allConversations = f_snapshot.val();                
                const userConversation = s_snapshot.val();

                const filteredConversations = _.reduce(userConversation, function(result, value, key) {
                    if (allConversations && allConversations[key]) {
                        return _.isEqual(value, allConversations[key]) ?
                            result : _.assign(result,{[key]: allConversations[value]});
                    }
                }, {});

                let messagesCounter = 0;
                
                _.filter(filteredConversations, function(object, conv_key) {
                    _.forOwn(object.messages, (val, key) => {
                        if (val.type && val.from !== userEmail) {
                            messagesCounter++;
                        }
                    });
                })
                dispatch({type: 'COUNT_UNREAD_MESSAGES', payload: messagesCounter})    
            })
        })
    }
}

export function getAllMessages (currentUserID) {
    return dispatch => {
        dispatch({type: 'IS_FEATCHING', payload: true});

        firebase.database().ref('/conversations').on('value', (f_snapshot) => {
            firebase.database().ref(`/users/${currentUserID}/conversations/`).on('value', (s_snapshot) => {
                const allConversations = f_snapshot.val();                
                const userConversation = s_snapshot.val();

                const filteredConversations = _.reduce(userConversation, function(result, value, key) {
                    return _.isEqual(value, allConversations[key]) ?
                        result : _.assign(result,{[key]: allConversations[value]});
                }, {});

                dispatch({type: 'GET_ALL_MESSAGES', payload: filteredConversations})
                dispatch({type: 'IS_FEATCHING', payload: false});
        
            })
        })
    }
}