export function ui (state = {
    messagesFilter: 'all'
}, action) {
    switch (action.type) {
        case 'CHANGE_MESSAGES_TYPE_TO_UNREAD' : {
            return {
                messagesFilter: action.payload
            }
        }
        case 'CHANGE_MESSAGES_TYPE_TO_ALL': {
            return {
                messagesFilter: action.payload
            }
        }
        default: return state
    } 
}