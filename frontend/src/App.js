import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [activeTag, setActiveTag] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/notes/${id}`);
      if (response.data.success) {
        setNotes((prev) => prev.filter((n) => n.id !== id));
      }
    } catch (err) {
      console.error('노트 삭제 실패:', err);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/notes/${id}`, updates);
      if (response.data.success) {
        setNotes((prev) => prev.map((n) => (n.id === id ? response.data.data : n)));
      }
    } catch (err) {
      console.error('노트 수정 실패:', err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Study Note</h1>
        <p>나의 학습 노트를 기록하세요</p>
      </header>
      <main className="app-main">
        <NoteForm onSave={handleSave} />
        <NoteList
          notes={notes}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          activeTag={activeTag}
          onTagClick={setActiveTag}
        />
      </main>
    </div>
  );
}

export default App;
