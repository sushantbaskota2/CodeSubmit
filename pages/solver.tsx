import * as Icons from 'react-feather';
import dynamic from 'next/dynamic';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const Ace = dynamic(() => import('../components/Ace'), { ssr: false });

const solver = () => {
    return (
        <div className='Solver'>
            <div className='top-banner'>
                <div className='left'>
                    <Icons.ChevronLeft />
                    <span>BACK</span>
                </div>
                <div className='middle'>Question</div>
                <div className='right'>
                    <Icons.Bell />
                    <div className='profile' />
                    <Icons.ChevronDown />
                </div>
            </div>
            <div className='mainArea'>
                <div className='prompt'>
                    <div className='nav'>
                        <span>
                            <Icons.Code color='white' />
                        </span>
                        <span>
                            <Icons.Settings color='white' />
                        </span>
                    </div>
                    <div className='body'>
                        <div className='tags'>
                            <div className='tag'>
                                <Icons.Clock fontSize={'1.6rem'} color='teal' />
                                <span>14th Feb</span>
                            </div>
                            <div className='tag'>
                                <Icons.Lock fontSize={'1.6rem'} color='teal' />
                                <span>Hard</span>
                            </div>
                            <div className='tag'>
                                <Icons.File fontSize={'1.6rem'} color='teal' />
                                <span>100 points</span>
                            </div>
                        </div>
                        <div className='instructions'>
                            <span className='bolded'>Prompt</span>
                            {` Below we will define an n-interesting polygon. Your task is to find the area of a polygon
                            for a given n. A 1-interesting polygon is just a square with a side of length 1. An
                            n-interesting polygon is obtained by taking the n - 1-interesting polygon and appending
                            1-interesting polygons to its rim, side by side. You can see the 1-, 2-, 3- and
                            4-interesting polygons in the picture below.`}
                            <span className='bolded'>Example</span>
                            {`
For n = 2, the output should be
shapeArea(n) = 5;
For n = 3, the output should be
shapeArea(n) = 13.
Input/Output

[execution time limit] 4 seconds (js)

[input] integer n

Guaranteed constraints:
1 ≤ n < 104

[output] integer

The area of the n-interesting polygon.`}
                            <SyntaxHighlighter language='javascript'>
                                {`// Prints help message to the console
// Returns a string
function helloWorld(name) {
    console.log("This prints to the console when you Run Tests");
    return "Hello, " + name;
}`}
                            </SyntaxHighlighter>

                            <span className='bolded'>Prompt</span>
                            {` Below we will define an n-interesting polygon. Your task is to find the area of a polygon
                            for a given n. A 1-interesting polygon is just a square with a side of length 1. An
                            n-interesting polygon is obtained by taking the n - 1-interesting polygon and appending
                            1-interesting polygons to its rim, side by side. You can see the 1-, 2-, 3- and
                            4-interesting polygons in the picture below.`}
                            <span className='bolded'>Example</span>
                            {`
For n = 2, the output should be
shapeArea(n) = 5;
For n = 3, the output should be
shapeArea(n) = 13.
Input/Output

[execution time limit] 4 seconds (js)

[input] integer n

Guaranteed constraints:
1 ≤ n < 104

[output] integer

The area of the n-interesting polygon.`}
                            <SyntaxHighlighter language='javascript'>
                                {`// Prints help message to the console
// Returns a string
function helloWorld(name) {
    console.log("This prints to the console when you Run Tests");
    return "Hello, " + name;
}`}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
                <div className='solution'>
                    <Ace />
                </div>
            </div>
            <div className='bottom-footer'>
                <div className='footer-left'>
                    <div className='more'>
                        <Icons.MoreVertical size='1.4rem' />
                        <span>More</span>
                    </div>
                </div>
                <div className='footer-right'>
                    <div className='score'>0/300</div>
                    <div className='submit'>Submit</div>
                </div>
            </div>
        </div>
    );
};

export default solver;
