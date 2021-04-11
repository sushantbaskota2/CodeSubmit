import React, { useState } from 'react';
import AceEditor from 'react-ace';
import * as Icons from 'react-feather';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';

type AceProps = {};
import { tests } from '../utils/sampledata';
import { Test } from '../interfaces/index';
import { Test as TestList } from './Test';
import axios from '../utils/axios';
import { Code, Instagram } from 'react-content-loader';

const Ace: React.FC<any> = (props) => {
    const [ consoletab, setconsoletab ] = useState<0 | 1>(0);
    const [ code, setcode ] = useState<string>(props.starterCode);
    const [ testcases, settestcases ] = useState<any>(props.testcases);
    const [ submission, setsubmission ] = useState<any>(null);
    const [ loading, setLoading ] = useState<Boolean>(false);

    const toggle = () => {
        setconsoletab(consoletab ? 0 : 1 || consoletab ? 1 : 0);
    };
    return (
        <React.Fragment>
            <AceEditor
                placeholder=''
                mode='javascript'
                theme='solarized_dark'
                name='solution'
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={code}
                style={{ width: '100%', paddingTop: '2rem', height: '50%' }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,

                    tabSize: 2
                }}
                onChange={(val) => {
                    setcode(val);
                }}
            />
            <div className='console-container'>
                <div className='top-row'>
                    <div className='tabs'>
                        <div onClick={() => toggle()} className={`tab ${consoletab === 0 ? 'active' : ''}`}>
                            TESTS
                        </div>
                        {/* <div onClick={() => toggle()} className={`tab ${consoletab === 1 ? 'active' : ''}`}>
                            CUSTOM TESTS
                        </div> */}
                    </div>
                    <div
                        className='run-button'
                        onClick={async () => {
                            setLoading(true);
                            const { data } = await axios.post('/solve', {
                                studentCode: code,
                                testcases
                            });
                            setLoading(false);
                            console.log(data);
                            const count = data.reduce((acc: any, curr: any) => {
                                if (curr.status == 'TRUE') {
                                    return acc + 1;
                                }
                                return acc;
                            }, 0);
                            props.setscore(Math.round(count / data.length * 100));
                            setsubmission(data);
                        }}
                    >
                        <Icons.PlayCircle />
                        <span>Run Tests</span>
                    </div>
                </div>
                <div className='tests'>
                    {loading ? (
                        <Code speed={1} animate={true} />
                    ) : (
                        testcases.map((test: Test, i: number) => (
                            <TestList {...test} submission={submission !== null ? submission[i] : null} key={i} />
                        ))
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};
export default Ace;
