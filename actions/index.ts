import axios from '../utils/axios'
import {CLIENT_LOGIN, CLIENT_SIGNOUT} from './types'
import {LoginData, UserType, LoginType} from '../utils/types'
import validator from 'validator'

export const userLogin = async ({ email, password, dispatch , router, toast}: LoginData) => {
    try{
        if(!validator.isEmail(email)){
            toast('Enter a valid email', {appearance:'warning', autoDismiss:true})
            return;
        } else if(password.length<=6){
            toast('Password needs to be more than 6 characters', {appearance:'warning', autoDismiss:true})
            return;
        }
    const { data } = await axios.post('/users/login', { email, password });
    localStorage.setItem('token', data.token);
    if(data.user.instructor){
        router.push(UserType.Instructor)
    }else{
        router.push(UserType.Student)
    }
    
    dispatch({ type: CLIENT_LOGIN, payload: data.user });
}catch(e){
    toast('Could not login',{ appearance: 'error', autoDismiss: true })
}
};

export const createUser = async ({email, password, confirm,  name, instructor, toast, setloginType}: any)=>{
    try{
        if(name===''){
            toast('Enter a valid name', {appearance:'warning', autoDismiss:true})
        }
        else if(!validator.isEmail(email)){
            toast('Enter a valid email', {appearance:'warning', autoDismiss:true})
        }
        else if(password!==confirm){
            toast('Password and Confirm passwords dont match', {appearance:'warning', autoDismiss:true})
        }
        else if(password.length<=6){
            toast('Password needs to be more than 6 characters', {appearance:'warning', autoDismiss:true})
        }else{
            await axios.post('/users', {email, password, name,instructor})
            toast('Created account successfully. Now you can login', {appearance:'success', autoDismiss:true})
            setloginType(LoginType.Login)
        }
   
}catch(e){
    console.log(e.message);
    
    toast('Could not create an account', { appearance: 'error', autoDismiss: true });
}
}

export const userLogout = async ({token,router, dispatch}:any)=>{
    
    await axios.post('/users/logout', {}, {headers: {Authorization: `Bearer ${token}`}})
    localStorage.removeItem('token');
    localStorage.removeItem('tab')
    router.replace('/login')
    dispatch({type:CLIENT_SIGNOUT})
}