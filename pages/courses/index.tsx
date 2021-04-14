import React from 'react';
import NewCourse from '../../components/instructors/NewCourse';
import Nav from '../../components/Nav';
import { useLoginStatus } from '../../hooks';
import { useSelector } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import { UserType } from '../../utils/types';
import { useRouter } from 'next/router';

const index = () => {
    const state = useSelector((state) => state);
    const { userType } = useLoginStatus(state);
    const router = useRouter();
    if (userType === UserType.Student) {
        router.replace('/student');
        return <div />;
    }
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
