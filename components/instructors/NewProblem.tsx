import React, { Fragment, useState, useEffect, useCallback } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';
import * as Icons from 'react-feather';
import axios from '../../utils/axios';
import { useToasts, ToastProvider } from 'react-toast-notifications';
import { useSelector } from 'react-redux';

interface TestProps {
    id: number;
    updateTestCases: Function;
    deleteTest: Function;
}
type TestCase = {
    id: number;
    input: string;
    output: string;
};

const Test = ({ id, updateTestCases, deleteTest }: TestProps) => {
    const [ input, setinput ] = useState<string>('');
    const [ output, setoutput ] = useState<string>('');
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
const NewProblem = () => {
    const [ testcases, settestcases ] = useState<TestCase[]>([
        {
            id: 0,
            input: '',
            output: ''
        }
    ]);
    const [ problemName, setproblemName ] = useState<string>('');
    const [ description, setdescription ] = useState<string>('');
    const [ totalPoints, settotalPoints ] = useState<number>(100);
    const [ code, setcode ] = useState<string>('');
    const [ courses, setcourses ] = useState<any>(null);
    const [ courseID, setCourseID ] = useState<any>(null);
    const [ assign, setassign ] = useState<boolean>(false);
    const { addToast } = useToasts();
    const state: any = useSelector((state) => state);
    useEffect(() => {
        const localCode = localStorage.getItem('code');
        if (localCode && localCode !== '') setcode(() => localCode);
    }, []);

    useEffect(() => {
        if (state.client.isLoggedIn) {
            const token = localStorage.getItem('token');
            try {
                (async () => {
                    const { data } = await axios.get(`/courses/${state.client.user._id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setcourses(data);
                    setCourseID(courses[0]);
                })();
            } catch (e) {
                console.log('====================================');
                console.log('e');
                console.log('====================================');
            }
        }
    }, []);

    const handleSubmit = async () => {
        if (problemName === '') {
            addToast(`Problem Name can't be empty.`, { appearance: 'warning', autoDismiss: true });
            return;
        }
        if (description === '') {
            addToast(`Description can't be empty. `, { appearance: 'warning', autoDismiss: true });
            return;
        }
        if (totalPoints === 0) {
            addToast(`Point can't be 0. `, { appearance: 'warning', autoDismiss: true });
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
            courseID,
            title: problemName,
            description,
            testcases,
            assign,
            starterCode: code
        };
        console.log('====================================');
        console.log(problem);
        console.log('====================================');
        // const { data: problem } = await axios.post('/problems', {
        //     courseID,
        //     title: problemName,
        //     description,
        //     testcases,
        //     assign,
        //     starterCode: code
        // });
    };
    return (
        <Fragment>
            <div className='tabs'>New Problem</div>
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
                <div className='field problem-description'>
                    <span>Total Points</span>
                    <input
                        type='number'
                        value={totalPoints}
                        className='input-type'
                        onChange={({ target: { value } }) => {
                            settotalPoints(parseInt(value));
                        }}
                    />
                </div>
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
                    {testcases.map(({ id }: TestCase) => (
                        <Test
                            key={id}
                            id={id}
                            updateTestCases={({ input, output, id }: TestCase) => {
                                const newCases = testcases;
                                const newCase = testcases.findIndex(({ id: did }) => {
                                    return id === did;
                                });
                                newCases[newCase] = { input, output, id };

                                settestcases(newCases);
                            }}
                            deleteTest={(id: number) => {
                                const newCases = testcases.filter(({ id: did }) => {
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
                        }}
                        value={courseID}
                    >
                        {courses !== null &&
                            courses.map(({ _id, title, courseID }: any, i: number) => (
                                <option className='course-option' value={_id}>
                                    {title} ({courseID})
                                </option>
                            ))}
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
        </Fragment>
    );
};

export default NewProblem;
