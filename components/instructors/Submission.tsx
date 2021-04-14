import ListView from '../ListView';
import { Facebook } from 'react-content-loader';
import { useRouter } from 'next/router';
const Submission = ({ submissions = [] }: any) => {
    const router = useRouter();
    if (submissions == null) {
        return <Facebook uniqueKey='hero' />;
    }

    return (
        <ListView title='Submissions' student>
            {submissions.map(({ score, problemName: title, name, courseID, _id }: any) => (
                <div
                    className='list-item'
                    key={_id}
                    onClick={() => {
                        router.replace(`/submission/${_id}`);
                    }}
                >
                    <div>
                        <span>{title}</span>
                        <span className='extra'>{courseID}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <span className='submittedby'>by: {name}</span>
                        <span className='score'>{score}</span>
                    </div>
                </div>
            ))}
        </ListView>
    );
};

export default Submission;
