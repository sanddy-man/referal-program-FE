const axios = require('axios')

// Actions
const SET_INVITES = 'redux/invite/SET_INVITES'
const LOAD_INVITES = 'redux/invite/LOAD_INVITES'
const SET_CREATE_INVITE_ERROR = 'redux/invite/SET_CREATE_INVITE_ERROR'

// Reducer
const initialState = {
    invites: [],
    isFetching: false,
    createInviteError: null,
}

const invite = (state = initialState, action) => {
    switch (action.type) {
        case SET_INVITES:
            return {
                ...state,
                invites: action.payload,
                isFetching: false,
            }
        case LOAD_INVITES:
            return {
                ...state,
                isFetching: true,
                invites: []
            }
        case SET_CREATE_INVITE_ERROR:
            return {
                ...state,
                isFetching: false,
                createInviteError: action.payload
            }
        default:
            return state
    }
}

export default invite


// Action Creators
const setInvites = invites => {
    return {
        type: SET_INVITES,
        payload: invites
    }
}

const setCreateInviteError = error => {
    return {
        type: SET_CREATE_INVITE_ERROR,
        payload: error
    }
}

const getInvites = (access_token, userId) => dispatch => {
    axios({
        method: 'get',
        url: `http://localhost:3001/api/private/invites?userId=${userId}`,
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            // handle success
            dispatch(setInvites(response.data.invites))
        })
        .catch(function (error) {
            // handle error
            console.log(error.response)

        })
}

const createInvite = (access_token, userId, email) => dispatch => {
    axios({
        method: 'post',
        url: 'http://localhost:3001/api/private/invites/create',
        data: {
            email,
            userId,
        },
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            // handle success
            dispatch(getInvites(access_token, userId))
        })
        .catch(function (error) {
            // handle error
            dispatch(setCreateInviteError(error.response.msg))
        })
}

export const actions = {
    getInvites,
    createInvite,
}
