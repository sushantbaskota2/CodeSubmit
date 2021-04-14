import React, { useState, useEffect } from 'react';

import Problems from '../../components/Problems';
import Courses from '../../components/instructors/Courses';
import Submission from '../../components/instructors/Submission';
import Nav from '../../components/Nav';
import { useSelector } from 'react-redux';
import { Tabs, Navigation, UserType } from '../../utils/types';
import { Facebook } from 'react-content-loader';
import axios from '../../utils/axios';
import { useLoginStatus } from '../../hooks';
import { useRouter } from 'next/router';

const instructor = () => {
    const state: any = useSelector((state) => state);
    const router = useRouter();
    const [ activeTab, setactiveTab ] = useState<any>(Tabs.COURSES);
    const [ instructorData, setinstructorData ] = useState<any>({
        problems: null,
        courses: null,
        submissions: null
    });
    let TabNav: Navigation = {
        [Tabs.PROBLEMS]: <Problems problems={instructorData.problems} />,
        [Tabs.COURSES]: <Courses courses={instructorData.courses} />,
        [Tabs.SUBMISSIONS]: <Submission submissions={instructorData.submissions} />
    };
    const { userType } = useLoginStatus(state);

    useEffect(() => {
        const tab = localStorage.getItem('tab');
        if (tab && tab !== activeTab) {
            setactiveTab(tab);
        }
    }, []);

    useEffect(
        () => {
            async function getInstructorData(auth: any) {
                const [ { data: problems }, { data: courses }, { data: submissions } ] = await Promise.all([
                    axios.get('/instructor/problems', auth),
                    axios.get(`/courses/${state.client.user._id}`, auth),
                    axios.get('/instructor/submissions', auth)
                ]);

                setinstructorData({ problems, courses, submissions });
            }

            if (state.client.isLoggedIn) {
                const token = localStorage.getItem('token');
                getInstructorData({
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (userType === UserType.Student) {
                    router.replace('/student');
                }
            }
        },
        [ state ]
    );

    useEffect(
        () => {
            console.log('====================================');
            console.log(state);
            console.log('====================================');
        },
        [ state ]
    );

    if (state.client.isLoggedIn === null) {
        return <Facebook uniqueKey='hero123' />;
    }

    console.log('====================================');
    console.log(userType);
    console.log('====================================');
    if (userType === UserType.Student) {
        return <div />;
    }
    return (
        <div className='MainPage'>
            <Nav />
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
