import  { Diary }  from "../types";

interface ContentProps {
    diaries: Diary[];
}

export const Content = ({ diaries }: ContentProps) :JSX.Element => {
    return (
         <div>
            {diaries.map(diary => (
                <div className="content" key={diary.id}>
                    <p><span className="bold">Date:</span><span className="diary">{diary.date}</span></p>
                    <p><span className="bold">Weather:</span><span className="diary">{diary.weather}</span></p>
                    <p><span className="bold">Visibility:</span><span className="diary">{diary.visibility}</span></p>
                    <p><span className="bold">Comment:</span><span className="diary">{diary.comment}</span></p>
                </div>
            ))}
        </div>
    );
};
