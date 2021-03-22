import ListView from '../ListView';
import { Facebook } from 'react-content-loader';
const Courses = ({ courses = [], student }: any) => {
    if (courses == null) {
        return <Facebook />;
    }

    return (
        <ListView title='Courses' student>
            {courses.map(({ courseID, title }: any) => (
                <div className='list-item'>
                    <div>
                        <span>{title}</span>
                        <span className='extra'>{courseID}</span>
                    </div>
                </div>
            ))}
        </ListView>
    );
};

export default Courses;
