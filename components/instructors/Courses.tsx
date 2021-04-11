import React from 'react';
import ListView from '../ListView';
import { Facebook } from 'react-content-loader';
import { useRouter } from 'next/router';

const Courses = ({ courses }: any) => {
    const router = useRouter();
    if (courses == null) {
        return <Facebook uniqueKey='hero' />;
    }

    return (
        <ListView title='Courses' add='Course'>
            {courses.map(({ courseID, title, _id }: any) => (
                <div
                    key={_id}
                    className='list-item'
                    onClick={() => {
                        router.push(`/courses/${_id}`);
                    }}
                >
                    <div>
                        <span>{title}</span>
                        <span className='extra'>{courseID}</span>
                    </div>
                </div>
            ))}
        </ListView>
    );
};

export default Courses;
