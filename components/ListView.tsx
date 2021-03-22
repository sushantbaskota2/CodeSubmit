import React from 'react';
import { PlusSquare } from 'react-feather';
import { useRouter } from 'next/router';

const ListView = (props: any) => {
    const router = useRouter();
    return (
        <div className='list-container'>
            <div className='list-header'>
                <div>{props.title}</div>
                {!props.student && (
                    <div
                        className='new'
                        onClick={() => (props.add === 'Course' ? router.push('/courses') : router.push('/problems'))}
                    >
                        <PlusSquare />
                        <span>Add {props.add}</span>
                    </div>
                )}
            </div>
            <div className='list'>{props.children}</div>
        </div>
    );
};

export default ListView;
