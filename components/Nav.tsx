import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Power } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../actions';
// interface Props {
//     loggedIn: boolean | null;
// }

const Nav = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const state: any = useSelector((state) => state);
    const [ token, settoken ] = useState<string | null>('');

    useEffect(() => {
        settoken(localStorage.getItem('token'));
    }, []);

    return (
        <nav className='navbar'>
            <div
                className='title'
                onClick={() => {
                    router.push('/');
                }}
            >
                <span>CodeSubmit</span>
            </div>
            <div className='action'>
                {/* <Bell fill='white' /> */}
                <div className='profile' />
                {state.client.user && (
                    <div className='logout-button' onClick={() => userLogout({ token, router, dispatch })}>
                        <span>Log Out</span>
                        <Power />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Nav;
