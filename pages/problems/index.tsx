import React from 'react';
import dynamic from 'next/dynamic';
const NewProblem = dynamic(() => import('../../components/instructors/NewProblem'), { ssr: false });
import Nav from '../../components/Nav';
import { useLoginStatus } from '../../hooks';
import { useSelector } from 'react-redux';

interface Props {}

const index = (props: Props) => {
    const state = useSelector((state) => state);
    const { isLoggedIn } = useLoginStatus(state);
    return (
        <div className='MainPage'>
            <Nav loggedIn={isLoggedIn} />
            <div className='container'>
                <NewProblem />
            </div>
        </div>
    );
};

export default index;
