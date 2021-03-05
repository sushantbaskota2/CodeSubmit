import React from 'react';
import { Bell } from 'react-feather';
interface Props {}

const Nav = (props: Props) => {
    return (
        <nav className='navbar'>
            <div className='title'>
                <span>CodeSubmit</span>
            </div>
            <div className='action'>
                <Bell fill='white' />
                <div className='profile' />
            </div>
        </nav>
    );
};

export default Nav;
