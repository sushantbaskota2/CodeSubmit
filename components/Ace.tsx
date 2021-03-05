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


const Ace: React.FC<AceProps> = () => {
    const [ consoletab, setconsoletab ] = useState<0 | 1>(0);
    const [ code, setcode ] = useState<string>(`function onLoad(editor) {

}
`);
    const toggle = () => {
        setconsoletab(consoletab ? 0 : 1 || consoletab ? 1 : 0);
    };
    return (
        <React.Fragment>
            <AceEditor
                placeholder='hero'
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
                        <div onClick={() => toggle()} className={`tab ${consoletab === 1 ? 'active' : ''}`}>
                            CUSTOM TESTS
                        </div>
                    </div>
                    <div className='run-button'>
                        <Icons.PlayCircle />
                        <span>Run Tests</span>
                    </div>
                </div>
                <div className='tests'>{tests.map((test: Test) => <TestList {...test} />)}</div>
            </div>
        </React.Fragment>
    );
};
export default Ace;
