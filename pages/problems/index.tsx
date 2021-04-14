import React from 'react';
import dynamic from 'next/dynamic';
const NewProblem = dynamic(() => import('../../components/instructors/NewProblem'), { ssr: false });
import Nav from '../../components/Nav';
import { useLoginStatus } from '../../hooks';
import { useSelector } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { UserType } from '../../utils/types';

// interface Props {}

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
                    <NewProblem />
                </ToastProvider>
            </div>
        </div>
    );
};

export default index;
