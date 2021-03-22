import React from 'react';
import ListView from '../ListView';
interface Props {}
import { Facebook } from 'react-content-loader';

const Courses = ({ courses, student = false }: any) => {
    if (courses == null) {
        return <Facebook />;
    }
    return (
        <ListView title='Courses' add='Course'>
            {courses.map(({ courseID, title }: any) => (
                <div className='list-item'>
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
