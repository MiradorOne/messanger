export function getFilteredMessages (state = {}, action) {
    switch (action.type) {
        case 'GET_UNREAD_MESSAGES' : {
            return action.payload
        };
        case 'GET_ALL_MESSAGES': {
            return action.payload
        }
        default: return state
    } 
}

export function countFilteredMessages ( state = {}, action) {
    switch (action.type) {
        case 'COUNT_UNREAD_MESSAGES': {
            return {
                unread: action.payload
            }
        }
        default: return state        
    }
}