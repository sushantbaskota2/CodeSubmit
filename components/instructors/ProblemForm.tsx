import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';
import * as Icons from 'react-feather';
// import { Test } from '../Test';
import { TestCase } from '../../utils/types';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';
import axios from '../../utils/axios';

interface TestProps {
    id: number;
    updateTestCases: Function;
    deleteTest: Function;
    i: string;
    o: string;
}

const Test = ({ id, updateTestCases, deleteTest, i, o }: TestProps) => {
    const [ input, setinput ] = useState<string>(i);
    const [ output, setoutput ] = useState<string>(o);
    useEffect(
        () => {
            updateTestCases({ input, output, id });
        },
        [ input, output ]
    );
    // const [id, setid] = useState<number>(0)
    return (
        <div className='input-type test-case'>
            <div className='test-header'>
                <span>{`Test Case`}</span>
                <Icons.Trash
                    onClick={() => {
                        deleteTest(id);
                    }}
                    color='red'
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <div className='case'>
                <span>Input</span>
                <input
                    type='text'
                    value={input}
                    className='input-type'
                    onChange={({ target: { value } }) => {
                        setinput(() => value);
                    }}
                />
            </div>
            <div className='case'>
                <span>Output</span>
                <input
                    type='text'
                    value={output}
                    className='input-type'
                    onChange={({ target: { value } }) => {
                        setoutput(() => value);
                    }}
                />
            </div>
        </div>
    );
};

const ProblemForm = ({
    id,
    problemName,
    setproblemName,
    description,
    setdescription,
    code,
    setcode,
    testcases,
    settestcases,
    courseID,
    setCourseID,
    assign,
    setassign
}: any) => {
    const router = useRouter();
    const { addToast } = useToasts();
    console.log('====================================');
    console.log(assign);
    console.log('====================================');
    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (problemName === '') {
            addToast(`Problem Name can't be empty.`, { appearance: 'warning', autoDismiss: true });
            return;
        }
        if (description === '') {
            addToast(`Description can't be empty. `, { appearance: 'warning', autoDismiss: true });
            return;
        }

        if (testcases.length <= 1) {
            addToast(`There needs to be more than one testcase.`, { appearance: 'warning', autoDismiss: true });
            return;
        }
        for (let i = 0; i < testcases.length; i++) {
            if (testcases[i].input === '' || testcases[i].output === '') {
                addToast('There cannot be an empty testcase', { appearance: 'warning', autoDismiss: true });
                return;
            }
        }
        const problem = {
            title: problemName,
            description,
            testcases,
            assign,
            starterCode: code
        };
        console.log('====================================');
        console.log(assign);
        console.log('====================================');
        await axios.patch(`/problems/${id}`, problem, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        router.replace('/instructor');
        addToast('Updated Successfully', { appearance: 'success', autoDismiss: true });
    };
    return (
        <div className='problem-form'>
            <div className='field problem-name'>
                <span>Problem Name</span>
                <input
                    type='text'
                    className='input-type'
                    value={problemName}
                    onChange={({ target: { value } }) => {
                        setproblemName(value);
                    }}
                />
            </div>
            <div className='field problem-description'>
                <span>Problem Description</span>
                <textarea
                    className='input-type'
                    value={description}
                    onChange={({ target: { value } }) => {
                        setdescription(value);
                    }}
                />
            </div>
            {/* <div className='field problem-description'>
                <span>Total Points</span>
                <input
                    type='number'
                    value={totalPoints}
                    className='input-type'
                    onChange={({ target: { value } }) => {
                        settotalPoints(parseInt(value));
                    }}
                />
            </div> */}
            <div className='field problem-description'>
                <span>Starter Code</span>
                <AceEditor
                    mode='javascript'
                    theme='solarized_light'
                    name='solution'
                    fontSize={14}
                    value={code}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,

                        tabSize: 2
                    }}
                    style={{
                        flex: 1,
                        borderRadius: '5px',
                        padding: '1rem',
                        height: '20rem'
                    }}
                    onChange={(e) => {
                        localStorage.setItem('code', e);
                        setcode(() => e);
                    }}
                />
            </div>
            <div className='field problem-tests'>
                <span>Test Cases</span>
                {testcases.map(({ input, output, id }: TestCase) => (
                    <Test
                        key={id}
                        id={id}
                        i={input}
                        o={output}
                        updateTestCases={({ input, output, id }: TestCase) => {
                            const newCases = testcases;
                            const newCase = testcases.findIndex(({ id: did }: any) => {
                                return id === did;
                            });
                            newCases[newCase] = { input, output, id };

                            settestcases(newCases);
                        }}
                        deleteTest={(id: number) => {
                            const newCases = testcases.filter(({ id: did }: any) => {
                                return did !== id;
                            });
                            settestcases(newCases);
                        }}
                    />
                ))}
                <div
                    className='add-testcase'
                    onClick={() => {
                        const cases = [ ...testcases, { input: '', output: '', id: Date.now() } ];
                        settestcases(cases);
                    }}
                >
                    <Icons.PlusSquare />
                    <span>Add Another TestCase</span>
                </div>
            </div>
            <div className='field course'>
                <span>Course</span>
                <select
                    name='course'
                    className='input-type '
                    onChange={(e) => {
                        setCourseID(e.target.value);
                        console.log(courseID);
                    }}
                    disabled
                    value={courseID}
                >
                    <option className='course-option' value={courseID}>
                        {courseID}
                    </option>
                    {/* {courses !== null &&
                        courses.map(({ _id, title, courseID }: any) => (
                            <option key={_id} className='course-option' value={_id}>
                                {title} ({courseID})
                            </option>
                        ))} */}
                    {/* <option className='course-option' value='CSCI 450'>
                            CSCI 450
                        </option>
                        <option className='course-option' value='CSCI 450'>
                            CSCI 450
                        </option> */}
                </select>
            </div>
            <div className='field assign'>
                <span>Assign</span>
                <div className='input-type'>
                    <div className={`toggle-btn ${assign && 'active'}`}>
                        <input onChange={() => setassign(!assign)} type='checkbox' className='cb-value' />
                        <span className='round-btn' />
                    </div>
                </div>
            </div>
            <div className='field submit'>
                <span />
                <button className='submit-button' onClick={() => handleSubmit()}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ProblemForm;
