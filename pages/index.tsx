import { useRouter } from 'next/router';
import { Facebook } from 'react-content-loader';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../utils/axios';
import './IndexPage.module.scss';
import { useEffect, useState } from 'react';
import { CLIENT_LOGIN } from '../actions/types';
import { UserType, LoginType } from '../utils/types';
const IndexPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const state: any = useSelector((state) => state);
    // const { isLoggedIn } = useLoginStatus(state);
    const [ loading, setloading ] = useState(true);
    useEffect(() => {
        if (!state.client.isLoggedIn) {
            const token = localStorage.getItem('token');
            if (!token) {
                setloading(false);
                return;
            }
            (async function handleLogin() {
                const { data } = await axios.get('/users/me', { headers: { Authorization: `Bearer ${token}` } });
                if (data) {
                    dispatch({ type: CLIENT_LOGIN, payload: data });
                    router.push(data.instructor ? UserType.Instructor : UserType.Student);
                }
            })();
            setloading(false);
        } else {
            router.push(state.client.user.type ? UserType.Instructor : UserType.Student);
        }

        // return () => setloading(false);
    }, []);

    if (loading) {
        return <Facebook uniqueKey='hero' />;
    }

    return (
        <div className='Landing'>
            <nav className='top'>
                <div className='left'>
                    <span>Code</span>Submit
                </div>
                <div className='right'>
                    <span>About Us</span>
                    <span className='signup'>Sign Up</span>
                </div>
            </nav>
            <div className='banner'>
                <div className='left'>
                    <div className='title'>Your Coding Assignments</div>
                    <div className='content'>
                        We provide you with the best ways to submit and assign coding problems. Works great if you're
                        instructor or a student. We also have grade tracking systems.
                    </div>
                    <div className='buttons'>
                        <div
                            className='one'
                            onClick={() => {
                                router.push('/login');
                            }}
                        >
                            I am an instructor
                        </div>
                        <div
                            className='two'
                            onClick={() => {
                                router.push('/login');
                            }}
                        >
                            I am a student
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <img
                        src={
                            'https://media.istockphoto.com/vectors/digital-java-code-text-computer-software-coding-vector-concept-vector-id1148185998?k=6&m=1148185998&s=612x612&w=0&h=loUXtHknKznNzhjL7rSaOuEYjQthR7TgEIh9V5vX8zI='
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default IndexPage;
