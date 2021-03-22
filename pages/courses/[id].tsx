import React from 'react';
import Nav from '../../components/Nav';
import { useLoginStatus } from '../../hooks/index';
import { useSelector } from 'react-redux';
interface Props {}

const Course = (props: Props) => {
    const state: any = useSelector((state) => state);
    const { isLoggedIn } = useLoginStatus(state);
    return (
        <div className='MainPage'>
            <Nav loggedIn={isLoggedIn} />
            <div className='container'>
                <div className='title'>
                    <span>Course ID</span>
                    <span>Course Name</span>
                </div>
                <div className='main'>
                    <div className='header'>Currently enrolled Students</div>
                    <div>
                        <div>Sushant Baskota</div>
                        <div>Mushant Baskota</div>
                        <div>Gushant Baskota</div>
                    </div>
                </div>
                <div>
                    <div />
                    <div />
                </div>
            </div>
        </div>
    );
};

export default Course;
