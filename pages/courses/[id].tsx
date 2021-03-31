import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import { useLoginStatus } from '../../hooks/index';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from '../../utils/axios';
import { X } from 'react-feather';
interface Props {}

const Course = (props: Props) => {
    const state: any = useSelector((state) => state);
    const { isLoggedIn } = useLoginStatus(state);
    const router = useRouter();
    const { id } = router.query;
    const [ course, setcourse ] = useState<any>();
    const [ query, setquery ] = useState<string>('');
    const [ selectedEmails, setselectedEmails ] = useState([
        'sushantbaskota2@gmail.com',
        'student1@example.com',
        'student2@example.com',
        'student3@example.com'
    ]);
    useEffect(() => {
        async function fetchData() {
            const { data: course } = await axios.get(`/courses/${id}`);
            console.log('====================================');
            console.log(course);
            console.log('====================================');
            setcourse(course);
        }
        // fetchData();
    }, []);
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
                            <div className='student-item'>Sushant Baskota</div>
                            <div className='student-item'>Mushant Baskota</div>
                            <div className='student-item'>Gushant Baskota</div>{' '}
                            <div className='student-item'>Sushant Baskota</div>
                            <div className='student-item'>Mushant Baskota</div>
                            <div className='student-item'>Gushant Baskota</div>{' '}
                            <div className='student-item'>Sushant Baskota</div>
                            <div className='student-item'>Mushant Baskota</div>
                            <div className='student-item'>Gushant Baskota</div>{' '}
                            <div className='student-item'>Sushant Baskota</div>
                            <div className='student-item'>Mushant Baskota</div>
                            <div className='student-item'>Gushant Baskota</div>{' '}
                            <div className='student-item'>Sushant Baskota</div>
                            <div className='student-item'>Mushant Baskota</div>
                            <div className='student-item'>Gushant Baskota</div>
                        </div>
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
