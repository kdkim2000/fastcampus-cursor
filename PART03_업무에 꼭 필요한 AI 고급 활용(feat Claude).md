# 📘 업무에 꼭 필요한 AI 고급 활용

## 목차
1. [Agent란 무엇인가](#1-agent란-무엇인가)
2. [Agent에게 규칙을 부여하는 방법](#2-agent에게-규칙을-부여하는-방법)
3. [Agent의 System Prompt 톺아보기](#3-agent의-system-prompt-톺아보기)
4. [Agent가 Tools를 활용하는 방법](#4-agent가-tools를-활용하는-방법)
5. [Agent의 Memory에 대해](#5-agent의-memory에-대해)
6. [내가 일하는 방식을 분해하자](#6-내가-일하는-방식을-분해하자)
7. [Cursor 고급 기법을 활용한 개발 실습](#7-cursor-고급-기법을-활용한-개발-실습)
8. [조직에서의 AI 활용](#8-조직에서의-ai-활용)

---

## 1. 🤖 Agent란 무엇인가

### 1.1 🎬 우리가 알고 있는 영화 속 Agent의 이미지

영화 아이언맨의 **J.A.R.V.I.S.(자비스)**

자비스는 AI Agent의 이상적인 모델을 보여줍니다:
- 집안을 관리하고, 일정을 조율합니다
- 토니의 요청에 대한 조사와 분석을 수행합니다
- 음성인식으로 동작하며 사용자와 대화로 상호작용합니다
- 독립적으로 판단하고 행동합니다

이러한 이미지가 우리가 AI Agent에 기대하는 모습입니다.

---

### 1.2 🎯 AI Agent에 대한 OpenAI의 정의

**A practical guide to building agents**

> Agents are systems that **independently accomplish tasks** on your behalf.
> 
> (에이전트는 사용자를 대신하여 독립적으로 작업을 수행하는 시스템입니다.)

#### OpenAI가 정의하는 Agent의 핵심 특징

1. **높은 독립성**
   - 일반적인 소프트웨어는 워크플로우를 자동화하지만
   - 에이전트는 높은 독립성을 가지고 사용자 대신 작업을 수행합니다

2. **목표 지향적 워크플로우**
   - 에이전트는 사용자의 목표를 달성하기 위해
   - 일련의 단계를 실행하는 워크플로우를 가집니다

3. **LLM 기반 의사결정**
   - 에이전트는 LLM을 활용하여
   - 워크플로우를 관리하고 결정을 내립니다

---

### 1.3 🏗️ OpenAI가 생각하는 Agent 설계의 기초 요소

Agent를 구성하는 3가지 핵심 요소:

#### 1. Model 🧠
- 에이전트의 추론과 의사결정을 담당하는 LLM
- 사고의 중추 역할
- 상황을 분석하고 판단하는 주체

#### 2. Tools 🛠️
- 에이전트가 행동을 취할 수 있는 외부 함수나 API
- 실제 작업을 수행하는 수단
- 외부 시스템과의 상호작용 창구

#### 3. Instructions 📋
- 에이전트의 행동을 정의하는 명확한 지침
- 역할과 목표를 명시
- 행동 방식의 가이드라인

#### 코드 예시

```python
weather_agent = Agent(
    name="Weather agent",
    instructions="You are a helpful agent who can talk to users about the weather.",
    tools=[get_weather],
)
```

이 간단한 코드에서 Agent의 3가지 핵심 요소를 모두 볼 수 있습니다:
- **Model**: 암묵적으로 LLM이 추론 담당
- **Instructions**: "You are a helpful agent..." - 역할 정의
- **Tools**: `get_weather` - 날씨 정보를 가져오는 도구

---

### 1.4 🌐 Anthropic이 생각하는 Agentic System

Anthropic은 Agent를 **Agentic System**의 한 부분으로 봅니다. LLM이 스스로 작업을 통제하는 것을 의미합니다.

#### Agentic System의 두 가지 유형

##### 1. Workflows 🔄
**LLM과 도구가 사전 정의된 코드 경로를 통해 조정되는 시스템**

특징:
- 예측 가능한 실행 경로
- 명확한 단계별 진행
- 제어 가능한 프로세스

##### 2. Agents 🎭
**LLM이 자체 프로세스와 도구 사용을 동적으로 지시하는 시스템**

특징:
- 유연한 의사결정
- 상황에 따른 적응
- 창의적인 문제 해결

---

### 1.5 🔗 Workflow 유형: Prompt Chaining

**작업을 여러 단계로 분해해 각 LLM 호출이 이전 결과를 처리합니다.**

#### Prompt Chaining의 작동 방식

```
[입력] → [LLM 호출 1] → [출력 1]
           ↓
      [검증/처리]
           ↓
      [LLM 호출 2] → [출력 2]
           ↓
      [검증/처리]
           ↓
      [LLM 호출 3] → [최종 출력]
```

#### 장점
- **단계별 검증**: 각 단계에서 프로그래밍적 검사 가능
- **오류 조기 발견**: 중간 단계에서 문제 파악
- **프로세스 제어**: 올바른 진행 방향 확인
- **컨텍스트 관리**: 각 단계별 필요한 정보만 전달

#### 실제 적용 예시

1. **첫 번째 호출**: 사용자 요청 분석 및 작업 계획 수립
2. **중간 검증**: 계획이 요구사항에 부합하는지 확인
3. **두 번째 호출**: 계획에 따라 코드 생성
4. **중간 검증**: 생성된 코드의 문법 및 로직 검증
5. **세 번째 호출**: 테스트 케이스 생성
6. **최종 검증**: 전체 산출물 품질 확인

---

### 1.6 🚦 Workflow 유형: Routing

**입력을 분류해 특화된 후속 작업으로 보냅니다.**

#### Routing Workflow의 구조

```
              [입력]
                ↓
        [LLM Call Router]
        (분류 및 라우팅)
                ↓
    ┌───────────┼───────────┐
    ↓           ↓           ↓
[전문 작업 A] [전문 작업 B] [전문 작업 C]
    ↓           ↓           ↓
[출력 A]     [출력 B]     [출력 C]
```

#### Routing의 필요성

**관심사의 분리 (Separation of Concerns)**
- 각 작업별로 최적화된 처리 가능
- 더 전문화된 프롬프트 생성

**성능 최적화**
- 하나의 입력에 최적화하면 다른 입력에서 성능 저하 가능
- Routing을 통해 각 유형별 최적 처리

#### 실제 적용 예시

```
사용자 입력: "회원가입 기능을 만들어줘"
    ↓
Router 분석: "이것은 백엔드 API 작업입니다"
    ↓
Backend Agent로 라우팅
    ↓
- 데이터베이스 스키마 설계
- API 엔드포인트 구현
- 유효성 검증 로직 추가
```

vs

```
사용자 입력: "회원가입 화면을 만들어줘"
    ↓
Router 분석: "이것은 프론트엔드 UI 작업입니다"
    ↓
Frontend Agent로 라우팅
    ↓
- 컴포넌트 구조 설계
- 폼 UI 구현
- 클라이언트 유효성 검증
```

---

### 1.7 💻 Cursor에 Agent의 개념이 녹아있습니다

Cursor는 다양한 설정을 통해 **Agent**로서의 기능을 수행할 수 있습니다.

#### Cursor의 Agent 구성요소

##### 1. Models 🧠
- 다양한 모델을 설정할 수 있습니다
- Claude, GPT-4, Custom Models 등
- 작업 유형에 따라 최적 모델 선택 가능

##### 2. Tools & Integrations 🔧
- 외부 도구 및 통합 기능을 설정할 수 있습니다
- MCP Server 연결
- 파일 시스템 접근
- 터미널 명령 실행
- 웹 검색 및 크롤링

##### 3. Rules & Memories 📚
- 규칙과 메모리를 관리합니다
- Project Rules: 프로젝트별 규칙
- User Rules: 개인 전역 규칙
- Memory: 작업 이력 및 컨텍스트 저장

---

### 1.8 🎯 Cursor를 Agent로 바라보고 사용해야 합니다

**Cursor는 단순한 코드 편집기가 아닙니다. Agent로서 다음 작업들을 수행합니다:**

#### Agent로서의 Cursor 활용

1. **검색 (Search) 🔍**
   - 코드베이스 전체 검색
   - 관련 파일 자동 탐색
   - 의미론적 코드 검색

2. **편집 (Edit) ✏️**
   - 컨텍스트 기반 코드 수정
   - 다중 파일 동시 편집
   - 리팩토링 자동화

3. **명령 실행 (Execute) ⚡**
   - 터미널 명령 실행
   - 빌드 및 테스트 자동화
   - 배포 프로세스 관리

4. **분석 (Analyze) 📊**
   - 코드 품질 분석
   - 잠재적 버그 탐지
   - 성능 최적화 제안

5. **생성 (Generate) 🎨**
   - 새로운 코드 생성
   - 테스트 케이스 작성
   - 문서 자동 생성

#### 효과적인 Agent 활용을 위한 마인드셋

- **위임하는 사고**: "내가 할 일"이 아닌 "Agent에게 시킬 일"로 생각
- **명확한 지시**: Agent가 이해할 수 있도록 구체적으로 요청
- **피드백 제공**: Agent의 결과물을 검토하고 개선 방향 제시
- **점진적 학습**: Agent에게 Rules를 통해 지식 축적

---

## 2. 📋 Agent에게 규칙을 부여하는 방법

### 2.1 👤 김신입(Agent)에게 필요한 지시사항 (Instruction)

새로운 팀원인 김신입(Agent)에게 일을 시킨다고 상상해봅시다.

#### 명확한 지시사항의 예

```
✅ 좋은 지시사항:
- "당신이 할 일은 OOO입니다."
- "YY-001 요구사항을 보고 YYX파일 작성해 주세요."
- "작성된 YYX 파일을 바탕으로 YYX001.ts 파일 수정해 주세요."

❌ 나쁜 지시사항:
- "뭔가 해봐"
- "알아서 해"
- "그냥 좋게 만들어"
```

신입 직원에게 막연한 지시를 내리면 제대로 된 결과를 기대할 수 없듯이, Agent에게도 명확하고 구체적인 Instruction이 필요합니다.

---

### 2.2 🏗️ OpenAI가 생각하는 Agent 설계의 기초 요소 (재확인)

#### 3가지 핵심 요소

##### 1. Model 🧠
- **역할**: 에이전트의 추론과 의사결정을 담당하는 LLM
- **비유**: 사람의 두뇌
- **기능**: 상황 분석, 판단, 계획 수립

##### 2. Tools 🛠️
- **역할**: 에이전트가 사용할 수 있는 외부 함수나 API
- **비유**: 사람의 손과 도구
- **기능**: 실제 작업 수행, 정보 수집, 외부 시스템 연동

##### 3. Instructions 📜
- **역할**: 에이전트의 행동 방식을 정의하는 명시적인 가이드라인
- **비유**: 업무 매뉴얼, 회사 규정
- **기능**: 역할 정의, 행동 규칙, 제약사항 설정

#### 코드로 보는 Agent 구성

```python
weather_agent = Agent(
    name="Weather agent",  # Agent의 정체성
    instructions="You are a helpful agent who can talk to users about the weather.",  # 역할과 행동 방식
    tools=[get_weather],  # 사용 가능한 도구
)
```

---

### 2.3 🎯 Explicit Guidelines - Agent가 행동하도록 만들기

**Agent가 제대로 행동하도록 하려면 어떻게 해야 할까?**

#### WHY-HOW-WHAT 프레임워크

이 프레임워크는 Agent에게 완전한 컨텍스트를 제공합니다.

##### 1. WHY (나는 누구인가?) 🤔

**Agent의 정체성과 목적을 정의합니다.**

```
예시:
- "당신은 React 전문 개발 Agent입니다."
- "당신의 목표는 재사용 가능하고 유지보수하기 쉬운 컴포넌트를 만드는 것입니다."
- "당신은 FSD(Feature-Sliced Design) 아키텍처를 따릅니다."
```

**포함 내용:**
- AI Agent의 역할 부여
- AI Agent가 달성할 목표 정의
- AI Agent의 구조 및 설정 정의
- AI Agent의 가드레일 정의 (예: System Prompt)

##### 2. HOW (무엇을 어떻게 해야 하는가?) 🔧

**Agent의 작업 방식과 프로세스를 정의합니다.**

```
예시:
- "먼저 요구사항을 분석하고, 다음으로 컴포넌트 구조를 설계하세요."
- "코드를 작성하기 전에 항상 관련 파일들을 검토하세요."
- "TypeScript의 타입 안정성을 최우선으로 고려하세요."
```

**포함 내용:**
- AI Agent의 워크플로우 정의
- AI Agent의 Tool 활용 방식 정의 (예: Cursor Rules)
- 단계별 실행 순서
- 의사결정 기준

##### 3. WHAT (그래서 지금 할 일이 무엇인가?) ✅

**Agent가 현재 수행할 구체적인 작업을 정의합니다.**

```
예시:
- "Login 컴포넌트를 작성하되, 이메일/비밀번호 유효성 검증을 포함하세요."
- "기존 UserProfile 컴포넌트를 리팩토링하여 Avatar를 분리하세요."
```

**포함 내용:**
- AI Agent가 수행할 과업 정의
- WHY와 HOW를 품고 있음 (예: User Prompt)
- 구체적인 작업 범위
- 예상 산출물

---

### 2.4 📐 Instruction 구조의 계층

Cursor에서 Instruction은 여러 계층으로 구성됩니다.

#### Instruction의 4가지 계층

```
┌─────────────────────────────────┐
│     System Prompt (최상위)      │  ← AI 모델의 기본 동작 방식
├─────────────────────────────────┤
│     User Rules (전역)           │  ← 사용자의 모든 프로젝트에 적용
├─────────────────────────────────┤
│     Project Rules (프로젝트)    │  ← 현재 프로젝트에만 적용
├─────────────────────────────────┤
│     User Prompt (즉시)          │  ← 지금 당장의 요청
└─────────────────────────────────┘
```

##### 1. System Prompt 🌐
- **범위**: 모든 상호작용의 기반
- **변경**: 사용자가 직접 수정 불가 (모델 제공자가 정의)
- **역할**: AI의 기본 페르소나와 능력 정의
- **예시**: "You are Claude, an AI assistant..."

##### 2. User Rules 👤
- **범위**: 사용자의 모든 프로젝트
- **변경**: Cursor 설정에서 정의
- **역할**: 개인의 코딩 스타일과 선호도 반영
- **예시**: "항상 TypeScript를 사용하라", "함수형 프로그래밍을 선호한다"

##### 3. Project Rules 📁
- **범위**: 현재 프로젝트
- **변경**: `.cursor/rules`에 저장
- **역할**: 프로젝트별 규칙과 컨벤션
- **예시**: "이 프로젝트는 FSD 아키텍처를 따른다", "Tailwind CSS를 사용한다"

##### 4. User Prompt 💬
- **범위**: 현재 대화
- **변경**: 매 요청마다 새롭게 입력
- **역할**: 즉각적인 작업 지시
- **예시**: "Login 컴포넌트를 만들어줘"

---

### 2.5 🧩 Context 구성 요소

Agent가 작업을 수행할 때 참조하는 Context는 다음으로 구성됩니다.

#### Context의 4가지 주요 구성요소

##### 1. Cursor Tool Calling 🔧
- **기능**: Agent가 사용할 수 있는 도구들
- **예시**: 파일 읽기/쓰기, 터미널 실행, 웹 검색
- **활용**: 실제 작업 수행 수단

##### 2. User Active (Clipboard, Current Page) 📋
- **Clipboard**: 현재 클립보드에 복사된 내용
- **Current Page**: 현재 열려있는 파일과 커서 위치
- **활용**: 사용자의 현재 작업 컨텍스트 파악

##### 3. Memory 🧠
- **Short-term**: 현재 대화 세션의 기록
- **Long-term**: 과거 작업 이력과 학습 내용
- **활용**: 일관성 있는 작업 수행, 반복 학습

##### 4. MCP Server 🌐
- **기능**: 외부 시스템과의 연동
- **예시**: Linear, Notion, Database 등
- **활용**: 프로젝트 관리, 문서 참조, 데이터 조회

#### Context 활용 흐름

```
사용자 요청
    ↓
User Prompt 분석
    ↓
    ├→ Project Rules 참조
    ├→ User Rules 적용
    ├→ Memory 검색
    ├→ Current Page 분석
    ├→ MCP Server 데이터 조회
    ↓
통합된 Context 구성
    ↓
Tool Calling 실행
    ↓
결과 생성
```

---

### 2.6 📏 Rules의 종류와 범위

**재사용 가능하고 범위가 지정된 지침으로 Agent 모델의 동작을 제어합니다.**

#### Rules의 3가지 유형

##### 1. Project Rules 📂
```
위치: .cursor/rules 폴더
범위: 현재 프로젝트
버전 관리: Git으로 관리 (팀 공유 가능)
적용 시점: 프로젝트 파일 작업 시
```

**특징:**
- 프로젝트 코드베이스에 범위가 지정됨
- 팀 전체가 동일한 규칙 공유
- 프로젝트별 아키텍처와 컨벤션 반영

**예시:**
```markdown
# .cursor/rules/architecture.md

이 프로젝트는 Feature-Sliced Design을 따릅니다:
- app/: 앱 초기화 및 설정
- pages/: 페이지 컴포넌트
- widgets/: 복합 UI 블록
- features/: 사용자 시나리오
- entities/: 비즈니스 엔티티
- shared/: 재사용 가능한 코드
```

##### 2. User Rules 👨‍💻
```
위치: Cursor 설정 (전역)
범위: 모든 프로젝트
버전 관리: 로컬 환경에만 존재
적용 시점: 항상
```

**특징:**
- Cursor 환경에 전역적으로 적용
- 개인의 코딩 스타일 반영
- 프로젝트와 무관하게 일관성 유지

**예시:**
```markdown
# User Rules

- 항상 TypeScript를 사용하라
- 함수형 컴포넌트를 선호하라
- 주석은 한글로 작성하라
- 변수명은 명확하고 의미있게 작성하라
```

##### 3. .cursorrules (Legacy) ⚠️
```
위치: 프로젝트 루트
상태: 더 이상 사용되지 않음 (Deprecated)
권장: Project Rules로 마이그레이션
```

**참고사항:**
- 여전히 지원되지만 더 이상 권장되지 않음
- 대신 `.cursor/rules` 폴더 사용 권장
- 더 나은 조직화와 관리를 위해 마이그레이션 필요

---

### 2.7 ⚙️ 규칙 작동 방식

**대형 언어 모델은 완성 작업 간에 메모리를 유지하지 않습니다.**

#### 왜 Rules가 필요한가?

```
세션 1:
사용자: "React 컴포넌트 만들어줘"
AI: [TypeScript로 작성]
✅ 좋음

세션 2 (다음날):
사용자: "또 다른 컴포넌트 만들어줘"
AI: [JavaScript로 작성]
❌ 일관성 없음!
```

#### Rules의 역할

**프롬프트 수준에서 지속적이고 재사용 가능한 컨텍스트를 제공합니다.**

```
매 요청마다:
    ↓
System Prompt 로드
    ↓
User Rules 적용
    ↓
Project Rules 적용
    ↓
User Prompt 처리
    ↓
일관된 결과 생성
```

#### Rules를 통한 메모리 대체

LLM 자체는 세션 간 기억이 없지만, Rules를 통해:
- ✅ 일관된 코딩 스타일 유지
- ✅ 프로젝트 컨벤션 준수
- ✅ 반복되는 지시 생략 가능
- ✅ 팀 전체의 표준화

---

### 2.8 🗂️ User Rules와 Project Rules의 실전 활용

#### Front End Project 예시

```
Front End Project
├── .cursor/rules/
│   ├── 01-architecture.md      # F/E 프로젝트 구조
│   ├── 02-workflow.md          # F/E 워크플로우
│   └── 03-components.md        # 공통 컴포넌트 가이드
```

**01-architecture.md**
```markdown
# 프로젝트 구조

src/
├── app/          # 앱 진입점
├── pages/        # 페이지 컴포넌트
├── widgets/      # 복합 UI 블록
├── features/     # 기능 단위
├── entities/     # 비즈니스 엔티티
└── shared/       # 공유 리소스
```

**02-workflow.md**
```markdown
# 개발 워크플로우

1. 요구사항 분석
2. 컴포넌트 구조 설계
3. 타입 정의
4. UI 구현
5. 로직 구현
6. 테스트 작성
```

**03-components.md**
```markdown
# 공통 컴포넌트 사용 가이드

Button 컴포넌트:
- 위치: shared/ui/Button
- Props: variant, size, onClick
- 예시: <Button variant="primary" size="md">클릭</Button>
```

#### Back End Project 예시

```
Back End Project
├── .cursor/rules/
│   ├── 01-architecture.md      # B/E 프로젝트 구조
│   ├── 02-workflow-api.md      # API 개발 워크플로우
│   ├── 03-security.md          # 보안 개발 가이드
│   └── 04-workflow-batch.md    # 배치 작업 워크플로우
```

**01-architecture.md**
```markdown
# 백엔드 아키텍처

## 계층 구조
- Controller: HTTP 요청 처리
- Service: 비즈니스 로직
- Repository: 데이터 접근
- Domain: 비즈니스 모델
```

**02-workflow-api.md**
```markdown
# API 개발 워크플로우

1. API 스펙 정의 (Swagger)
2. DTO 클래스 작성
3. Controller 메서드 구현
4. Service 로직 구현
5. Repository 구현
6. 단위 테스트 작성
7. 통합 테스트 작성
```

**03-security.md**
```markdown
# 보안 개발 가이드

## 필수 사항
- 모든 입력값 검증
- SQL Injection 방지 (PreparedStatement 사용)
- XSS 방지 (출력 인코딩)
- CSRF 토큰 검증
- 민감정보 암호화
```

#### Rules 적용 시나리오

```
개발자: "회원가입 API를 만들어줘"

Agent 처리 과정:
1. Project Rules/01-architecture.md
```