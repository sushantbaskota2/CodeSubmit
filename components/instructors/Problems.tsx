import React from 'react';
import ListView from '../ListView';
import * as Icons from 'react-feather';

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
const Problems = () => {
    return (
        <ListView title={'Problems'}>
            {problemsDummy.map(({ problemName, courseName, assigned }) => (
                <div key={problemName} className='list-item'>
                    <div>
                        <span>{problemName}</span>
                        <span className='extra'>{courseName}</span>
                    </div>
                    {assigned ? <Icons.CheckCircle /> : <span className='assignButton'>Assign</span>}
                </div>
            ))}
        </ListView>
    );
};
export default Problems;
