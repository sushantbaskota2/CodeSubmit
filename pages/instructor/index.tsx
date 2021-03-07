import React, { useState, useEffect, Fragment } from 'react';
import * as Icons from 'react-feather';
import Problems from '../../components/Problems';
import Courses from '../../components/instructors/Courses';
import dynamic from 'next/dynamic';
import Nav from '../../components/Nav';
import { useLoginStatus } from '../../hooks';
import { useSelector } from 'react-redux';
import { Tabs, Navigation } from '../../utils/types';
import { Facebook } from 'react-content-loader';
interface InstructorProps {}

const Submissions = () => {
    return <Fragment />;
};

let TabNav: Navigation = {
    [Tabs.PROBLEMS]: <Problems />,
    [Tabs.COURSES]: <Courses />,
    [Tabs.SUBMISSIONS]: <Submissions />
};

const instructor = (props: InstructorProps) => {
    const state: any = useSelector((state) => state);

    const [ activeTab, setactiveTab ] = useState<any>(Tabs.COURSES);

    const { isLoggedIn, user, userType } = useLoginStatus(state);

    useEffect(() => {
        const tab = localStorage.getItem('tab');
        if (tab && tab !== activeTab) {
            setactiveTab(tab);
        }
    }, []);

    useEffect(
        () => {
            console.log('====================================');
            console.log(state);
            console.log('====================================');
        },
        [ state ]
    );

    if (state.client.isLoggedIn === null) {
        return <Facebook />;
    }
    return (
        <div className='MainPage'>
            <Nav loggedIn={isLoggedIn} />
            <section className='container'>
                <div className='tabs'>
                    {Object.keys(Tabs).map((name) => {
                        let tabName: Tabs = Tabs[name as keyof typeof Tabs];
                        return (
                            <span
                                key={tabName}
                                onClick={() => {
                                    setactiveTab(tabName);
                                    localStorage.setItem('tab', tabName);
                                }}
                                className={`tab ${activeTab === tabName ? 'active' : ''}`}
                            >
                                {tabName}
                            </span>
                        );
                    })}
                </div>
                {activeTab && TabNav[activeTab]}
            </section>
        </div>
    );
};

export default instructor;
