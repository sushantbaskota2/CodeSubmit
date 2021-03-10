export enum Tabs {
    COURSES = 'Courses',
    PROBLEMS = 'Problems',
    SUBMISSIONS = 'Submissions'
}
export type Navigation = {
    [key: string]: JSX.Element;
};

export enum UserType {
    Student = 'student',
    Instructor = 'instructor'
}

export type LoginData = {
    email: string;
    password: string;
    dispatch: Function;
    router: any
};
