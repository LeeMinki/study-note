# Study Note App 가이드라인

## 절대 규칙 (Core Rules)
- 코드의 변수명과 함수명은 반드시 영어로 작성한다.
- 주석, Git 커밋 메시지, GitHub PR 설명은 한국어로 상세하고 명확하게 작성한다.
- 사용자의 명시적인 허락 없이 불필요한 외부 라이브러리 설치를 금지한다.

## 아키텍처 (Architecture)
- Frontend: React (경로: /frontend)
- Backend: Node.js + Express (경로: /backend)
- 구조: 하나의 레포지토리에 프론트와 백엔드가 공존하는 모노레포 구조.
- 통신: 프론트엔드는 REST API를 통해 백엔드와 JSON 포맷으로 통신한다.

## 코딩 컨벤션 (Conventions)
- React 컴포넌트 파일명과 함수명은 PascalCase를 사용한다.
- Backend API 응답은 항상 { success: boolean, data: any, error: string | null } 형태를 유지한다.

## 주요 명령어 (Commands)
- npm run install:all : 루트 및 모든 하위 디렉토리(frontend, backend) 의존성 설치
- npm run dev:frontend : 프론트엔드 리액트 개발 서버 실행 (포트 3000)
- npm run dev:backend : 백엔드 노드 서버 실행 (포트 4000)
- npm run dev : 프론트엔드와 백엔드 동시 실행
- npm run jira:sync : Jira 티켓 확인 및 작업 브랜치 생성 자동화 스크립트 실행
