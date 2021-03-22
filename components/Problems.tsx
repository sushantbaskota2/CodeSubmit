import React from 'react';
import ListView from './ListView';
import * as Icons from 'react-feather';
import { Facebook } from 'react-content-loader';
const problemsDummy = [
    {
        problemName: 'Check Palindrome',
        courseName: 'CSCI 346',
        assigned: false
    },
    {
        problemName: 'Check Anagram',
        courseName: 'CSCI 346',
        assigned: false
    },
    {
        problemName: 'Check Pal',
        courseName: 'CSCI 346',
        assigned: true
    },
    {
        problemName: 'Check drome',
        courseName: 'CSCI 346',
        assigned: true
    }
];
const Problems = ({ problems, student = false }: any) => {
    console.log('====================================');
    console.log(problems);
    console.log('====================================');
    if (problems == null) {
        return <Facebook />;
    }
    return (
        <ListView title={'Problems'} student={student}>
            {problems &&
                problems.map(({ title, courseID, assign }: any) => (
                    <div key={title} className='list-item'>
                        <div>
                            <span>{title}</span>
                            {/* <span className='extra'>{courseID}</span> */}
                        </div>
                        {!student && (assign ? <Icons.CheckCircle /> : <span className='assignButton'>Assign</span>)}
                    </div>
                ))}
        </ListView>
    );
};
export default Problems;
