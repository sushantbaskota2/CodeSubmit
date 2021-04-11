import { useEffect} from 'react'

import {CLIENT_LOGIN} from '../actions/types'
import axios from '../utils/axios'
import { useDispatch} from 'react-redux'
import {useRouter} from 'next/router'

// type LoginStatus = {
//     isLoggedIn: boolean|null;
//     user: any;
//     userType: any
// }
export const useLoginStatus = (state:any) => {

    const dispatch = useDispatch();
    const router = useRouter()

    
    useEffect(() => {
        const token = localStorage.getItem('token');
        async function checkToken (){
            const {data} = await axios.get('/users/me',{headers: {Authorization: `Bearer ${token}`}});
            
            if(data){
                dispatch({type:CLIENT_LOGIN, payload: data})
                
            }else{
                router.replace('login')
            }
        }

        if(token!==null){
            checkToken()
        }

        return ()=>{
            
        }
        
    }, [dispatch])
useEffect(() => {
    console.log(state);
    
}, [state])
    return {isLoggedIn:state.client.isLoggedIn, user:state.client.user, userType:state.client.user?state.client.user.instructor: null};


};