import React, { useEffect, useState } from 'react';
import './App.css';

import { Diary } from './types';
import diaryService from './services/diaries';
import { Content } from './components/content';

function App() {

  const [diaries, setDiaries] = useState<Diary[]>([]);

    useEffect(() => {

    const fetchDiaries = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };

    void fetchDiaries();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <h1>Diaries</h1>
      </header>
      <div className="content">
        <Content diaries={diaries} />
      </div>

    </div>
  );
}

export default App;
