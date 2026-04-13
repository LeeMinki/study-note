import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function NoteList({ notes, onDelete, onUpdate, activeTag, onTagClick, hasMore, loadingMore, onLoadMore }) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loadingMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );
    const el = sentinelRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, loadingMore, onLoadMore]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const date = d.toLocaleDateString('ko-KR');
    const time = d.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return `${date} ${time}`;
  };

  return (
    <div className="note-list">
      {activeTag && (
        <div className="filter-bar">
          <span className="filter-tag">#{activeTag}</span>
          <button className="filter-clear" onClick={() => onTagClick(null)}>
            전체 보기
          </button>
        </div>
      )}
      {notes.length === 0 ? (
        <p className="empty-message">저장된 노트가 없습니다.</p>
      ) : (
        <>
          <h2>노트 목록 ({notes.length})</h2>
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onTagClick={onTagClick}
              formatDate={formatDate}
            />
          ))}
        </>
      )}
      <div ref={sentinelRef} className="sentinel" />
      {loadingMore && <p className="loading-more">불러오는 중...</p>}
    </div>
  );
}

function NoteCard({ note, onDelete, onUpdate, onTagClick, formatDate }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editTags, setEditTags] = useState((note.tags || []).join(', '));

  const handleSave = () => {
    const tags = editTags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);
    onUpdate(note.id, { title: editTitle, content: editContent, tags });
    setEditing(false);
  };

  const codeComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="note-card">
      {editing ? (
        <>
          <input
            className="form-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            className="form-textarea"
            rows={6}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <input
            className="form-input"
            value={editTags}
            onChange={(e) => setEditTags(e.target.value)}
            placeholder="태그 (쉼표로 구분)"
          />
          <div className="card-actions">
            <button className="btn-save" onClick={handleSave}>
              저장
            </button>
            <button className="btn-cancel" onClick={() => setEditing(false)}>
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="card-header">
            <h3 className="note-title">{note.title}</h3>
            <div className="card-actions">
              <button className="btn-edit" onClick={() => setEditing(true)}>
                수정
              </button>
              <button className="btn-delete" onClick={() => onDelete(note.id)}>
                삭제
              </button>
            </div>
          </div>
          <div className="note-content markdown-body">
            <ReactMarkdown components={codeComponents}>{note.content}</ReactMarkdown>
          </div>
          {note.tags && note.tags.length > 0 && (
            <div className="note-tags">
              {note.tags.map((tag) => (
                <span key={tag} className="tag-badge" onClick={() => onTagClick(tag)}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <span className="note-date">{formatDate(note.date)}</span>
        </>
      )}
    </div>
  );
}

export default NoteList;
