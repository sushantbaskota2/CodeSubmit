import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../../utils/axios';
import { Facebook } from 'react-content-loader';
import Nav from '../../components/Nav';
import { ChevronLeft } from 'react-feather';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useToasts } from 'react-toast-notifications';
import { useLoginStatus } from '../../hooks';
import { useSelector } from 'react-redux';
import { UserType } from '../../utils/types';

const Sub = ({ submission }: any) => {
    const router = useRouter();
    const state: any = useSelector((state) => state);
    // const [ submission, setsubmission ] = useState<any>(null);
    const [ change, setchange ] = useState<any>(false);
    const [ score, setscore ] = useState<any>(submission.submission.score);

    const { addToast } = useToasts();

    const { userType } = useLoginStatus(state);
    // const fData = async (id: any) => {
    //     const { data } = await axios.get(`instructor/submissions/${id}`);
    //     setsubmission(data);
    // };
    // useEffect(
    //     () => {
    //         if (router.isReady) {
    //             const { id } = router.query;
    //             fData(id);
    //         }
    //     },
    //     [ router.isReady ]
    // );

    if (userType === UserType.Student) {
        router.replace('/student');
        return <div />;
    }

    if (submission === null) {
        return <Facebook uniqueKey={'hero'} />;
    }
    return (
        <div className='MainPage'>
            <Nav />
            <div className='container'>
                <div
                    className='title'
                    style={{
                        justifyContent: 'space-between'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            cursor: 'pointer'
                        }}
                        onClick={() => router.replace('/instructor')}
                    >
                        <ChevronLeft />
                        <span>Back</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <span>Submission By: {submission.student.name}</span>
                    </div>
                    <div />
                </div>
                <div
                    className='submission-container'
                    style={{
                        margin: '1rem'
                    }}
                >
                    <div className='problem submission-title'>
                        <span>Problem: </span>
                        {submission.problem.title}
                    </div>
                    <div className='submission-title'>
                        <span>Submission Code: </span>
                    </div>
                    <SyntaxHighlighter language='javascript'>{submission.submission.submissionCode}</SyntaxHighlighter>
                    <div className='submission-title'>
                        <span>Score: </span>{' '}
                        {change ? (
                            <input
                                type='number'
                                style={{ width: '5rem' }}
                                value={score}
                                onChange={(e) => setscore(e.target.value)}
                            />
                        ) : (
                            <span>{submission.submission.score}</span>
                        )}
                        <input
                            type='button'
                            value={change ? 'Cancel' : 'Change'}
                            className='Button'
                            onClick={() => {
                                setchange(!change);
                            }}
                            style={{
                                backgroundColor: change ? 'red' : 'teal'
                            }}
                        />
                        <br />
                        {score != submission.submission.score && change ? (
                            <button
                                className='Button'
                                onClick={async () => {
                                    try {
                                        const token = localStorage.getItem('token');
                                        await axios.patch(
                                            `/submissions/${submission.submission._id}`,
                                            { score },
                                            {
                                                headers: {
                                                    Authorization: `Bearer ${token}`
                                                }
                                            }
                                        );
                                        addToast('Score updated succesfully', {
                                            appearance: 'success',
                                            autoDismiss: true
                                        });
                                        router.replace('/instructor');
                                    } catch (e) {
                                        addToast('Unable to update score');
                                    }
                                }}
                            >
                                Submit{' '}
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sub;

Sub.getInitialProps = async (ctx: any) => {
    const { id } = ctx.query;
    let submission;

    if (id !== undefined) {
        const { data } = await axios.get(`instructor/submissions/${id}`);

        submission = data;
    }
    return { submission };
};
