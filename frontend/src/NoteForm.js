import { useState } from 'react';
import axios from 'axios';

function NoteForm({ onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/notes', {
        title,
        content,
        date: new Date().toISOString(),
      });
      if (response.data.success) {
        onSave(response.data.data);
        setTitle('');
        setContent('');
      }
    } catch (err) {
      console.error('노트 저장 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>새 노트 작성</h2>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="form-textarea"
        rows={4}
      />
      <button type="submit" className="form-button" disabled={loading}>
        {loading ? '저장 중...' : '저장'}
      </button>
    </form>
  );
}

export default NoteForm;
