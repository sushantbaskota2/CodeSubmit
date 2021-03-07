export enum Tabs {
    OVERVIEW = 'Overview',
    COURSES = 'Courses',
    PROBLEMS = 'Problems',
    SUBMISSIONS = 'Submissions'
}
export type Navigation = {
    [key: string]: JSX.Element;
};

export type LoginData = {
    email: string;
    password: string;
    dispatch: Function;
};
