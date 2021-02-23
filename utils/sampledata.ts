import {Test} from '../interfaces/index';

const tests:Test[] = [
    {
        Input:`()=>{console.log('World')}`,
        Output:`World`,
        ConsoleOutput: `World`,
        ExpectedOutput: `5`,
        ErrorOutput:``,
        Expanded:false
    },
    {
        Input:`()=>{console.log('hello')}`,
        Output:`World`,
        ConsoleOutput: `World`,
        ExpectedOutput: `5`,
        ErrorOutput:``,
        Expanded:false
    }

]

export {tests}