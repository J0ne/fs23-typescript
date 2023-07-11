import React, { useEffect, useState } from 'react';
import './App.css';

import { Diary } from './types';
import diaryService from './services/diaries';
import { Content } from './components/content';
import { AddDiaryForm } from './components/addDiaryForm';

function App() {

  const [diaries, setDiaries] = useState<Diary[]>([]);

    useEffect(() => {
    void fetchDiaries();
  }, []);

  // update diearies
  const fetchDiaries = async () => {
    const diaries = await diaryService.getAll();
    setDiaries(diaries);
  };



  return (
    <div className="App">
      <header className="App-header">
      <h1>Diaries</h1>
      </header>
        <AddDiaryForm onSubmit={() => fetchDiaries()} />
      <div>
        <Content diaries={diaries} />
      </div>

    </div>
  );
}

export default App;
