import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import Toast from './Toast';
import './App.css';

const PAGE_SIZE = 10;

function App() {
  const [notes, setNotes] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = (message, type = 'success') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast(null), 1500);
  };

  const fetchNotes = useCallback(async (currentOffset, replace = false) => {
    setLoadingMore(true);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/notes?limit=${PAGE_SIZE}&offset=${currentOffset}`
      );
      if (res.data.success) {
        const incoming = res.data.data;
        setNotes((prev) => (replace ? incoming : [...prev, ...incoming]));
        setHasMore(res.data.hasMore);
        setOffset(currentOffset + incoming.length);
      }
    } catch (err) {
      console.error('노트 불러오기 실패:', err);
    } finally {
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes(0, true);
  }, [fetchNotes]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loadingMore) {
      fetchNotes(offset);
    }
  }, [hasMore, loadingMore, offset, fetchNotes]);

  const handleSave = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
    showToast('노트가 저장되었습니다.');
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/notes/${id}`);
      if (res.data.success) {
        setNotes((prev) => prev.filter((n) => n.id !== id));
        showToast('노트가 삭제되었습니다.');
      }
    } catch (err) {
      showToast('삭제에 실패했습니다.', 'error');
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/notes/${id}`, updates);
      if (res.data.success) {
        setNotes((prev) => prev.map((n) => (n.id === id ? res.data.data : n)));
        showToast('노트가 수정되었습니다.');
      }
    } catch (err) {
      showToast('수정에 실패했습니다.', 'error');
    }
  };

  const filteredNotes = notes.filter((n) => {
    const matchTag = activeTag ? n.tags && n.tags.includes(activeTag) : true;
    const q = searchQuery.toLowerCase();
    const matchSearch = q
      ? n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
      : true;
    return matchTag && matchSearch;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Study Note</h1>
        <p>나의 학습 노트를 기록하세요</p>
      </header>
      <main className="app-main">
        <NoteForm onSave={handleSave} />
        <div className="search-bar-wrap">
          <input
            type="text"
            className="search-bar"
            placeholder="제목 또는 내용으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>
        <NoteList
          notes={filteredNotes}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          activeTag={activeTag}
          onTagClick={setActiveTag}
          hasMore={hasMore}
          loadingMore={loadingMore}
          onLoadMore={handleLoadMore}
        />
      </main>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;
