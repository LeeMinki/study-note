# Study Note 앱

개인 학습 내용을 기록하고 관리하는 웹 애플리케이션입니다.

## 기술 스택

- **Frontend**: React (포트 3000)
- **Backend**: Node.js + Express (포트 4000)
- **통신**: REST API (JSON)

## 프로젝트 구조

```
/
├── frontend/   # React 클라이언트
├── backend/    # Node.js Express 서버
└── README.md
```

## 시작하기

### 의존성 설치

```bash
npm run install:all
```

### 개발 서버 실행

```bash
# 프론트엔드 + 백엔드 동시 실행
npm run dev

# 개별 실행
npm run dev:frontend   # React (http://localhost:3000)
npm run dev:backend    # Express (http://localhost:4000)
```
