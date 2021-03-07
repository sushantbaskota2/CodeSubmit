import React, { useState, useEffect, Fragment } from 'react';
import * as Icons from 'react-feather';
import Problems from '../../components/Problems';
import Courses from '../../components/instructors/Courses';
import Nav from '../../components/Nav';
import { Tabs, Navigation } from '../../utils/types';
interface InstructorProps {}

// const Overview = () => {
//     return (
//         <div className='profile-info'>
//             <div className='profile-card'>
//                 <div className='titlebar'>Profile</div>
//             </div>
//             <div className='courses-problems'>
//                 <div className='courses'>
//                     <div className='titlebar'>Courses</div>
//                     <div className='each-course'>
//                         <div className='course'>Software Engineering</div>
//                         <div className='course'>Software Engineering</div>
//                     </div>
//                 </div>
//                 <div className='problems'>
//                     <div className='titlebar'>Problems</div>
//                     <div className='each-course'>
//                         <div className='course'>Palindrome Problem</div>
//                         <div className='course'>Anagram Problem</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

const Submissions = () => {
    return <Fragment />;
};

let TabNav: Navigation = {
    [Tabs.PROBLEMS]: <Problems />,
    [Tabs.COURSES]: <Courses />,
    [Tabs.SUBMISSIONS]: <Submissions />
};

const instructor = (props: InstructorProps) => {
    const [ activeTab, setactiveTab ] = useState<any>(Tabs.COURSES);
    useEffect(() => {
        const tab = localStorage.getItem('tab');
        if (tab && tab !== activeTab) {
            setactiveTab(tab);
        }
    }, []);

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
