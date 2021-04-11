import ListView from '../ListView';
import { Facebook } from 'react-content-loader';
const Submission = ({ submissions = [] }: any) => {
    if (submissions == null) {
        return <Facebook uniqueKey='hero' />;
    }
    if (submissions.length === 0) {
        return <h2>No submissions yet!</h2>;
    }

    return (
        <ListView title='Submissions' student>
            {submissions.map(({ score, title, courseID, _id }: any) => (
                <div className='list-item' key={_id}>
                    <div>
                        <span>{title}</span>
                        <span className='extra'>{courseID}</span>
                    </div>
                    <div>
                        <span className='score'>{score}</span>
                    </div>
                </div>
            ))}
        </ListView>
    );
};

export default Submission;
