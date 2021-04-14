import * as Icons from 'react-feather';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { Facebook } from 'react-content-loader';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useLoginStatus } from '../../hooks';
import { UserType } from '../../utils/types';
const Ace = dynamic(() => import('../../components/Ace'), { ssr: false });
// const { Facebook } = dynamic(() => import('react-content-loader'), { ssr: false });

const solver = (props: any) => {
    const [ problemData, setproblemData ] = useState<any>(null);
    const [ score, setscore ] = useState(0);
    const [ id, setid ] = useState<any>('');
    const state: any = useSelector((state) => state);
    const { user, userType } = useLoginStatus(state);
    const [ code, setcode ] = useState(props.problemData.starterCode);
    const router = useRouter();

    useEffect(
        () => {
            const { id } = router.query;
            setid(id);
            if (state.client.UserType === UserType.Instructor) {
                router.replace('/instructor');
            }

            (async () => {
                if (id !== undefined) {
                    const { data: problem } = await axios.get(`/problems/problem/${id}`);

                    console.log(problem);

                    setproblemData(problem);
                    if (problemData !== null) {
                        setcode(problemData.starterCode);
                    }
                }
            })();
        },
        [ router.isReady ]
    );
    if (userType === UserType.Instructor) {
        return <div />;
    }
    if (problemData == null) {
        return <Facebook uniqueKey={'hero'} />;
    }
    return (
        <div className='Solver'>
            <div className='top-banner'>
                <div className='left' onClick={() => router.replace('/student')}>
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
                    <Ace
                        testcases={problemData.testcases}
                        code={code}
                        setcode={setcode}
                        starterCode={problemData.starterCode}
                        setscore={setscore}
                    />
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
                                submissionCode: code
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

solver.getInitialProps = async (ctx: any) => {
    const { id } = ctx.query;
    let problemData;

    if (id !== undefined) {
        const { data: problem } = await axios.get(`/problems/problem/${id}`);
        problemData = problem;
    }
    return { problemData };
};
