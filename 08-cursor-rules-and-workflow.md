# Chapter 8. Cursor Rules와 Workflow

앞선 챕터에서 우리는
- Agent
- Context Engineering
- Cursor의 철학
을 이해했다.

이제 그 개념들을
**지속 가능하고 반복 가능한 구조**로 만드는 단계가 바로
**Rules와 Workflow**이다.

Rules는 Cursor의 행동 원칙이며,
Workflow는 Agent가 일을 수행하는 절차이다.

---

## 8.1 Instruction 구성 요소

Cursor에서 Agent의 행동은
여러 계층의 Instruction에 의해 결정된다.

본 강의에서는 이를
다음 세 가지로 구분한다.

- System Prompt
- User Rules
- Project Rules

---

### 8.1.1 System Prompt

**System Prompt**는
Cursor 내부에서 기본적으로 적용되는 규칙이다.

- 모델의 기본 성향
- 안전 정책
- 일반적인 응답 방식

개발자가 직접 수정할 수는 없지만,
이 계층이 존재한다는 사실을 이해하는 것은 중요하다.

👉 모든 지시는
System Prompt 위에서 동작한다.

---

### 8.1.2 User Rules

**User Rules**는
사용자 개인의 선호와 작업 방식을 정의한다.

예시:
- 코드 스타일 선호
- 주석 작성 방식
- 설명 수준

User Rules의 특징:
- 개인 계정 단위
- 모든 프로젝트에 공통 적용
- 생산성에 큰 영향

👉 User Rules는
**개발자의 성격을 반영**한다.

---

### 8.1.3 Project Rules

**Project Rules**는
특정 프로젝트에만 적용되는 규칙이다.

예시:
- 아키텍처 규칙
- 사용 금지 라이브러리
- 네이밍 컨벤션
- 보안 정책

Project Rules의 특징:
- 팀 단위 공유 가능
- 일관성 유지에 핵심
- 실무에서 가장 중요

👉 Project Rules는
**팀의 합의가 코드로 표현된 것**이다.

---

## 8.2 User Rules vs Project Rules

두 Rule은 목적이 다르다.

| 구분 | User Rules | Project Rules |
|----|-----------|--------------|
| 범위 | 개인 | 프로젝트 |
| 공유 | X | O |
| 변경 빈도 | 잦음 | 적음 |
| 목적 | 생산성 | 일관성 |

### 중요한 원칙

- 개인 취향은 User Rules
- 팀 규칙은 Project Rules

이를 혼동하면:
- 팀 코드가 흔들리고
- 리뷰 비용이 증가한다.

---

## 8.3 Workflow 설계

Rules가 “정책”이라면,
Workflow는 **실행 절차**이다.

본 강의에서는
Agent 작업을 다음 세 단계로 나눈다.

> **Phase 0 → Phase 1 → Phase 2**

---

### 8.3.1 Phase 0: 준비 단계

- 작업 목표 정의
- 작업 범위 지정
- 관련 파일 선택
- 제약 조건 명시

👉 Phase 0가 부실하면,
이후 단계는 모두 흔들린다.

---

### 8.3.2 Phase 1: 실행 단계

- Agent에게 작업 위임
- 중간 결과 확인
- 필요 시 추가 지시

이 단계에서는:
- 모든 것을 한 번에 맡기지 않는다
- 작은 단위로 나눈다

---

### 8.3.3 Phase 2: 검증 및 정리 단계

- 결과 코드 리뷰
- 테스트 수행
- Context 압축
- Rule 보완

👉 이 단계가
다음 작업의 품질을 결정한다.

---

## 8.4 실습: Rules 적용 전/후 비교

### 8.4.1 Rules 적용 전

- 매번 설명이 다름
- 코드 스타일 불일치
- Agent 행동 예측 불가
- 결과물 품질 편차 큼

개발자는:
- 계속 지시해야 하고
- 계속 수정해야 한다.

---

### 8.4.2 Rules 적용 후

- 일관된 결과
- 예측 가능한 Agent 행동
- 리뷰 포인트 감소
- 작업 속도 향상

Agent는:
- “눈치 보는 존재”가 아니라
- “규칙을 따르는 팀원”이 된다.

---

## 8.5 Chapter 8 정리

- Rules는 Agent의 행동 원칙이다
- Instruction은 System → User → Project 계층으로 구성된다
- User Rules와 Project Rules는 목적이 다르다
- Workflow는 Phase 0~2로 설계한다
- Rules 적용 전/후의 차이는 매우 크다

---

➡ 다음 장에서는  
**「MCP(Model Context Protocol)와 확장」**을 통해  
Cursor를 외부 세계와 연결하는 방법을 살펴본다.
