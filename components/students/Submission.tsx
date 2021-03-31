import ListView from '../ListView';
import { Facebook } from 'react-content-loader';
const Submission = ({ submissions = [], student }: any) => {
    if (submissions == null) {
        return <Facebook />;
    }

    return (
        <ListView title='Submissions' student>
            {submissions.map(({ score, title }: any) => (
                <div className='list-item'>
                    <div>
                        <span>{title}</span>
                        <span className='extra'>{score}</span>
                    </div>
                </div>
            ))}
        </ListView>
    );
};

export default Submission;
