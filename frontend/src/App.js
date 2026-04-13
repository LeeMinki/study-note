import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/notes');
        if (response.data.success) {
          setNotes(response.data.data);
        }
      } catch (err) {
        console.error('노트 불러오기 실패:', err);
      }
    };
    fetchNotes();
  }, []);

  const handleSave = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Study Note</h1>
        <p>나의 학습 노트를 기록하세요</p>
      </header>
      <main className="app-main">
        <NoteForm onSave={handleSave} />
        <NoteList notes={notes} />
      </main>
    </div>
  );
}

export default App;
