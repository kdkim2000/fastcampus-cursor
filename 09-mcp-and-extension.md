# Chapter 9. MCP(Model Context Protocol)

앞선 장들에서 우리는
- Agent
- Context Engineering
- Cursor Rules와 Workflow
를 통해 IDE 안에서의 AI 활용을 다루었다.

이 장에서는
AI가 IDE 밖의 세계와 어떻게 연결되는지를 설명하는
**MCP(Model Context Protocol)** 를 다룬다.

---

## 9.1 MCP란 무엇인가

### 9.1.1 MCP의 배경

Agent 기반 AI가 본격적으로 활용되기 시작하면서
다음과 같은 문제가 등장했다.

- AI가 외부 시스템에 접근하지 못함
- 컨텍스트가 IDE 내부에 갇힘
- 도구마다 연동 방식이 제각각

즉,
**Context와 Action을 표준화할 필요**가 생겼다.

이 문제를 해결하기 위해 등장한 개념이
바로 MCP이다.

---

### 9.1.2 MCP의 철학

MCP의 핵심 철학은 단순하다.

> **AI는 스스로 세계를 알 수 없다.  
> Context와 Action은 명시적으로 제공되어야 한다.**

이를 위해 MCP는 다음을 분리한다.

- 모델(LLM)
- 컨텍스트 제공 방식
- 실행 가능한 액션

👉 AI는 판단하고,
👉 MCP는 연결한다.

---

## 9.2 MCP 구조

MCP는 다음 세 가지 구성 요소로 이루어진다.

- Host
- Client
- Server

이 구조는
AI와 외부 세계 사이의 역할을 명확히 나눈다.

---

### 9.2.1 Host

**Host**는
Agent가 실행되는 환경이다.

예시:
- Cursor
- AI IDE
- AI 실행 런타임

Host의 역할:
- Agent 실행
- 사용자 인터페이스 제공
- Context 관리

👉 Cursor는 MCP 관점에서
**대표적인 Host**이다.

---

### 9.2.2 Client

**Client**는
Host와 MCP Server를 연결하는 중간 계층이다.

- 요청 전달
- 응답 수신
- 데이터 변환

Client는:
- Host의 의도를 Server가 이해할 수 있게 하고
- Server의 결과를 Host가 사용할 수 있게 한다.

---

### 9.2.3 Server

**MCP Server**는
외부 세계와 실제로 연결되는 컴포넌트이다.

- 데이터베이스
- API
- 파일 시스템
- 내부 서비스

Server는
Agent에게 새로운 능력을 부여한다.

---

## 9.3 MCP Server의 역할

MCP Server의 역할은 크게 두 가지이다.

- Context Import
- Action Export

---

### 9.3.1 Context Import

**Context Import**란,
외부 정보를 AI에게 제공하는 기능이다.

예시:
- 사내 위키 문서
- API 스펙
- 데이터베이스 스키마
- 로그 정보

이를 통해 Agent는:
- 프로젝트 외부의 정보까지 참고할 수 있다.

👉 Context Import는
AI의 “시야”를 확장한다.

---

### 9.3.2 Action Export

**Action Export**란,
AI가 외부 시스템에
실제 행동을 수행할 수 있도록 하는 기능이다.

예시:
- API 호출
- 티켓 생성
- 배포 트리거
- 테스트 실행

즉,
AI는 더 이상 “말만 하는 존재”가 아니라,
**행동하는 존재**가 된다.

---

## 9.4 Cursor + MCP 활용

Cursor는 MCP를 통해
IDE를 넘어선 Agent 환경을 구성할 수 있다.

### 9.4.1 활용 예시

- 사내 문서 MCP Server 연동
- 테스트 자동 실행
- 코드 변경 후 CI 트리거
- 이슈 트래커 연동

이로써 Cursor는:
- 단순 코드 편집기가 아니라
- **업무 자동화 허브**가 된다.

---

### 9.4.2 MCP 활용 시 주의사항

- 보안 권한 철저 관리
- Action 범위 제한
- 로그 및 감사 필수

MCP는 강력하지만,
잘못 사용하면 리스크도 크다.

---

## 9.5 Chapter 9 정리

- MCP는 Context와 Action을 표준화한다
- MCP는 Host / Client / Server 구조로 구성된다
- MCP Server는 Context Import와 Action Export를 담당한다
- Cursor는 MCP를 통해 IDE 밖으로 확장된다
- MCP는 Agent 자동화의 핵심 인프라이다

---

➡ 다음 장에서는  
**「실무에 AI Coding 적용하기」**를 통해  
지금까지 배운 내용을 실제 업무 흐름에 적용한다.
