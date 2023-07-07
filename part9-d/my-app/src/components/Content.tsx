
import { CoursePart } from "../types";

interface ContentProps {
    courseParts: CoursePart[];
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


export const Content = (props: ContentProps): JSX.Element =>  {

    // type Guard
    props.courseParts.forEach(part => {
        switch (part.kind) {
            case "basic":
                break;
            case "group":
                break;
            case "background":
                break;
            case "special":
                break;
            default:
                assertNever(part);
                break;
        }
    });

    const getAdditionalInfo = (part: CoursePart): JSX.Element => {
        switch (part.kind) {
            case "basic":
                return <p className="description" >{part.description} <br />
                </p>;
            case "group":
                return <p>Project exercises {part.groupProjectCount}
                </p>;
            case "background":
                return  <div>
                <p>Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
                 <p className="description">{part.description}</p>
                </div>;
            case "special":
                return <p className="required">Required skills: {part.requirements.join(", ")}</p>;
            default:
                return <></>;
        }
    };

    return (
        <div>
            {props.courseParts.map((part: CoursePart) => {
                return <div className="course-block" key={part.name} >
                  <p className="course-header"> {part.name} {part.exerciseCount}</p>
                    {getAdditionalInfo(part)}
                </div>;
            })}
        </div>
    );
}


