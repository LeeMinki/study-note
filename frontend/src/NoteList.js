function NoteList({ notes }) {
  if (notes.length === 0) {
    return <p className="empty-message">저장된 노트가 없습니다.</p>;
  }

  return (
    <div className="note-list">
      <h2>노트 목록 ({notes.length})</h2>
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <h3 className="note-title">{note.title}</h3>
          <p className="note-content">{note.content}</p>
          <span className="note-date">
            {new Date(note.date).toLocaleDateString('ko-KR')}
          </span>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
