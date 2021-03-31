import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import Nav from '../../components/Nav';
import Courses from '../../components/students/Courses';
import Problems from '../../components/Problems';
import { Navigation } from '../../utils/types';
import { useLoginStatus } from '../../hooks';
import { useSelector } from 'react-redux';
import { Facebook } from 'react-content-loader';
import Submission from '../../components/students/Submission';
interface Props {}
interface CourseProps {}

enum Tabs {
    COURSES = 'Courses',
    PROBLEMS = 'Problems',
    // GRADES = 'Grades',
    SUBMISSIONS = 'Submissions'
}

const student = (props: Props) => {
    const [ activeTab, setactiveTab ] = useState(Tabs.COURSES);
    const state: any = useSelector((state) => state);
    const { isLoggedIn } = useLoginStatus(state);
    const [ studentData, setstudentData ] = useState<any>({
        courses: null,
        problems: null,
        submissions: null
    });
    let TabNav: Navigation = {
        [Tabs.PROBLEMS]: <Problems problems={studentData.problems} student />,
        [Tabs.COURSES]: <Courses courses={studentData.courses} student />,
        [Tabs.SUBMISSIONS]: <Submission submissions={studentData.submissions} students />
    };

    useEffect(
        () => {
            async function getStudentData(auth: any) {
                const [ { data: problems }, { data: courses }, { data: submissions } ] = await Promise.all([
                    axios.get('/problems/student', auth),
                    axios.get(`/courses/student`, auth),
                    axios.get('/submissions')
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
