export function ui (state = {
    messagesFilter: 'all',
    isFeatching: false
}, action) {
    switch (action.type) {
        case 'IS_FEATCHING' : {
            return {
                ...state,
                isFeatching: action.payload
            }
        }
        case 'CHANGE_MESSAGES_TYPE_TO_UNREAD' : {
            return {
                ...state,
                messagesFilter: action.payload
            }
        }
        case 'CHANGE_MESSAGES_TYPE_TO_ALL': {
            return {
                ...state,
                messagesFilter: action.payload
            }
        }
        default: return state
    } 
}