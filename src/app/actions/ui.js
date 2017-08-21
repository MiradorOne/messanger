export function changeMessageTypeToUnread() {
    return dispatch => {
        dispatch({type: 'CHANGE_MESSAGES_TYPE_TO_UNREAD', payload: 'unread'})
    }
}

export function changeMessageTypeToAll() {
    return dispatch => {
        dispatch({type: 'CHANGE_MESSAGES_TYPE_TO_ALL', payload: 'all'})        
    }
}