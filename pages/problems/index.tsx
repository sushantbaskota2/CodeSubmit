import React from 'react';
import dynamic from 'next/dynamic';
const NewProblem = dynamic(() => import('../../components/instructors/NewProblem'), { ssr: false });
import Nav from '../../components/Nav';

interface Props {}

const index = (props: Props) => {
    return (
        <div className='MainPage'>
            <Nav />
            <div className='container'>
                <NewProblem />
            </div>
        </div>
    );
};

export default index;
