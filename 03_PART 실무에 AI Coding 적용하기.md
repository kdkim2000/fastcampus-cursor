# 실무에 AI Coding 적용하기

## AI 활용에서의 보안 문제

### 목차
1. **'위임'에는 반드시 '신뢰'라는 전제조건이 따른다**
2. **아웃바운드 리스크, 소스코드 유출**
3. **인바운드 리스크, 보안취약점 노출**

### AI를 바라보는 관점은 '협업'에서 '위임'으로 넘어갑니다

- **협업(Collaboration)**: AWS에 CI/CD 구축하는 방법 알려줄래?
- **위임(Delegation)**: 구글, 네이버 로그인 기능 구현해줘

### '위임'에는 반드시 '신뢰'라는 전제조건이 따른다

> "신뢰"할 수 있나요?

특징: 기억력에 제한이 있음

### Outbound Risk

- 정보 유출

블룸버그는 2일(현지시간) 삼성전자가 기업 비밀 유출을 방지하기 위해 챗GPT 등 생성 인공지능(AI) 사용을 금지했다고 보도했다.

### Inbound Risk

- 취약점 유입

연구 내용: 스탠포드 대학과 뉴욕대 연구팀은 GitHub Copilot이 생성하는 코드의 보안 품질을 분석했습니다. 다양한 프로그래밍 언어(Python, C, JavaScript 등)와 시나리오(예: SQL 쿼리 작성, 암호화 로직 구현)에 걸쳐 테스트를 진행했습니다.

테스트한 시나리오 중 약 **40%**에서 AI가 생성한 코드에 잠재적인 보안 취약점이 포함되어 있었습니다.

### 나도 모르게 AI에게 Context(정보꾸러미)를 전달할 수 있습니다

- **Context**: ChatGPT, Claude, Gemini

### 최소 권한 부여

- "이번 작업에는 src/payment 디렉토리 내 파일만 읽기 권한으로 접근할 수 있다"

### 명시적 접근 금지

- "작업 중 config/*, secrets/*, .env 파일에 절대 접근하지 마라"

### 데이터 마스킹

- AI에게 실제 운영 데이터가 아닌, 모든 민감 정보가 마스킹된 데이터를 제공하여 민감정보 노출 방지

> AI가 작업할 환경의 가이드라인을 설계해야 합니다

## XSS 크로스 사이트 스크립트

"사용자 프로필 페이지에 방문자 환영 메시지를 표시하는 기능을 만들어줘. 메시지 내용은 URL 쿼리 파라미터에서 가져와."

```javascript
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('username');

    const messageElement = document.getElementById('welcome-message');
    // [위험!] AI가 사용자 입력을 검증 없이 그대로 HTML에 삽입
    messageElement.innerHTML = `환영합니다, ${userName}님!`;
};
```

> HTML에 그대로 삽입하면 악성 스크립트를 삽입할 수 있음

## Inbound Risk를 제어하는 방법

- 회사의 보안 코딩 가이드를 컨텍스트에 명시적으로 주입
  - "모든 SQL문은 반드시 파라미터화된 쿼리를 사용해야함"
- 안전한 의존성 정책 수립
  - "외부 라이브러리는 사전에 승인된 내부 라이브러리만 사용"
- 강제적인 검증을 통해 스스로 보안 품질을 높이도록 유도
  - "코드 생성 후, SonarQube 보안 스캔을 통과해야함"

## 신뢰하되, 검증하라

-로널드 레이건-

‘신뢰’는 AI가 안전하게 작동할 컨텍스트를 우리가 직접 설계함으로써 구축하고 ‘검증’은 우리가 설정한 자동화된 보안 게이트를 통해 이루어지도록 유도한다.

## 정리

- AI가 발생시키는 아웃바운드 취약점은 어떤 것이 있나요?
- AI가 발생시키는 인바운드 취약점은 어떤 것이 있나요?


# AI 도구별 보안정책

## 목차

1. Cursor의 보안정책 톺아보기
2. Claude Code의 보안정책 톺아보기

## 회사에서 AI 코딩 도구를 활용할 수 있을까?

1. 상용 AI 서비스 사용
   - Privacy mode로 사용
   - Cursor와 같은 서비스의 Privacy를 보호하는 기능 활성화
2. 내부에 LLM API 제공
   - 보안 환경 내 오픈소스 활용
   - 자체 LLM을 오픈소스와 연결하여 사용 (성능 문제가 있을 수 있음)
3. 소스코드를 외부에서 개발
   - 소스코드 머지 전략 수립 후 외부 작
   - 외부에서 Privacy mode로 작성한 코드를 내부로 주입한 후 머지하여 활용

