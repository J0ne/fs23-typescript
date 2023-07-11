
import {  TextField, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import diaryService from '../services/diaries';
import { NewDiaryEntry } from '../types';



interface Props {
    onSubmit: () => void;
}

export const AddDiaryForm = ({ onSubmit }: Props): JSX.Element => {

    const [date, setDate] = useState('');
    const [weather, setWeather] = useState('');
    const [visibility, setVisibility] = useState('');
    const [comment, setComment] = useState('');

    const addDiary = async (event: SyntheticEvent) => {
        event.preventDefault();
        const newDiary: NewDiaryEntry = {
            date,
            weather,
            visibility,
            comment
        };

        await diaryService.create(newDiary);
        onSubmit();
    };

    return (
        <form className='form' onSubmit={addDiary}>
        <h2>Add a Diary</h2>
        <div>
            <TextField
                label="Date"
                placeholder="YYYY-MM-DD"
                value={date}
                onChange={({ target }) => setDate(target.value)}
            />
        </div>
        <div>
            <RadioGroup row aria-label="visibility" name="row-radio-buttons-group"
            onChange={({ target }) => setVisibility(target.value)}>
                <FormControlLabel value="Great" control={<Radio />} label="Great" />
                <FormControlLabel value="good" control={<Radio />} label="Good" />
                <FormControlLabel value="ok" control={<Radio />} label="Ok" />
                <FormControlLabel value="poor" control={<Radio />} label="Poor" />
            </RadioGroup>
        </div>

        <div>
            <RadioGroup row aria-label="weather" name="row-radio-buttons-group"
            onChange={({ target }) => setWeather(target.value)}>
                    <FormControlLabel value="sunny" control={<Radio />} label="Sunny" />
                    <FormControlLabel value="rainy" control={<Radio />} label="Rainy" />
                    <FormControlLabel value="cloudy" control={<Radio />} label="Cloudy" />
                    <FormControlLabel value="stormy" control={<Radio />} label="Stormy" />
                    <FormControlLabel value="windy" control={<Radio />} label="Windy" />
            </RadioGroup>
        </div>
        <div>
            <TextField
                label="Comment"
                placeholder="Comment"
                multiline={true}
                rows={4}
                value={comment}
                onChange={({ target }) => setComment(target.value)}
            />
        </div>
        <div>
            <Button variant="contained" color="primary" type="submit">
                Add
            </Button>
        </div>
    </form>



    );




}
