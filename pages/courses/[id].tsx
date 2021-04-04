import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import { useLoginStatus } from '../../hooks/index';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from '../../utils/axios';
import { Plus, X } from 'react-feather';
interface Props {}

const Course = (props: Props) => {
    const state: any = useSelector((state) => state);
    const { isLoggedIn } = useLoginStatus(state);
    const router = useRouter();
    const { id } = router.query;
    const [ course, setcourse ] = useState<any>(null);
    const [ query, setquery ] = useState<string>('');
    const [ selectedEmails, setselectedEmails ] = useState<any>([]);
    const [ enrolledStudents, setenrolledStudents ] = useState<any>(null);
    const [ users, setusers ] = useState([]);
    const [ list, setlist ] = useState([]);
    console.log('====================================');
    console.log(id);
    console.log('====================================');
    useEffect(() => {
        async function fetchUsers() {
            const { data: users } = await axios.get(`/users/students`);
            setusers(users);
        }
        async function fetchData() {
            const { data: course } = await axios.get(`/course/${id}`);
            console.log('====================================');
            console.log(course);
            console.log('====================================');
            setcourse(course);
        }
        async function fetchEnrolled() {
            const { data: enrolled } = await axios.get(`/courses/${id}/students`);
            setenrolledStudents(enrolled);
        }

        fetchData();
        fetchUsers();
        fetchEnrolled();
    }, []);

    useEffect(
        () => {
            //Filter users to exclude already selected emails
            let avail = users.filter((user: any) => {
                return !selectedEmails.includes(user.email) && !user.courses.includes(id);
            });

            setlist(avail);
        },
        [ selectedEmails, users ]
    );

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
                    <div className='row-split'>
                        <div className='student-list'>
                            {enrolledStudents !== null &&
                                enrolledStudents.map((student: any) => (
                                    <div className='student-item'>{student.name}</div>
                                ))}
                        </div>
                        <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div className='add-student-container'>
                                <div className='add-input-container'>
                                    <input
                                        type='text'
                                        value={query}
                                        onChange={(e) => {
                                            setquery(e.target.value);
                                        }}
                                    />
                                    <input type='button' value='Enroll' className='enroll-button' />
                                </div>
                                <div className='selected-students'>
                                    {selectedEmails.map((email) => (
                                        <div className='selected-student'>
                                            <span>{email}</span>
                                            <X
                                                color='red'
                                                size='12px'
                                                onClick={() => {
                                                    const emails = selectedEmails.filter((e) => e !== email);
                                                    setselectedEmails(emails);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='student-items' style={{ overflowY: 'scroll', height: '100%' }}>
                                {list.map((student: any) => (
                                    <div className='student-item'>
                                        <span>{student.name}</span>
                                        <Plus
                                            onClick={() => {
                                                setselectedEmails([ ...selectedEmails, student.email ]);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
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
