import React from 'react';
import { useRouter } from 'next/router';
import { Bell, Power } from 'react-feather';
import { useDispatch } from 'react-redux';
import { userLogout } from '../actions';
interface Props {}

const Nav = (props: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = window && localStorage.getItem('token');

    return (
        <nav className='navbar'>
            <div className='title'>
                <span>CodeSubmit</span>
            </div>
            <div className='action'>
                <Bell fill='white' />
                <div className='profile' />
                <div className='logout-button' onClick={() => userLogout({ token, router, dispatch })}>
                    <span>Log Out</span>
                    <Power />
                </div>
            </div>
        </nav>
    );
};

export default Nav;
