import ListView from '../ListView';
import { Facebook } from 'react-content-loader';
const Submission = ({ submissions = [], student }: any) => {
    if (submissions == null) {
        return <Facebook />;
    }
    if (submissions.length === 0) {
        return <h2>No submissions yet!</h2>;
    }

    return (
        <ListView title='Submissions' student>
            {submissions.map(({ score, title, courseID }: any) => (
                <div className='list-item'>
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
