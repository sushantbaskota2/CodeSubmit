import axios from '../utils/axios'
import {CLIENT_LOGIN, CLIENT_SIGNOUT} from './types'
import {LoginData} from '../utils/types'
export const userLogin = async ({ email, password, dispatch }: LoginData) => {
    const { data } = await axios.post('/users/login', { email, password });
    localStorage.setItem('token', data.token);
    dispatch({ type: CLIENT_LOGIN, payload: data.user });
};

export const userLogout = async ({token,router, dispatch}:any)=>{
    await axios.post('/users/logout', {}, {headers: {Authorization: `Bearer ${token}`}})
    router.push('login')
    dispatch({type:CLIENT_SIGNOUT})
}