export type CoursePart = {
    name: string;
    exerciseCount: number;
    };


export interface ContentProps {
    courseParts: CoursePart[];
    }


export const Content = (props: ContentProps): JSX.Element =>  {
    return (
        <div>
            {props.courseParts.map((part: CoursePart) => {
                return <p key={part.name} >{part.name} {part.exerciseCount}</p>;
            })}
        </div>
    );
}
