import { CoursePart } from "./Content";

interface TotalProps {
    courseParts: CoursePart[];
}

export const Total = (props: TotalProps): JSX.Element => {
    return (
        <div>
            <p>
                Number of exercises{" "}
                {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </p>
        </div>
    );
}