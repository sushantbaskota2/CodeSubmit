import React, { useState } from 'react';
import * as Icons from 'react-feather';
import { Test as TestProps } from '../interfaces/index';

export const Test = ({ Input, Output, ConsoleOutput, ExpectedOutput, ErrorOutput }: TestProps) => {
    const [ expanded, setexpanded ] = useState(false);

    const toggle = () => {
        setexpanded(!expanded);
    };

    return (
        <div className='test'>
            <div className='main'>
                <div className='title' onClick={() => toggle()}>
                    {expanded ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                    <span>Test 1</span>
                </div>
                <div className='icons'>
                    <Icons.CheckCircle color='green' />
                    <Icons.PlayCircle />
                </div>
            </div>
            <div className={`extra ${expanded ? 'show' : ''}`}>
                <div className='options'>
                    <div className='option'>Input:</div>
                    <div className='option'>Output:</div>
                    <div className='option'>Expected Output:</div>
                    <div className='option'>Console Output:</div>
                    <div className='option'>Error Output:</div>
                </div>
                <div className='values'>
                    <div className='value'>{Input}</div>
                    <div className='value'>{Output}</div>
                    <div className='value'>{ExpectedOutput}</div>
                    <div className='value'>{ConsoleOutput}</div>
                    <div className='value'>{ErrorOutput}</div>
                </div>
            </div>
        </div>
    );
};
