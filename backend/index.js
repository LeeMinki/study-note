const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;
const DATA_FILE = path.join(__dirname, 'data.json');

// 미들웨어
app.use(cors());
app.use(bodyParser.json());

// data.json 헬퍼 함수
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET /api/notes - 저장된 모든 노트 반환
app.get('/api/notes', (req, res) => {
  try {
    const notes = readData();
    res.json({ success: true, data: notes, error: null });
  } catch (err) {
    res.status(500).json({ success: false, data: null, error: err.message });
  }
});

// POST /api/notes - 새로운 노트 저장
app.post('/api/notes', (req, res) => {
  try {
    const { title, content, date } = req.body;
    const notes = readData();
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      date: date || new Date().toISOString(),
    };
    notes.push(newNote);
    writeData(notes);
    res.status(201).json({ success: true, data: newNote, error: null });
  } catch (err) {
    res.status(500).json({ success: false, data: null, error: err.message });
  }
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  res.status(500).json({ success: false, data: null, error: err.message });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