## Cursor의 보안정책 톺아보기

- **Tab**을 통한 자동완성
- **Agent**를 통한 코드 일괄 수정
- **Inline Edit**을 통한 부분 수정

[그림: 보안 정책 대시보드]
- SOC 2 Type 1 및 Type 2 인증
- 인프라 보안, 조직 보안, 제품 보안, 내부 보안 절차, 데이터 및 프라이버시 관리

## Cursor Privacy Mode

Cursor는 **Privacy Mode**를 지원합니다. 이 모드는 사용자의 데이터를 학습하거나 제품 개선에 사용하지 않으며, 코드를 저장하지 않습니다.

### Privacy Settings

- **Privacy Mode (Active)**
  - Background Agent: Enabled
  - OpenAI: Zero Data Retention
  - Anthropic: Zero Data Retention
  - Google Vertex AI: Zero Data Retention
  - xAi Grok: Zero Data Retention

### Zero Data Retention

**Zero Data Retention**은 고객 콘텐츠를 남용 모니터링 로그에서 제외하며, 일부 엔드포인트 동작을 변경하여 데이터 저장을 방지합니다. 예를 들어, `/v1/responses` 및 `/v1/chat/completions`의 `store` 매개변수는 항상 `false`로 처리됩니다.

## AI 요청

Cursor는 AI 요청을 서버에 전송하여 기능을 제공합니다. 이 요청에는 파일, 대화 기록, 언어 분석 정보 등이 포함됩니다. 데이터는 AWS의 인프라를 통해 전송됩니다.

현재 Cursor는 OpenAI, Azure, Anthropic의 엔터프라이즈 배포를 지원하지 않습니다. Fireworks의 사용자 지정 모델을 통해 AI 경험을 제공합니다.

## 코드베이스 인덱싱

Cursor는 코드베이스를 의미적으로 인덱싱하여 검색 및 분석을 지원합니다. 인덱싱 기능은 파일의 해시를 계산하고, 서버와 동기화합니다.

- **TurboBuffer**: 파일 검색 결과를 필터링하여 빠른 검색을 지원합니다.
- **Exa and SerpApi**: 웹 검색 기능을 제공합니다.

## Claude Code의 보안정책 톺아보기

Claude Code는 설정 파일을 통해 권한과 행동을 제어할 수 있습니다.

