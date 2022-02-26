import createDataContext from "./createDataContext";
import tracker from '../api/tracker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from "../navigationRef";
const authReducer = (state, action) => {
    switch (action.type) {
        case 'err_msg':
            return { ...state, errorMessage: action.payload }
        case 'signin':
            return { errorMessage: '', token: action.payload }
        case 'clear_error':
            return { ...state, errorMessage: '' }
        case 'signout':
            return {token:null}
        default:
            return state
    }
}
const clearError = (dispatch) => {
    return () => {
        dispatch({ type: 'clear_error' })
    }
}
const tryLocalSignIn = (dispatch)=>{
    return async ()=>{
        const token = await AsyncStorage.getItem('token')
        if(token){
            dispatch({type:'signin',payload:token})
            navigate('TrackList')
        }else{
            navigate('loginFlow')
        }
    }
}
const signUp = (dispatch) => {
    return async ({ email, password }) => {
        try {
            // console.log(email)
            // console.log(password)
            const response = await tracker.post('/signUp', { email, password })
            console.log("hoooray")
            // dispatch({type:'err_msg',payload:""})
            // console.log(response.data)
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({ type: 'signin', payload: response.data.token })
            navigate('TrackList')
        } catch (err) {
            console.log(err.response.data)
            dispatch({ type: 'err_msg', payload: "Something went wrong" })
        }
    }
}
const signIn = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await tracker.post('/signIn', { email, password })
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({ type: 'signin', payload: response.data.token })
            navigate('TrackList')

        } catch (err) {
            dispatch({ type: 'err_msg', payload: "Something went wrong" })
        }

    }
}
const signOut = (dispatch) => {
    return async() => {
        AsyncStorage.removeItem('token')
        dispatch({type:'signout'})
        navigate('loginFlow')
    }
}
export const { Provider, Context } = createDataContext(authReducer, { signIn, signOut, signUp, clearError,tryLocalSignIn }, { token: null, errorMessage: '' })