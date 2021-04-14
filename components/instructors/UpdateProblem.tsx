import React, { Fragment, useState, useEffect } from 'react';
import * as Icons from 'react-feather';
import { useToasts } from 'react-toast-notifications';
import { TestCase } from '../../utils/types';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// import ProblemForm from './ProblemForm';
const ProblemForm = dynamic(() => import('./ProblemForm'), { ssr: false });
const UpdateProblem = ({ id, name, desc, tcases, a, cID, c }: any) => {
    const [ testcases, settestcases ] = useState<any>(tcases);
    const [ problemName, setproblemName ] = useState<string>(name);
    const [ description, setdescription ] = useState<string>(desc);
    // const [ totalPoints, settotalPoints ] = useState<number>(100);
    const [ code, setcode ] = useState<string>(c);
    // const [ courses, setcourses ] = useState<any>(null);
    const [ courseID, setCourseID ] = useState<any>(cID);
    const [ assign, setassign ] = useState<boolean>(a);
    const { addToast } = useToasts();
    const state: any = useSelector((state) => state);
    const router = useRouter();
    return (
        <Fragment>
            <div className='tabs'>
                <div
                    onClick={() => {
                        router.replace('/instructor');
                    }}
                    className='tab active'
                    style={{
                        display: 'flex'
                    }}
                >
                    <Icons.ChevronLeft />
                    <span>Back</span>
                </div>

                <div className='tab'>Update Problem</div>
            </div>
            <ProblemForm
                {...{
                    id,
                    problemName,
                    setproblemName,
                    description,
                    setdescription,
                    code,
                    setcode,
                    courseID,
                    setCourseID,
                    testcases,
                    settestcases,
                    assign,
                    setassign
                }}
            />
        </Fragment>
    );
};

export default UpdateProblem;
