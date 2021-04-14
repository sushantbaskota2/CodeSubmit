import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Nav from '../components/Nav';
import { userLogin, createUser } from '../actions/index';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts, ToastProvider } from 'react-toast-notifications';
import axios from '../utils/axios';
// import { useLoginStatus } from '../hooks';
import { UserType, LoginType } from '../utils/types';
import { CLIENT_LOGIN } from '../actions/types';
import { Facebook } from 'react-content-loader';

// const ToastButton = () => {
//     const { addToast } = useToasts();
//     return (
//         <button
//             onClick={() => {
//                 return addToast('Aayo hai kanxa', { appearance: 'error', autoDismiss: true });
//             }}
//         />
//     );
// };

const LoginButton = ({
    loginType,
    userType,
    confirm,
    emailAddress,
    password,
    dispatch,
    router,
    name,
    setloginType
}: any) => {
    const { addToast } = useToasts();
    return (
        <input
            className='field login-submit'
            type='button'
            value={loginType}
            onClick={
                loginType === LoginType.Login ? (
                    () =>
                        userLogin({
                            email: emailAddress,
                            password,
                            dispatch,
                            router,
                            toast: addToast
                        })
                ) : (
                    () =>
                        createUser({
                            email: emailAddress,
                            password,
                            confirm,
                            instructor: userType === UserType.Instructor,
                            name,
                            toast: addToast,
                            setloginType
                        })
                )
            }
        />
    );
};

const login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [ loginType, setloginType ] = useState<LoginType.Login | LoginType.SignUp>(LoginType.Login);
    const [ userType, setuserType ] = useState<UserType>(UserType.Student);
    const [ emailAddress, setemailAddress ] = useState<string>('');
    const [ name, setname ] = useState<string>('');
    const [ password, setpassword ] = useState<string>('');
    const [ confirmPassword, setconfirmPassword ] = useState<string>('');
    const state: any = useSelector((state) => state);
    const [ loading, setloading ] = useState(true);

    useEffect(() => {
        if (!state.client.isLoggedIn) {
            const token = localStorage.getItem('token');
            if (!token) {
                setloading(false);
                return;
            }
            (async function handleLogin() {
                const { data } = await axios.get('/users/me', { headers: { Authorization: `Bearer ${token}` } });
                if (data) {
                    dispatch({ type: CLIENT_LOGIN, payload: data });
                    router.push(data.instructor ? UserType.Instructor : UserType.Student);
                }
                setloading(false);
            })();
        } else {
            router.push(state.client.user.type ? UserType.Instructor : UserType.Student);
        }
    }, []);

    if (loading) {
        return <Facebook uniqueKey={'hero'} />;
    }

    return (
        <div className='MainPage'>
            <Nav />
            <div className='container'>
                <div className='login-card'>
                    <span style={{ fontWeight: 900, fontSize: '3rem', color: 'teal' }}>CodeSubmit</span>
                    <div className='login-form'>
                        {loginType === LoginType.SignUp && (
                            <input
                                className='field'
                                type='text'
                                placeholder='Name'
                                value={name}
                                onChange={({ target: { value } }) => {
                                    setname(value);
                                }}
                            />
                        )}
                        <input
                            className='field'
                            type='email'
                            placeholder='Email Address'
                            value={emailAddress}
                            onChange={({ target: { value } }) => {
                                setemailAddress(value);
                            }}
                        />

                        <input
                            className='field'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={({ target: { value } }) => {
                                setpassword(value);
                            }}
                        />
                        {loginType === LoginType.SignUp && (
                            <input
                                className='field'
                                type='password'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={({ target: { value } }) => {
                                    setconfirmPassword(value);
                                }}
                            />
                        )}

                        {loginType === LoginType.SignUp && (
                            <div className='field'>
                                <span style={{ marginBottom: '1rem', fontWeight: 700 }}>User Type</span>
                                <br />
                                <div className='radio-container'>
                                    <input
                                        type='radio'
                                        name='instructor'
                                        value={UserType.Instructor}
                                        checked={userType === UserType.Instructor}
                                        onChange={({ target: { value } }) => {
                                            setuserType(
                                                value === UserType.Instructor ? UserType.Instructor : UserType.Student
                                            );
                                        }}
                                    />
                                    <span style={{ paddingLeft: '2rem' }}>Instructor</span>
                                </div>
                                <br />
                                <div className='radio-container'>
                                    <input
                                        type='radio'
                                        name='instructor'
                                        value={UserType.Student}
                                        checked={userType === UserType.Student}
                                        onChange={({ target: { value } }) => {
                                            setuserType(
                                                value === UserType.Instructor ? UserType.Instructor : UserType.Student
                                            );
                                        }}
                                    />
                                    <span style={{ paddingLeft: '2rem' }}>Student</span>
                                </div>
                            </div>
                        )}
                        {/* <ToastButton /> */}
                        <LoginButton
                            emailAddress={emailAddress}
                            userType={userType}
                            router={router}
                            dispatch={dispatch}
                            password={password}
                            loginType={loginType}
                            name={name}
                            setloginType={setloginType}
                            confirm={confirmPassword}
                        />
                        {LoginType.SignUp === loginType ? (
                            <span className='field alternate'>
                                Have an Account?{' '}
                                <span
                                    className='active'
                                    onClick={() => {
                                        setloginType(LoginType.Login);
                                    }}
                                >
                                    Login
                                </span>
                            </span>
                        ) : (
                            <span className='field alternate'>
                                Need an Account?{' '}
                                <span className='active' onClick={() => setloginType(LoginType.SignUp)}>
                                    Sign Up
                                </span>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default login;
