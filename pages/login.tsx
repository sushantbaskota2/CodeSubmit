import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { useToasts, ToastProvider } from 'react-toast-notifications';
interface Props {}

enum LoginType {
    Login = 'Login',
    SignUp = 'Sign Up'
}

enum UserType {
    Student = 'Student',
    Instructor = 'Instructor'
}

const ToastButton = () => {
    const { addToast } = useToasts();
    return (
        <button
            onClick={() => {
                return addToast('Aayo hai kanxa', { appearance: 'error', autoDismiss: true });
            }}
        />
    );
};
const login = (props: Props) => {
    const [ loginType, setloginType ] = useState<LoginType.Login | LoginType.SignUp>(LoginType.Login);
    const [ userType, setuserType ] = useState<UserType>(UserType.Student);
    const [ emailAddress, setemailAddress ] = useState<string>('');
    const [ name, setname ] = useState<string>('');
    const [ password, setpassword ] = useState<string>('');
    const [ confirmPassword, setconfirmPassword ] = useState<string>('');

    return (
        <div className='MainPage'>
            <Nav />
            <div className='container'>
                <ToastProvider>
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
                                                    value === UserType.Instructor
                                                        ? UserType.Instructor
                                                        : UserType.Student
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
                                                    value === UserType.Instructor
                                                        ? UserType.Instructor
                                                        : UserType.Student
                                                );
                                            }}
                                        />
                                        <span style={{ paddingLeft: '2rem' }}>Student</span>
                                    </div>
                                </div>
                            )}
                            <ToastButton />
                            <input className='field login-submit' type='button' value={loginType} />
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
                </ToastProvider>
            </div>
        </div>
    );
};

export default login;
