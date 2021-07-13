import React, {useReducer} from 'react'
import axios from 'axios'
import authContext from './authContext'
import authReducer from './AuthReducer'

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'

const AuthState2 = (props) => {
    const initialState={
        token:localStorage.getItem('token'),
        isAthenticated:null,
        loading:true,
        user:null,
        error:null
    }

    const [state,dispatch]=useReducer(authReducer,initialState)
    

    //Load User


    //Register User
    const register = async formData=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        try{
            const res = await axios.post('/api/users',formData,config)
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            })
        }catch(err){
            dispatch({
                type:REGISTER_FAIL,
                payload:err.response.data.msg
            })
        }
    }

    //Login User


    //Logout


    //Clear Errors
   
    return (
        <authContext.Provider value={{
            token:state.token,
            isAthenticated:state.isAthenticated,
            loading:state.loading,
            user:state.user,
            error:state.error
        }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState2