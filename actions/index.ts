import axios from '../utils/axios'
import {CLIENT_LOGIN, CLIENT_SIGNOUT} from './types'
import {LoginData, UserType} from '../utils/types'


export const userLogin = async ({ email, password, dispatch , router}: LoginData) => {
    const { data } = await axios.post('/users/login', { email, password });
    localStorage.setItem('token', data.token);
    if(data.user.instructor){
        router.push(UserType.Instructor)
    }else{
        router.push(UserType.Student)
    }
    
    dispatch({ type: CLIENT_LOGIN, payload: data.user });
};

export const userLogout = async ({token,router, dispatch}:any)=>{
    await axios.post('/users/logout', {}, {headers: {Authorization: `Bearer ${token}`}})
    router.push('login')
    dispatch({type:CLIENT_SIGNOUT})
}