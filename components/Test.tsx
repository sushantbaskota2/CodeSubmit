import React, { Fragment, useState } from 'react';
import * as Icons from 'react-feather';
import { Test as TestProps } from '../interfaces/index';

export const Test = ({ input, output, ConsoleOutput, ExpectedOutput, ErrorOutput, run, submission, score }: any) => {
    const [ expanded, setexpanded ] = useState(false);

    const toggle = () => {
        setexpanded(!expanded);
    };

    return (
        <div className='test'>
            <div className='main'>
                <div className='title' onClick={() => toggle()}>
                    {expanded ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                    <span>Test</span>
                </div>
                <div className='icons'>
                    {submission !== null &&
                        (submission.status === 'TRUE' ? (
                            <Icons.CheckCircle color='green' />
                        ) : (
                            <Icons.XCircle color='red' />
                        ))}
                    {/* <Icons.PlayCircle /> */}
                </div>
            </div>
            <div className={`extra ${expanded ? 'show' : ''}`}>
                <div className='options'>
                    <div className='option'>Input:</div>
                    <div className='option'>Output:</div>
                    <div className='option'>Console Output:</div>
                    {run === true && (
                        <Fragment>
                            <div className='option'>Expected Output:</div>

                            <div className='option'>Error Output:</div>
                        </Fragment>
                    )}
                </div>
                <div className='values'>
                    <div className='value'>{input}</div>
                    <div className='value'>{output}</div>
                    <div className='value'>{submission !== null && submission.res.output}</div>
                    {run === true && (
                        <Fragment>
                            <div className='value'>{ExpectedOutput}</div>

                            <div className='value'>{ErrorOutput}</div>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};
