# Study Note 앱

개인 학습 내용을 기록하고 관리하는 웹 애플리케이션입니다.

## 기술 스택

- **Frontend**: React 18 (포트 3000)
- **Backend**: Node.js + Express (포트 4000)
- **통신**: REST API (JSON)

## 프로젝트 구조

```
/
├── frontend/       # React 클라이언트
├── backend/        # Node.js Express 서버
└── README.md
```

## 시작하기

### 1단계: 의존성 설치 (필수 선행)

> ⚠️ `npm run dev`를 실행하기 전에 반드시 아래 명령어를 먼저 실행해야 합니다.  
> 루트의 `concurrently` 패키지가 설치되지 않으면 `npm run dev` 실행 시 오류가 발생합니다.

```bash
npm run install:all
```

이 명령어 하나로 루트·frontend·backend 의존성이 모두 설치됩니다.

### 2단계: 개발 서버 실행

```bash
# 프론트엔드 + 백엔드 동시 실행
npm run dev

# 개별 실행
npm run dev:frontend   # React (http://localhost:3000)
npm run dev:backend    # Express (http://localhost:4000)
```

## Windows PowerShell 주의사항

Windows 환경에서 `npm run dev` 실행 시 아래와 같은 오류가 발생할 수 있습니다:

```
'concurrently'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는 배치 파일이 아닙니다.
```

**해결 방법**: `npm run install:all`을 먼저 실행하면 해결됩니다.

## API 명세

| Method | Endpoint | 설명 |
|--------|----------|---------|
| GET | `/api/notes` | 전체 노트 조회 |
| POST | `/api/notes` | 노트 생성 |

### 응답 형식

```json
{ "success": true, "data": ..., "error": null }
```