### 설정 파일

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test:*)",
      "Read(~/.zshrc)"
    ],
    "deny": [
      "Bash(curl:*)"
    ]
  },
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp"
  }
}
```

### 권한 시스템

- **허용 규칙**: 승인 없이 도구 사용 가능
- **거부 규칙**: 사용 방지
- **추가 디렉토리**: 파일 접근 확장
- **기본 모드**: 새로운 요청 시 권한 제어

### 권한 관리 정책

Claude Code는 계층별로 설정 파일을 두고 권한 레벨을 제어할 수 있습니다.

- **설정 우선순위**
  1. 엔터프라이즈 정책
  2. 명령줄 인수
  3. 로컬 프로젝트 설정
  4. 공유 프로젝트 설정
  5. 사용자 설정

### 개발 컨테이너 설정 지원

- **Devcontainer 설정**
- **권한 기반 아키텍처 지원**
- **프롬프트 인젝션 보호**
- **MCP 보안 및 권한관리**

### 프롬프트 인젝션을 통한 서비스 지침 유출

대부분의 서비스들의 전략과 노하우가 올라와 있다. X.AI의 Grok4는 1시간도 안되어 프롬프트가 유출되었다.

### MCP의 취약점을 활용한 공격

> **SUPABASE MCP CAN LEAK YOUR PRIVATE SQL TABLES.**

### AI는 어디까지 영향을 미칠까

- **AI의 권한**: AI에게 어디까지 허용해야 하는가?
- 인간이 통제할 수 있다는 믿음으로 AI를 제어
- AI에게 인간과 동등한 보안 등급 부여

### 정리

- 각 도구별(Cursor, Claude Code) 보안 정책은 어떻게 되어있나?
- AI로 발생할 수 있는 취약점은 무엇이 있을까?
- AI에게도 인간과 동등한 보안 정책을 적용해야 할까?

---
## Cursor란 무엇인가?

### 목차

1. **Cursor는 어떤 도구인가**
2. **왜 Cursor인가?**
3. **Context Engineering 기법을 훈련할 때 최적의 도구**

### Cursor는 어떤 도구인가

3년 만에 기업가치 약 100억 달러로 평가받는 AI 시대에서 Model 개발사가 아닌 서비스 회사 중 Perplexity와 함께 선두에 있는 회사. 약 3000만 명의 사용자가 있다고 알려져 있다.

### 왜 Cursor인가?

- **시각적 인지**: 개발자가 Context의 흐름을 실시간으로 인지할 수 있다.
- **코드 품질**: 적절하게 Context를 구성하고 의도에 맞는 코드를 생성한다.

## 개발을 할 때 필요한 정보 꾸러미들

- **요구사항**
  - 로그인 기능을 구현해 주시고, Google 로그인과 Github 로그인 버튼 넣어주세요.

- **수정해야할 소스코드**
  - `@userComponent`를 수정해서 여러 User를 선택하는 기능을 개발해주세요.

- **연관된 소스코드**
  - `@userComponent`의 State를 수정했을 때 `@UserSelectModal.tsx`에 영향이 있습니다.

- **Library & Framework 문서**
  - 최신 React.js와 Next.js의 Server Component 기능을 활용해서 Component 구성해 주세요.

- **동작과정(프로세스)**
  - `userComponent`를 통해 로그인시, 로그인 버튼이 클릭하면 사용자 모달로 이동해 주세요.

- **코드 작성 규칙**
  - XSS 인젝션을 조심해서 작성해 주세요.
  - 변수명은 OOO를 prefix로 붙이세요.

## Context 생애주기를 명확하게 인지

- **Agent**가 실시간으로 동작하는 것을 눈으로 확인할 수 있습니다.
- **Rules**를 구조화하여 Agent의 행동을 유도할 수 있습니다.
- 여러 **Context**를 고려하여 좋은 품질의 코드를 생성할 수 있습니다.
- **Rules**와 **MCP Server**를 활용하여 Context를 주입할 수 있습니다.

## Context Engineering 기법을 훈련할 때 최적의 도구

1. **Select (선택)**
2. **Isolate (격리)**
3. **Write (기록)**
4. **Compress (압축)**

## Context 관리가 용이합니다

### Cursor로 Context 조절하는 방법

- **Select (선택)**
  - '@' 기능 활용, MCP 및 Rules를 활용해서 어떤 정보를 가져올지 선택

- **Isolate (격리)**
  - Rule Chaining을 통해 Guide line 제시

- **Write (기록)**
  - 별도의 Context memory를 구축하고 MCP로 연결

- **Compress (압축)**
  - Token 소모를 줄이기 위한 컨텍스트 압축 기법 실시

## Cursor라는 도구를 활용해서 나만의 Coding Agent를 만드는 것

## 정리

- **Cursor**는 어떤 회사인가요?
- 왜 **Cursor**를 사용할까요?
- **Cursor**로 Context를 관리하려면 어떻게 해야할까요?


## Cursor 설치 및 기초 사용법

### 목차

1. **Cursor**를 직접 설치해보자
2. **Cursor Rules**에 대해 알아보자
3. **MCP**에 대해 알아보자

### Cursor Download

[그림: Cursor Download]
- AI 코드 에디터인 Cursor를 다운로드하여 설치합니다. 다양한 운영체제에서 사용할 수 있습니다.

### Sign In

[그림: Sign In]
- Cursor에 로그인합니다. 이메일 또는 Google, GitHub, Apple 계정을 통해 로그인할 수 있습니다.

### Cursor Setting

[그림: Cursor Setting]
- Cursor의 설정 화면입니다. 다양한 옵션을 통해 사용자 환경을 맞춤 설정할 수 있습니다.

### Privacy Mode 확인

[그림: Privacy Mode 확인]
- Privacy Mode 설정을 통해 데이터 보호를 강화할 수 있습니다. 이 모드에서는 코드가 저장되지 않습니다.

### Model 설정

[그림: Model 설정]
- 다양한 모델을 선택하여 사용할 수 있습니다. 각 모델은 다른 기능과 성능을 제공합니다.

### Codebase Indexing 확인

[그림: Codebase Indexing 확인]
- 코드베이스 인덱싱을 통해 코드의 문맥 이해를 향상시킬 수 있습니다. 모든 코드는 로컬에 저장됩니다.

## Network 설정

[그림: Network 설정]
- **HTTP Compatibility Mode**: HTTP/2는 낮은 지연 시간 스트리밍을 위해 권장됩니다. 일부 기업 프록시 및 VPN 환경에서는 호환 모드를 낮춰야 할 수 있습니다.

## Cursor Rules

- **User Rules**: ID에 종속되어 전역으로 동작
- **Project Rules**: Project별로 동작

## MCP(Model Context Protocol)란?

2024년 11월, Anthropc의 엔지니어들이 발표한 규약입니다. **MCP**는 AI모델이 외부 데이터/도구와 쉽게 상호작용할 수 있도록 표준화된 연결방식을 제공하는 오픈 프로토콜입니다.

## MCP 기본 구조

[그림: MCP 기본 구조]
- MCP는 USB 규격과 같이 각종 도구들이 host들과 연결할 수 있도록 합니다.

## Tools & Integrations

[그림: Tools & Integrations]
- **MCP Tools**: 다양한 MCP 서버와의 통합을 지원합니다.

## 정리

- Cursor를 설치하는 방법과 기본 세팅 방법은 무엇인가요?
- Cursor의 Rules와 MCP는 어떤 기능을 하나요?


# Rules 설정으로 Cursor를 강화해보자

## 목차

1. 지시사항과 Rule의 관계
2. User Rules와 Project Rules
3. 실습을 통한 Rules 설정
```

