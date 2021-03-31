import * as Icons from 'react-feather';
import dynamic from 'next/dynamic';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Facebook } from 'react-content-loader';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useLoginStatus } from '../hooks';
const Ace = dynamic(() => import('../components/Ace'), { ssr: false });
// const { Facebook } = dynamic(() => import('react-content-loader'), { ssr: false });

const solver = () => {
    const [ problemData, setproblemData ] = useState<any>(null);
    const [ score, setscore ] = useState(0);
    const state: any = useSelector((state) => state);
    const { user } = useLoginStatus(state);
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const { data: problem } = await axios.get('/problems/problem/6058b63679b2b1581c39a30d');

            console.log(problem);

            setproblemData(problem);
        })();
    }, []);

    if (problemData == null) {
        return <Facebook uniqueKey={'aayomug'} />;
    }
    return (
        <div className='Solver'>
            <div className='top-banner'>
                <div className='left'>
                    <Icons.ChevronLeft />
                    <span>BACK</span>
                </div>
                <div className='middle'>Question</div>
                <div className='right'>
                    <Icons.Bell />
                    <div className='profile' />
                    <Icons.ChevronDown />
                </div>
            </div>
            <div className='mainArea'>
                <div className='prompt'>
                    <div className='nav'>
                        <span>
                            <Icons.Code color='white' />
                        </span>
                        <span>
                            <Icons.Settings color='white' />
                        </span>
                    </div>
                    <div className='body'>
                        <div className='tags'>
                            <div className='tag'>
                                <Icons.Clock fontSize={'1.6rem'} color='teal' />
                                <span>14th Feb</span>
                            </div>
                            {/* <div className='tag'>
                                <Icons.Lock fontSize={'1.6rem'} color='teal' />
                                <span>Hard</span>
                            </div> */}
                            <div className='tag'>
                                <Icons.File fontSize={'1.6rem'} color='teal' />
                                <span>100</span>
                            </div>
                        </div>
                        <div className='instructions'>
                            <span className='bolded'>{problemData.title}</span>
                            {problemData.description}
                        </div>
                    </div>
                </div>
                <div className='solution'>
                    <Ace testcases={problemData.testcases} starterCode={problemData.starterCode} setscore={setscore} />
                </div>
            </div>
            <div className='bottom-footer'>
                <div className='footer-left'>
                    <div className='more'>
                        <Icons.MoreVertical size='1.4rem' />
                        <span>More</span>
                    </div>
                </div>
                <div className='footer-right'>
                    <div className='score'>{score}/100</div>
                    <div
                        className='submit'
                        onClick={async () => {
                            const submission = await axios.post('/submissions', {
                                problemId: problemData._id,
                                score,
                                studentId: user._id,
                                submissionCode: 'sample code'
                            });
                            console.log(submission);

                            router.push('/student');
                        }}
                    >
                        Submit
                    </div>
                </div>
            </div>
        </div>
    );
};

export default solver;
