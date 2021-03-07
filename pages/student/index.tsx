import React, { useState } from 'react';

import Nav from '../../components/Nav';
import Courses from '../../components/students/Courses';
import Problems from '../../components/Problems';
import { Navigation } from '../../utils/types';
import { useLoginStatus } from '../../hooks';
import { useSelector } from 'react-redux';
interface Props {}
interface CourseProps {}

enum Tabs {
    COURSES = 'Courses',
    PROBLEMS = 'Problems',
    GRADES = 'Grades',
    SUBMISSIONS = 'Submissions'
}
let TabNav: Navigation = {
    [Tabs.PROBLEMS]: <Problems />,
    [Tabs.COURSES]: <Courses />
};

const student = (props: Props) => {
    const [ activeTab, setactiveTab ] = useState(Tabs.COURSES);
    const state = useSelector((state) => state);
    const { isLoggedIn } = useLoginStatus(state);
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
