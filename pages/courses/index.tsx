import React from 'react';
import NewCourse from '../../components/instructors/NewCourse';
import Nav from '../../components/Nav';
import { useLoginStatus } from '../../hooks';
import { useSelector } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';

interface Props {}

const index = (props: Props) => {
    const state = useSelector((state) => state);
    const { isLoggedIn } = useLoginStatus(state);
    return (
        <div className='MainPage'>
            <Nav loggedIn={isLoggedIn} />
            <div className='container'>
                <ToastProvider>
                    <NewCourse />
                </ToastProvider>
            </div>
        </div>
    );
};

export default index;
