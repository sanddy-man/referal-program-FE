import user from './user'
import counter from './counter'
import invite from './invite'
import { combineReducers } from 'redux'

export default combineReducers({
    user,
    invite,
    counter
})