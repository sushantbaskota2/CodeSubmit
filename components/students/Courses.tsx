import ListView from '../ListView';

const Courses = () => {
    return (
        <ListView title='Courses'>
            <div className='list-item'>
                <div>
                    <span>CSCI 450</span>
                    <span className='extra'>Organization of Programming Languages</span>
                </div>
            </div>
        </ListView>
    );
};

export default Courses;
