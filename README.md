# cursor-demo

Cursor IDE 데모 프로젝트입니다. 사용자 목록에서 이메일을 추출·검증·정규화하는 경량 JavaScript 유틸리티를 제공합니다. 외부 npm 패키지 없이 Node.js 내장 기능만 사용합니다.

## 주요 기능

- **이메일 추출** — 사용자 객체 배열에서 `email` 필드를 추출
- **형식 검증** — RFC 5322 정규식과 RFC 3696 길이 제한 기반 검증
- **유효 이메일 필터링** — 검증을 통과한 이메일만 반환
- **중복 제거** — 유효 이메일 목록에서 중복 제거
- **정규화** — 앞뒤 공백 제거 및 도메인 소문자 변환

## 기술 스택

| 항목 | 내용 |
|------|------|
| 런타임 | Node.js |
| 모듈 형식 | ES Module (`import` / `export`) |
| 테스트 | Node.js 내장 테스트 러너 (`node:test`) |
| 외부 의존성 | 없음 |

## 프로젝트 구조

```
cursor-demo/
├── src/
│   ├── index.js        # 엔트리 포인트 (데모 실행)
│   ├── email.js        # 이메일 추출·필터링·정규화
│   ├── validator.js    # RFC 5322 이메일 형식 검증
│   └── email.test.js   # 단위 테스트
├── docs/
│   └── validator.md    # validator.js 스펙 문서 (AI 리뷰 기준)
├── .cursor/
│   └── rules/
│       └── coding-style.mdc  # 프로젝트 코딩 규칙
├── package.json
└── README.md
```

## 시작하기

### 요구 사항

- Node.js 18 이상 (ES Module 및 `node:test` 지원)

### 설치

```bash
git clone https://github.com/sungdile/cursor-demo.git
cd cursor-demo
```

별도의 `npm install`은 필요하지 않습니다.

### 실행

```bash
node src/index.js
```

### 테스트

```bash
npm test
```

## API

### `validator.js`

#### `isValidEmail(email)`

이메일 문자열이 RFC 5322 형식과 RFC 3696 길이 제한을 만족하는지 검증합니다.

```js
import { isValidEmail } from './src/validator.js';

isValidEmail('alice@example.com');  // true
isValidEmail('invalid-email');      // false
```

**검증 규칙**

1. 문자열이 아니면 `false`
2. `@` 위치가 0 이하이면 `false` (로컬 파트 없음)
3. 로컬 파트 길이가 64자를 초과하면 `false`
4. 전체 길이가 254자를 초과하면 `false`
5. RFC 5322 정규식 통과 여부

### `email.js`

| 함수 | 설명 | 반환 타입 |
|------|------|-----------|
| `extractEmails(users)` | 사용자 배열에서 `email` 필드 추출 | `string[]` |
| `getValidEmails(users)` | 유효한 이메일만 필터링 | `string[]` |
| `uniqueValidEmails(users)` | 유효 이메일 중복 제거 | `string[]` |
| `normalizeEmail(email)` | 공백 제거 및 도메인 소문자 변환 | `string \| null` |

```js
import { extractEmails, getValidEmails, uniqueValidEmails, normalizeEmail } from './src/email.js';

const members = [
  { name: 'John', email: 'john@example.com' },
  { name: 'Bad', email: 'invalid' },
  { name: 'Jane', email: 'jane@example.com' },
];

extractEmails(members);
// ['john@example.com', 'invalid', 'jane@example.com']

getValidEmails(members);
// ['john@example.com', 'jane@example.com']

uniqueValidEmails(members);
// ['john@example.com', 'jane@example.com']

normalizeEmail('  John@Example.COM  ');
// 'John@example.com'
```

## 아키텍처

모듈 책임을 분리하여 검증 로직과 추출 로직을 독립적으로 유지합니다.

```
users (배열)
    │
    ▼
extractEmails()  ──► email 필드 추출
    │
    ▼
getValidEmails() ──► isValidEmail() (validator.js)
    │
    ▼
uniqueValidEmails() ──► 중복 제거
```

- **검증 로직**은 `validator.js`에만 존재합니다.
- **추출·필터링**은 `email.js`가 담당하며, `validator.js`의 `isValidEmail`을 import합니다.
- `email.js`는 `isValidEmail`을 re-export하여 하위 호환을 지원합니다.

## 코딩 규칙

`.cursor/rules/coding-style.mdc`에 정의된 규칙을 따릅니다.

- 주석과 커밋 메시지는 한국어로 작성
- JavaScript는 ES Module 문법만 사용
- 모든 함수에 JSDoc 주석 필수
- 외부 라이브러리 추가 시 사전 동의 필요

## 문서

이메일 검증 모듈의 상세 스펙은 [`docs/validator.md`](docs/validator.md)를 참고하세요. AI 리팩터링 및 코드 리뷰 시 기준 문서로 사용됩니다.

## 라이선스

ISC
