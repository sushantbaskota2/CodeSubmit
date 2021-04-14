import React from 'react';
import ListView from './ListView';
import * as Icons from 'react-feather';
import { Facebook } from 'react-content-loader';
import { useRouter } from 'next/router';
import axios from '../utils/axios';
// import { routeros } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// const problemsDummy = [
//     {
//         problemName: 'Check Palindrome',
//         courseName: 'CSCI 346',
//         assigned: false
//     },
//     {
//         problemName: 'Check Anagram',
//         courseName: 'CSCI 346',
//         assigned: false
//     },
//     {
//         problemName: 'Check Pal',
//         courseName: 'CSCI 346',
//         assigned: true
//     },
//     {
//         problemName: 'Check drome',
//         courseName: 'CSCI 346',
//         assigned: true
//     }
// ];
const Problems = ({ problems, submissions, student = false }: any) => {
    const router = useRouter();
    console.log('====================================');
    console.log(problems);
    console.log('====================================');
    if (problems == null) {
        return <Facebook uniqueKey='hero' />;
    }
    return (
        <ListView title={'Problems'} student={student}>
            {problems &&
                problems
                    .filter((problem: any) => {
                        if (!student) {
                            return true;
                        }
                        return !submissions.find((submission: any) => submission.problemId == problem._id);
                    })
                    .map(({ title, assign, _id }: any) => (
                        <div
                            key={_id}
                            className='list-item'
                            onClick={
                                student ? (
                                    () => {
                                        router.push(`/solver/${_id}`);
                                    }
                                ) : (
                                    () => {
                                        router.push(`/problems/${_id}`);
                                    }
                                )
                            }
                        >
                            <div>
                                <span>{title}</span>
                                {/* <span className='extra'>{courseID}</span> */}
                            </div>
                            {!student &&
                                (assign ? (
                                    <Icons.CheckCircle />
                                ) : (
                                    <span
                                        className='assignButton'
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            await axios.patch(`/problems/${_id}`, { assign: true });
                                            router.reload();
                                        }}
                                    >
                                        Assign
                                    </span>
                                ))}
                        </div>
                    ))}
        </ListView>
    );
};
export default Problems;
