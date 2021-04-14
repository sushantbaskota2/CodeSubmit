import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import Nav from '../../components/Nav';
import Courses from '../../components/students/Courses';
import Problems from '../../components/Problems';
import { Navigation, UserType } from '../../utils/types';
import { useLoginStatus } from '../../hooks';
import { useSelector } from 'react-redux';
import { Facebook } from 'react-content-loader';
import Submission from '../../components/students/Submission';
import { useRouter } from 'next/router';

enum Tabs {
    COURSES = 'Courses',
    PROBLEMS = 'Problems',
    // GRADES = 'Grades',
    SUBMISSIONS = 'Submissions'
}

const student = () => {
    const [ activeTab, setactiveTab ] = useState(Tabs.COURSES);
    const state: any = useSelector((state) => state);
    const { userType } = useLoginStatus(state);
    const router = useRouter();
    const [ studentData, setstudentData ] = useState<any>({
        courses: null,
        problems: null,
        submissions: null
    });
    let TabNav: Navigation = {
        [Tabs.PROBLEMS]: <Problems submissions={studentData.submissions} problems={studentData.problems} student />,
        [Tabs.COURSES]: <Courses courses={studentData.courses} student />,
        [Tabs.SUBMISSIONS]: <Submission submissions={studentData.submissions} students />
    };

    useEffect(
        () => {
            async function getStudentData(auth: any) {
                const [ { data: problems }, { data: courses }, { data: submissions } ] = await Promise.all([
                    axios.get('/problems/student', auth),
                    axios.get(`/courses/student`, auth),
                    axios.get('/submissions/student', auth)
                ]);
                setstudentData({ problems, courses, submissions });
            }

            if (state.client.isLoggedIn) {
                const token = localStorage.getItem('token');
                getStudentData({
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
        },
        [ state ]
    );
    if (state.client.isLoggedIn === null) {
        return <Facebook uniqueKey='hero' />;
    }
    if (userType === UserType.Instructor) {
        router.replace('/instructor');
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

export default student;