```markdown
# Rule은 전체 지시사항의 일부

사용자 입력 프롬프트와 **Rules**를 전부 결합해서 하나의 **Instruction**(지시사항)을 만든다.

[그림: Instruction 구성 요소]
- User Prompt
- User Rules
- Project Rules

## Instruction의 구성

**Instruction**은 반복적인 요청사항과 신규 요청사항으로 나뉜다.

[그림: Instruction의 흐름]
- User Prompt
- 반복적인 Prompt
- 새로운 Prompt
- AI 처리 후 결과

## Cursor Agent의 규칙

**Cursor Agent**가 '항상' 지켜야 하는 규칙은 **반복 Prompt**이다.

### 반복 Prompt의 구성 요소
- 프로젝트 목표
- 프로젝트 구조
- 필수 라이브러리
  - React 18 + TypeScript
  - Tailwind CSS
  - shadcn/ui
  - TanStack Query

## User Rules와 Project Rules

[그림: User Rules와 Project Rules의 구성]
- Front End Project
  - F/E Project 구조
  - F/E Workflow
  - 공통컴포넌트 가이드
- Back End Project
  - B/E Project 구조
  - B/E Workflow 1
  - 보안 개발 가이드
  - B/E2 Workflow 2

## Instruction의 세부 구성

[그림: Instruction의 세부 구성]
- System Prompt
- User Rules
- User Prompt
- Project Rules

## Tool (MCP)와의 결합

[그림: Instruction과 MCP의 결합]
- MCP1, MCP2, MCP3
- WEB, Figma, Database, Notion

## 실습과정

1. Rules 설정하는 방법
2. Cursor Directory에서 Rules 가져오기
3. Rules 동작과정 확인하기
4. Rule 적용/미적용 결과 비교


# MCP를 활용해 Cursor를 강화해보자

## 목차

1. MCP의 기본 구조
2. MCP Server가 하는 일
3. Cursor MCP 설치 실습

# MCP 기본 구조

MCP는 USB 규격과 같이 각종 도구들이 **host**들과 연결할 수 있도록 합니다.

[그림: MCP 아키텍처]
MCP는 다양한 클라이언트와 서버가 연결되어 있으며, 각종 도구와 호스트 간의 연결을 지원합니다.

## MCP Server가 하는 일

### Context Import (Collect)
- DB에서 데이터를 가져온다.
- 업로드된 파일을 읽어서 Text 형태로 가져온다.
- 웹검색을 통해서 최신 정보를 가져온다.

### Result Export (Action)
- Figma MCP를 통해 디자인을 생성한다.
- Notion에 결과값을 입력한다.
- Jira에 완료 내용을 요약하고 status를 변경한다.

## MCP Client (Cursor)

MCP 클라이언트는 다양한 도구와의 통합을 지원하며, 설정을 통해 여러 MCP 서버와 연결할 수 있습니다.

## Remote MCP Server

### Anthropic MCP Connector
- **주요 기능**: MCP 클라이언트를 구현하여 직접 MCP 서버에 연결
- **제한 사항**: 서버는 HTTP를 통해 통신하며, OAuth 인증을 지원

### Linear Remote MCP
- **기능**: 다양한 도구와의 통합을 통해 MCP 서버와의 연결을 지원

## Local MCP Server

Local MCP 서버는 다양한 기능을 제공하며, 사용자 정의 설정을 통해 MCP 환경을 구성할 수 있습니다.

## Instruction(지시사항) + Tool (MCP)

- **System Prompt**: 시스템 지시사항
- **User Rules**: 사용자 규칙
- **User Prompt**: 사용자 입력
- **Project Rules**: 프로젝트 규칙


## 요구사항을 바탕으로 Cursor 환경 구성하기