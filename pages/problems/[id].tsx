import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useRouter } from 'next/router';
import UpdateProblem from '../../components/instructors/UpdateProblem';
import Nav from '../../components/Nav';
import { ToastProvider } from 'react-toast-notifications';
import { Facebook } from 'react-content-loader';
import { useSelector } from 'react-redux';
import { useLoginStatus } from '../../hooks';
import { UserType } from '../../utils/types';
interface Props {}

const Update = (props: Props) => {
    const router = useRouter();
    const { id } = router.query;
    const [ data, setdata ] = useState<any>(null);
    const state: any = useSelector((state) => state);
    const { userType } = useLoginStatus(state);

    useEffect(
        () => {
            if (id !== undefined) {
                (async () => {
                    const { data: { problemName, description, code, courseID, testcases, assign } } = await axios.get(
                        `/instructor/problem/${id}`
                    );

                    console.log('====================================');
                    console.log(assign);
                    console.log('====================================');
                    let tcases = [];
                    for (let i = 0; i < testcases.length; i++) {
                        const input = testcases[i].input;
                        const output = testcases[i].output;

                        const a = {
                            input,
                            output,
                            id: i
                        };

                        tcases.push(a);
                    }

                    setdata({ problemName, description, code, courseID, testcases: tcases, assign });
                })();
            }
        },
        [ router.isReady ]
    );

    if (userType === UserType.Student) {
        router.replace('/student');
        return <div />;
    }

    if (data === null) {
        return <Facebook uniqueKey={'hero'} />;
    }
    return (
        <div className='MainPage'>
            <Nav />
            <div className='container'>
                {data !== null && (
                    <UpdateProblem
                        name={data.problemName}
                        desc={data.description}
                        c={data.code}
                        cID={data.courseID}
                        tcases={data.testcases}
                        a={data.assign}
                        id={id}
                    />
                )}
            </div>
        </div>
    );
};

export default Update;
