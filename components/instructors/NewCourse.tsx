import axios from '../../utils/axios';
import { useRouter } from 'next/router';
import React, { useState, Fragment } from 'react';
import { useToasts } from 'react-toast-notifications';

const NewCourse = () => {
    const [ title, settitle ] = useState('');
    const [ courseID, setcourseID ] = useState('');
    const router = useRouter();
    const { addToast } = useToasts();
    return (
        <Fragment>
            <div className='tabs'>New Course</div>
            <div className='course-form'>
                <input
                    type='text'
                    placeholder='Course Name'
                    value={title}
                    onChange={({ target: { value } }) => settitle(value)}
                />
                <input
                    type='text'
                    placeholder='Course ID'
                    value={courseID}
                    onChange={({ target: { value } }) => setcourseID(value)}
                />
                <button
                    onClick={async () => {
                        const token = localStorage.getItem('token');
                        if (title === '' || courseID == '') {
                            addToast('Please add title and courseID', { appearance: 'warning', autoDismiss: true });
                            return;
                        }
                        await axios.post(
                            '/courses',
                            {
                                courseID,
                                title
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );
                        router.push('/instructor');
                    }}
                >
                    Submit
                </button>
                <button
                    onClick={async () => {
                        router.replace('/instructor');
                    }}
                    style={{ backgroundColor: 'red', color: 'white' }}
                >
                    Cancel
                </button>
            </div>
        </Fragment>
    );
};

export default NewCourse;
