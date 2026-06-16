## v1.0.0

한 줄 요약: 사용자 목록에서 이메일을 추출·검증·정규화하는 경량 JavaScript 유틸리티 첫 공개 릴리스입니다.

### ✨ 기능
- **이메일 형식 검증** (`validator.js`) — RFC 5322 정규식과 RFC 3696 길이 제한(로컬 64자, 전체 254자) 적용
- **이메일 추출** (`extractEmails`) — 사용자 객체 배열에서 `email` 필드 추출
- **유효 이메일 필터링** (`getValidEmails`) — 검증을 통과한 이메일만 반환
- **중복 제거** (`uniqueValidEmails`) — 유효 이메일 목록에서 중복 제거
- **이메일 정규화** (`normalizeEmail`) — 앞뒤 공백 제거 및 도메인 소문자 변환
- **데모 엔트리** (`src/index.js`) — 샘플 사용자 목록으로 추출 기능 시연

### 🐛 버그 수정
- IP 리터럴 도메인(`user@[192.168.0.1]`) 검증 시 불법 옥텟(예: `256`, `00`)을 허용하던 정규식 패턴 수정

### 🧹 기타
- ES Module(`"type": "module"`)로 전환
- Node.js 내장 테스트 러너(`node:test`) 기반 단위 테스트 추가 (`npm test`)
- `docs/validator.md` 검증 모듈 스펙 문서 추가
- 프로젝트 README 및 코딩 규칙(`.cursor/rules/coding-style.mdc`) 정리
- 외부 npm 의존성 없이 Node.js 내장 기능만 사용
