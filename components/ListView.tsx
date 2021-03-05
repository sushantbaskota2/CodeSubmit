import React from 'react';

const ListView = (props: any) => {
    return (
        <div className='list-container'>
            <div className='list-header'>{props.title}</div>
            <div className='list'>{props.children}</div>
        </div>
    );
};

export default ListView;
