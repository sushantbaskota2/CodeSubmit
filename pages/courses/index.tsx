import React from 'react';
import NewCourse from '../../components/instructors/NewCourse';
import Nav from '../../components/Nav';
import { useLoginStatus } from '../../hooks';
import { useSelector } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';

const index = () => {
    const state = useSelector((state) => state);
    useLoginStatus(state);
    return (
        <div className='MainPage'>
            <Nav />
            <div className='container'>
                <ToastProvider>
                    <NewCourse />
                </ToastProvider>
            </div>
        </div>
    );
};

export default index;
