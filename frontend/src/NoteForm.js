import { useState } from 'react';
import axios from 'axios';

function NoteForm({ onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/notes', {
        title,
        content,
        tags,
        date: new Date().toISOString(),
      });
      if (response.data.success) {
        onSave(response.data.data);
        setTitle('');
        setContent('');
        setTagsInput('');
      }
    } catch (err) {
      console.error('노트 저장 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
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
        placeholder="내용 (마크다운 지원 · Enter로 저장 · Shift+Enter로 줄바꿈)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        className="form-textarea"
        rows={4}
      />
      <input
        type="text"
        placeholder="태그 (쉼표로 구분: React, JavaScript, ...)"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        className="form-input"
      />
      <button type="submit" className="form-button" disabled={loading}>
        {loading ? '저장 중...' : '저장'}
      </button>
    </form>
  );
}

export default NoteForm;
