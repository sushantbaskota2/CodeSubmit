import ListView from '../ListView';
import { Facebook } from 'react-content-loader';
const Courses = ({ courses = [] }: any) => {
    if (courses == null) {
        return <Facebook uniqueKey='hero' />;
    }

    return (
        <ListView title='Courses' student>
            {courses.map(({ courseID, title, _id }: any) => (
                <div className='list-item' key={_id}>
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
