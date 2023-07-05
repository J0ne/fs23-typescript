export interface CoursePart {
    name: string;
    exerciseCount: number;
}


export interface ContentProps {
    courseParts: CoursePart[];
}

export interface PartProps {
    coursePart: CoursePart;
}