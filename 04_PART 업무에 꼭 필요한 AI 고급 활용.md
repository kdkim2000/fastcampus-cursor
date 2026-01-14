# 업무에 꼭 필요한 AI 고급 활용
---
## Agent란 무엇인가

### 목차
1. Agent란 무엇인가?
2. OpenAI, Anthropic이 생각하는 Agent에 대해
3. Cursor에서 Agent

### 우리가 알고있는 영화속 Agent의 이미지

영화 아이언맨의 **J.A.R.V.I.S.(자비스)**  
집안을 관리하고, 일정을 조율하며, 토니의 요청에 대한 조사와 분석을 수행한다. 음성인식으로 동작하며 사용자와 대화로 상호작용한다.

## AI Agent에 대한 Open AI의 정의

**A practical guide to building agents**

Agents are systems that **independently accomplish tasks** on your behalf.

- 일반적인 소프트웨어는 워크플로우를 자동화하지만, 에이전트는 높은 독립성을 가지고 사용자 대신 작업을 수행한다.
- 에이전트는 사용자의 목표를 달성하기 위해 일련의 단계를 실행하는 워크플로우를 가진다.
- 에이전트는 LLM을 활용하여 워크플로우를 관리하고 결정을 내린다.

### OpenAI가 생각하는 Agent 설계의 기초 요소

- **Model** : 에이전트의 추론과 의사결정을 담당하는 LLM
- **Tools** : 에이전트가 행동을 취할 수 있는 외부 함수나 API
- **Instructions** : 에이전트의 행동을 정의하는 명확한 지침

```python
weather_agent = Agent(
    name="Weather agent",
    instructions="You are a helpful agent who can talk to users about the weather.",
    tools=[get_weather],
)
```

## Anthropic이 생각하는 Agentic System

Agent는 Agentic System의 한부분으로 LLM이 스스로 작업을 통제하는 것을 의미한다.

- **Workflows** : LLM과 도구가 사전 정의된 코드 경로를 통해 조정되는 시스템
- **Agents** : LLM이 자체 프로세스와 도구 사용을 동적으로 지시하는 시스템

### Workflow: Prompt chaining

작업을 여러 단계로 분해해 각 LLM 호출이 이전 결과를 처리합니다.

[그림: Prompt chaining workflow]  
작업을 단계별로 나누어 각 LLM 호출이 이전 단계의 출력을 처리하며, 중간 단계에서 프로그래밍적 검사를 추가하여 프로세스가 올바르게 진행되고 있는지 확인할 수 있습니다.

## Workflow: Routing

입력을 분류해 특화된 후속 작업으로 보냅니다. 이 워크플로우는 관심사의 분리와 더 전문화된 프롬프트 생성을 가능하게 합니다. 이 워크플로우 없이 하나의 입력에 최적화하면 다른 입력에서 성능이 저하될 수 있습니다.

[그림: Routing workflow]  
입력을 LLM Call Router가 분류하여 각 LLM 호출로 전달하는 과정입니다.

## Cursor에 Agent의 개념이 녹아있습니다

Cursor는 다양한 설정을 통해 **Agent** 로서의 기능을 수행할 수 있습니다. 

- **Models** : 다양한 모델을 설정할 수 있습니다.
- **Tools & Integrations** : 외부 도구 및 통합 기능을 설정할 수 있습니다.
- **Rules & Memories** : 규칙과 메모리를 관리합니다.

## Cursor를 Agent로 바라보고 사용해야 합니다

Cursor는 다양한 도구와 기능을 통해 **Agent** 로서의 역할을 수행합니다. 사용자는 이를 통해 검색, 편집, 명령 실행 등의 작업을 수행할 수 있습니다.
---
## Agent에게 규칙을 부여하는 방법

### 목차
1. Agent에게 Instruction이란
2. Why, How, What으로 바라보는 Instruction
3. Cursor에서 Instruction을 부여하는 방법

### 김신입(Agent)에게 필요한 지시사항 (Instruction)

- 당신이 할 일은 OOO입니다.
- YY-001 요구사항을 보고 YYX파일 작성해 주세요.
- 작성된 YYX 파일을 바탕으로 YYX001.ts 파일 수정해 주세요.

### OpenAI가 생각하는 Agent 설계의 기초 요소

- **Model** : 에이전트의 추론과 의사결정을 담당하는 LLM
- **Tools** : 에이전트가 사용할 수 있는 외부 함수나 API
- **Instructions** : 에이전트의 행동 방식을 정의하는 명시적인 가이드라인

```python
weather_agent = Agent(
    name="Weather agent",
    instructions="You are a helpful agent who can talk to users about the weather.",
    tools=[get_weather],
)
```

### Explicit guidelines and guardrails defining how the agent behaves

Agent가 행동을 하도록 하려면 어떻게 해야할까?

- 나는 누구인가? (WHY)
- 무엇을 어떻게 해야 하는가? (HOW)
- 그래서 지금 할 일이 무엇인가? (WHAT)


## WHY

- **AI Agent** 의 역할을 부여
- AI Agent가 달성할 목표를 정의
- AI Agent의 구조 및 설정을 정의
- AI Agent의 가드레일을 정의 (예: System Prompt)

## HOW

- AI Agent의 워크플로우를 정의
- AI Agent의 Tool 활용 방식을 정의 (예: Cursor Rules)

## WHAT

- AI Agent가 수행할 과업을 정의
- WHY와 HOW를 품고 있음 (예: User Prompt)

## Instruction 구조

- **System Prompt**
- **User Rules**
- **User Prompt**
- **Project Rules**

## Context 구성 요소

- **Cursor Tool Calling**
- **User Active** (Clipboard, Current Page)
- **Memory**
- **MCP Server**

## Rules

재사용 가능하고 범위가 지정된 지침으로 Agent 모델의 동작을 제어합니다.

- **Project Rules** : `.cursor/rules`에 저장되며, 버전 관리되고 코드베이스에 범위가 지정됩니다.
- **User Rules** : Cursor 환경에 전역적으로 적용됩니다. 설정에서 정의되며 항상 적용됩니다.
- **.cursorrules (Legacy)** : 여전히 지원되지만 더 이상 사용되지 않습니다. 대신 Project Rules를 사용하세요.

## 규칙 작동 방식

대형 언어 모델은 완성 작업 간에 메모리를 유지하지 않습니다. 규칙은 프롬프트 수준에서 지속적이고 재사용 가능한 컨텍스트를 제공합니다.

## User Rules와 Project Rules

### Front End Project

- F/E Project 구조
- F/E Workflow
- 공통컴포넌트 가이드

### Back End Project

- B/E Project 구조
- B/E Workflow 1
- 보안 개발 가이드
- B/E2 Workflow 2



## Agent의 System Prompt 톺아보기

### 목차
1. 왜 System Prompt를 봐야하는가
2. Cursor Agent의 System Prompt 톺아보기
3. Cursor의 Long Term Memory 전략 들여다보기

### 왜 System Prompt를 봐야하는가
System Prompt에는 **Agent 전략** 이 담겨있기 때문이다.

> **출처** : 비트코인 백서

## Agent가 Tools를 활용하는 방법

### 목차
1. Agent에게 Tool(도구)란?
2. MCP(Model Context Protocol)에 대해
3. Cursor에서 Tool(도구)를 사용하는 방법

### Agent에게 Tool(도구)란?
Agent가 외부 시스템과 상호작용할 수 있도록 해주는 확장 기능이다. 인간으로 비유하자면 각종 신체 부위(눈, 코, 손 등)를 포함하는 개념으로, 적절한 도구를 선택하고 활용하는 것이 중요하다.

### Native Tool Use
Grok 4는 도구 사용을 위해 강화 학습으로 훈련되었습니다. 이는 Grok이 코드 해석기나 웹 브라우징과 같은 도구를 사용하여 사고를 확장할 수 있게 합니다. Grok은 실시간 정보 검색이나 어려운 연구 질문에 답할 때 자체 검색 쿼리를 선택하여 웹 전반에 걸쳐 지식을 찾고 깊이 있는 고품질의 응답을 제공합니다.

- **X Search** : 고급 키워드 및 의미론적 검색 도구를 사용하여 답변의 품질을 향상시킵니다.


## Agent의 성능 평가

Agent의 성능을 평가하는 지표로 다양한 **Tool 사용** 이 들어갑니다.

### LLM이 Tool을 사용하는 방식

LLM은 입력을 받아 **Tool** 을 호출하고, 결과를 출력합니다. 이 과정에서 피드백을 통해 성능을 개선합니다.

[그림: LLM과 Tool의 상호작용]
- **In** : 입력
- **LLM call** : LLM 호출
- **Tool** : 도구 사용
- **Out** : 출력
- **Feedback** : 피드백을 통한 개선

### 사례: Alice가 우산이 필요한가?

- **alice** 라는 인물을 찾고
- **alice** 의 위치를 찾고
- 해당 위치의 날씨를 가져옵니다

[그림: Tool Invocation]
- **Tool Invocation Order** :
  1. `find_users_by_name("alice")`
  2. `get_user_location(1)`
  3. `get_weather_at_location(1)`

- **Tool Output** :
  ```json
  {
    "id": 1,
    "name": "Alice"
  }
  ```

- **결론** : 현재 날씨는 부분적으로 흐리고 온도는 68°F입니다. 따라서 Alice가 지금 우산이 필요할 가능성은 낮습니다.

### Tool Calling

자연어를 통해 **Structured Tool** 을 호출합니다.

[그림: Tool Calling]
- **Natural language** : "What is 2 times 3"
- **Structured Tool** :
  ```python
  @tool
  def multiply(a, b):
      return a * b
  ```
- **Payload needed for tool** :
  - `arguments: '{"a":2, "b":3}'`
  - `name: multiply`

### 구조화된 방식으로 Tool을 호출한다

Agent가 구성하는 **Workflow** 내에서 Tool을 ** Chain** 속에서 호출합니다.

[그림: Tool Chain]
- **Chain** : RunnableSequence
- **Tool** : a

### Tool 사용 규칙

```plaintext
1. ALWAYS follow the tool call schema exactly as specified.
2. NEVER refer to tool names when speaking to the USER.
3. Use the standard tool call format and available tools.
```

### MCP 기본 구조

MCP는 USB 규격과 같이 각종 도구들이 **host** 들과 연결할 수 있도록 합니다.

[그림: MCP Architecture]
- **MCP clients** : client.py
- **MCP hosts** : Claude, 기타
- **MCP server** : Local data sources, Remote services

### Cursor와 MCP 서버

Cursor는 다양한 **MCP 서버** 와 연결되어 있습니다.

[그림: MCP 서버]
- **Node.js** : Desktop Commander, Think MCP Server
- **Python** : FireCrawL, MCP-Atlassian
- **Remote MCP Servers** : Notion, Context7, Sequential Thinking Tools, Supabase MCP Server, Linear



## Agent의 Memory에 대해

### 목차
1. AI는 왜 자꾸 잊어버릴까?
2. 마빈 민스키의 프레임 이론 - 지식은 어떻게 구조화되는가?
3. Cline의 Memory bank
4. Agent의 Instruction과 Memory

### AI는 왜 자꾸 잊어버릴까?

AI 시스템은 **기억력에 제한** 이 있습니다. 이는 **Context Window** 의 크기와 관련이 있습니다. 여러 작업(Task)이 진행되면서 이전의 정보가 삭제될 수 있습니다.

[그림: Context Window]
- Task 1, Task 2, Task 3, Task 4, Task 5
- Task 1과 Task 2는 기억에서 삭제됨

### Context를 유지하려면 Memory가 필요하다

Agent의 **Context Window** 의 한계로 인해 이를 관리해줄 필요가 있습니다. 

[그림: Memory 관리]
- **Remember** : LONG-TERM MEMORY
- **Summarize** : WORKING MEMORY
- **Forget** : 정보가 삭제됨

### Agent Memory의 종류

- **Long Term Memory** : Work History
- **Short Term Memory** : Working Memory

## 어떻게 하면 더 잘 기억할까?

효율적인 메모리 관리와 정보 구조화는 AI의 성능을 향상시킬 수 있습니다.


## 인간은 어떻게 새로운 상황을 빠르게 인지할까?

**지적 활동의 프레임워크**  
우리는 과거 경험을 **구조화된 지식 단위** 로 저장하고 재사용한다.

## 프레임이란?

전형적 상황을 표현하는 **데이터 구조**

### 생일파티 프레임 예시

- **Top Level (고정 정보)**
  - 정의: "생일을 축하하는 모임"
  - 목적: "축하와 선물 전달"
  - 필수요소: "주인공, 날짜"

- **Lower Level: Slots (가변 정보)**
  - Slot1: 장소
    - Default: "집"
    - Range: [집, 식당, 카페, 공원]
  - Slot2: 참석자
    - Default: "가족"
    - Range: [가족, 친구, 동료]
  - Slot3: 케이크
    - Default: "생크림 케이크"
    - Constraint: "초 개수 = 나이"
  - Slot4: 선물
    - Default: "현금"
    - If-needed: "선물 구매 프로시저 실행"

## Frame이 선택되는 과정

- **상황 입력** : "문을 열고 들어갔더니 의자와 칠판이 있다."
  - 후보 프레임 활성화: 방 프레임(기본) or 교실 프레임(의자+칠판) or 회의실 프레임(의자+칠판)
  - 증거 수집: 칠판이 있는 경우 교실일 확률이 높음, 의자가 많다면 교실일 확률이 높음
  - 최적 프레임 선택: "교실 프레임"에 더 가까움

## 구조화된 형태의 Memory 구조 (Cline Memory Bank)

Frame 단위로 묶어서 순차적으로 기억한다.

## Cline Memory Bank 설명에 앞서

[Cline Memory Bank의 개요]  
Cline은 다양한 작업을 수행할 수 있는 오픈 소스 AI 코딩 플랫폼이다. 사용자는 브라우저를 통해 복잡한 프로젝트를 탐색하고 터미널 명령을 실행할 수 있다.

## Memory Bank의 Frame

- **개발자** : "어제 작업한 로그인 API 마저 완성해줘"
- **Agent** : "어떤 프로젝트인가요? 어떤 기술 스택을...?"
- **개발자** : 😩 (처음부터 다시 설명)

### PROJECT-FRAME: "Cline Memory Bank"

- **Top Level (고정 구조)**
  - 목적: "프로젝트 컨텍스트 영구 보존"
  - 위치: "Cline_docs/ 폴더"
  - 형식: "Markdown 파일들"

- **Slots (각 .md 파일)**
  - Slot1: projectbrief.md
  - Slot2: productContext.md
  - Slot3: systemPatterns.md
  - Slot4: techContext.md
  - Slot5: activeContext.md
  - Slot6: progress.md

## projectbrief.md

- Frame의 "Fixed Top Level"
- 전체 프레임의 기초 정의
- 변하지 않는 프로젝트 본질
  - (ex: 프로젝트명, 핵심 목표, 범위 정의, 제약 사항)

## productContext.md

- Slot with Default Value
- 왜 이 프로젝트를 하는지에 대한 정의 (WHY)
- 프로젝트의 목적이 명확하지 않으면 brief에서 추론
  - (ex: 해결하려는 문제, 타겟 사용자, 기대효과)


## systemPatterns.md

- **Slot with Procedural Attachments**
- 어떻게 구축되어 있는가?
- 새로운 패턴이 추가되면 자동으로 영향 분석
  - (ex: 프로그램 아키텍처, 핵심 설계, 컴포넌트 관계)

## techContext.md

- **Slot with Default Values**
- 무엇으로 만들어져 있는가?
- 명시하지 않으면 일반적인 스택 가정
  - (ex: 프로그래밍 언어, 프레임워크/라이브러리, 의존성)

## activeContext.md

- **Computed Slot** (다른 슬롯들의 조합)
- 위 3개 슬롯 정보 종합 + 현재 상태
- 프레임 전체 상태를 한 눈에 보여줌
  - (ex: 현재 작업 중인 기능, 최근 변경 사항, 다음 단계)

## progress.md

- **Temporal Slot** (시간 정보 포함)
- 작업 이력 추적
- 프레임의 진화 과정 기록
  - (ex: 완료된 기능, 진행 중인 작업, 대기 중인 작업)

## Cursor의 Memory 관리 기능

Cursor에도 기본적으로 **Memory** 와 작업을 관리하기 위한 기능이 있다. 작업을 하다보면 이것만으로 **Context** 유지가 어렵다.

## WHY, HOW, WHAT

### WHY
- **System Prompt**
- **User Rules**
- **Project Definition Rules**

### HOW
- **Project Workflow Rules**
- **MCP Use Rules**

### WHAT
- **User Prompt**
- **‘@’ Input Tag**

---

## 내가 일하는 방식을 분해하자 (Workflow 구성하기)

## 목차

1. **Workflow를 구성해야하는 이유**
2. **Workflow를 구성했을 때 장점 (Context 추적)**
3. **내가 일하는 방식을 뽑아내는 방법 (암묵지를 형식지로 바꾸는 방법)**


## AI Agent는 실무에서의 나와 무엇이 다를까?

- **AI Agent**
  - 세상의 거의 모든 지식
  - 자원만 있다면 무한한 사고

- **실무자**
  - 업무에 대한 지식과 기억
  - 상황에 맞게 문제에 접근하는 방식
  - 제한된 에너지와 지식

## Agent가 일을 하게 하려면 상황에 맞는 맥락(Context)이 필요하다

[그림: Agent의 작업 흐름]
- **Incoming Email** : 이메일 수신
- **Agent** : 작업 수행
  - **Calendar Tool** : 일정 확인 및 회의 예약
  - **Email History Tool** : 수신자에 맞는 톤 설정
  - **Meeting Notes Tool** : 이전 회의 노트 가져오기
  - **Contacts Tool** : 수신자 정보 가져오기
- **Generated Email** : 생성된 이메일

### 문제 해결 과정

1. **문제 발견**
   - 예시: 데이터 조회 오류 발생
2. **문제 분석**
   - 누가 물어봤는지?
   - 어떤 상황에서 오류가 발생했는지?
   - 지난 회의록에 있는지?
3. **계획수립**
4. **문제해결**
5. **적용**

## AI가 인지해야하는 상황에 대한 정보를 정리해야 한다

- **상황 예시**
  - 특정 상황에서 데이터 조회 오류 발생
  - 쿼리 문제 또는 테이블 구조 문제 가능성
  - 참고 자료: Linear의 QWER-113

## 주어진 Context에 Coding에 필요한 Context를 주입한다

- **Coding에서 필요한 맥락(Context)을 구성한다**
  - 어떤 코드를 수정해야 할까?
  - 주어진 상황에서 문제를 해결하려면 어떤 context가 필요할까?
  - 코드를 수정할 때 다른 사이드이펙트는 없을까?

## Workflow 정의 예시

- **영향도 세부 분석 (Enhanced)**
  - **관련 컴포넌트 식별** :
    - 직접 영향: 수정 대상 컴포넌트 및 직접 연결된 컴포넌트
    - 간접 영향: 상태 공유, props 전달, context 사용 컴포넌트
    - 사이드 이펙트 가능 영역: 성능, 접근성, 보안에 영향받는 컴포넌트
  - **이벤트 전파 경로 분석** :
    - 사용자 액션 → 이벤트 핸들러 → 상태 변경 → UI 업데이트 플로우
    - Electron IPC 이벤트 → 메인 프로세스 → 렌더러 프로세스 통신
    - 라우트 변경, 브라우저 이벤트 등 시스템 이벤트 영향
  - **상태 전파 경로 분석** :
    - Zustand 스토어 → 구독 컴포넌트 → 하위 컴포넌트 체인 확인
    - 전역 상태 vs 로컬 상태 영향 범위 파악
    - 상태 변경 시 리렌더링 범위 예측

## Agent에게 Workflow를 정의하면 무엇이 좋아지나요?

1. AI가 코드를 작성하고 수정하는 과정에서 의도에 벗어난 지점을 빠르게 인지할 수 있다.
2. Coding에 필요한 Context를 탐색하는 과정에서 내 의도대로 Context를 주입할 수 있다.
3. 내가 하던 방식대로 문제에 접근하고 해결하므로 추후에 유지보수에 용이하다.

## 지식 포착 (Capture)

- 개발자의 암묵적 지식을 수집하고 정량화
- 일하는 방식을 객관화하여 분석
- 상황을 인지하는 순간을 포착
- 어떻게 정보를 가져오고, 어떤 순서로 정보를 만드나


## 지식 구조화
**Structure**

- 수집된 지식을 Plan-Act-Retrive 프레임에 체계적으로 매핑
- 각 단계를 Frame이라 가정하고 Slot을 정의

## 지식 형식화
**Formalize**

- 구조화된 지식을 실행 가능한 AI 프롬프트로 변환
- 프롬프트 체이닝을 통한 최적화

## 지식 진화
**Evolve**

- 피드백 기반 지속적 개선과 학습
- Context 압축과 기록을 통한 Memory 축적

## 메인화면 개발 완료 보고

### 구현 완료 사항

- **Phase 1: 아키텍처 설계 완료**
  - FSD 아키텍처 적용: entities → widgets → pages 계층 구조로 설계
  - 워크플로우 상태 관리: Zustand 기반 전역 상태 관리 시스템 구축
  - 글래스모피즘 디자인 시스템: 반투명 배경, backdrop blur, inner shadow 적용

- **Phase 2: 구현 완료**
  1. **엔티티 계층 (entities/workflow/)**
     - **타입 정의** : `WorkflowStatus`, `Workflow`, `WorkflowGroup`, `WorkflowStep` 인터페이스
     - **Zustand 스토어** : 워크플로우 상태 관리, 선택 상태, 검색 기능
     - **WorkflowItem 컴포넌트** : 상태별 색상 표시 및 버튼 액션, 클릭 선택 기능

## Workflow를 만드는 과정

- **지식 포착 (Capture)**
  - 개발자의 암묵적 지식을 수집하고 정량화
  - 일하는 방식을 객관화하여 분석

- **지식 구조화 (Structure)**
  - 수집된 지식을 Plan-Act-Retrive 프레임에 체계적으로 매핑

- **지식 형식화 (Formalize)**
  - 구조화된 지식을 실행 가능한 AI 프롬프트로 변환
  - 프롬프트 체이닝을 통한 최적화

- **지식 진화 (Evolve)**
  - 피드백 기반 지속적 개선과 학습
  - Context 압축과 기록을 통한 고도화

---

## Cursor 고급 기법을 활용한 FrontEnd 개발 실습

## Workflow를 Rules와 MCP로 표현하기

## 목차

1. **Workflow를 구성하기 위한 Rule 구조화**
2. **Rule을 엮어서 Instruction을 구조화해보자 (Rule Chain)**
3. **Agent가 일하는 방식대로 Rule을 구성해보자 (Selection)**


# Workflow를 Rules와 MCP로 표현하는 방법

## 지식 포착
**Capture**
- 개발자의 암묵적 지식을 수집하고 정량화
- 일하는 방식을 객관화하여 분석

## 지식 구조화
**Structure**
- 수집된 지식을 Plan-Act-Retrive 프레임에 체계적으로 매핑

## 지식 형식화
**Formalize**
- 구조화된 지식을 실행 가능한 AI 프롬프트로 변환
- 프롬프트 체이닝을 통한 최적화

## 지식 진화
**Evolve**
- 피드백 기반 지속적 개선과 학습
- Context 압축과 기록을 통한 고도화

## 지식 구조화 - STRUCTURE

### 01 Plan
**Context 주입**
- 요구사항에 맞는 Context를 주입한다.
- 그 과정에서 누락되는 Context가 없도록 검토하고, 내가 일하는 방식대로 계획을 수립했는지 확인한다.

### 02 Act
**개발 진행**
- Plan에 맞게 개발을 진행한다.
- 개발시 계획에 맞게 진행되었는지 확인한다. 이때 내가 일하는 방식에서 벗어나는 부분이 있다면 수정 요청한다.

### 03 Retrive
**압축 및 기록**
- 완료된 내용을 압축하고 기록한다.
- 작업 단위로 Context를 요약/압축하여 기록한다. 장기적인 Memory에 기록하고 향후 Context 파악에 활용한다.

## Plan시 유의할 점
- 계획을 수립할 때는 내가 일할때 필요한 Context가 빠진게 없는지 꼼꼼하게 검토합니다.
- 요구사항부터 개발 소스까지 큰 범위에서 작은

## 개발시 유의할 점
- 개발이 진행될 때는 Agent가 제대로 가고 있는지 중간에 검토합니다.
- 약간이라도 계획에서 벗어났을 때 해당 부분을 조정 요청합니다. (Feedback)

## Rule Chain을 통한 Instruction 구조화 예시

### 01 Project 정의 Rule
- 목표 정의
- 아키텍처 및 폴더구조 정의
- 보안 및 가드레일 정의

### 02 Workflow 정의
- Plan / Act / Retrive 정의
- Tool 사용 관련 rule 정의

### 03 Plan 기법 정의
- Plan 기법에 대한 상세 정의
- 어떻게 맥락을 탐색하고 주입할지에 대해 정리

### 04 Document 정의
- 각 상황별 사용하는 Component, Tool 정의
- 요청사항에 맞게 선택하여 주입할 수 있도록 자세하게 정리

## 필요한 Context를 조건에 맞게 주입 (IF - THEN)

- **상황 부여**
  - OO 정보가 필요함
    - Linear MCP Tool: Linear에 해당 정보가 있는가?
    - Maria DB MCP Tool: MariaDB에 테이블에 해당 데이터가 있는가?
  - OOO 방식대로 작성필요
    - CCC Rules 참조: 내가 정의한 Workflow를 수행해야 제대로 동작하는가?
    - DDD Document 참조: Document나 Story Book을 참고해야 하는가?

## 상황을 정의하고 조건에 맞게 Rule을 호출할 수 있다

- 오케스트레이션 역할을 하는 Rule을 세우고 하위로 구조화하여 Rule을 조건별로 연결할 수 있다.

## Tool 호출도 Rule에 명시하여 상황에 맞게 사용할 수 있다


## Rule을 구조화하여 Workflow에 맞게 구성할 수 있다

- **Rule Chain** : 구조화된 형태로 Rule을 구성하여 Token을 최소화하면서 필요한 Context를 주입
- **Selection** : 상황에 맞게 Tool과 Rule을 호출하여 여러 유형을 사전에 정의

---

### 내가 일하는 방식대로 Workflow 구성하기

#### Workflow를 만드는 과정

- **지식 포착 (Capture)**
  - 개발자의 암묵적 지식을 수집하고 정량화
  - 일하는 방식을 객관화하여 분석

- **지식 구조화 (Structure)**
  - 수집된 지식을 Plan-Act-Retrive 프레임에 체계적으로 매핑

- **지식 형식화 (Formalize)**
  - 구조화된 지식을 실행 가능한 AI 프롬프트로 변환
  - 프롬프트 체이닝을 통한 최적화

- **지식 진화 (Evolve)**
  - 피드백 기반 지속적 개선과 학습
  - Context 압축과 기록을 통한 고도화

#### Instruction 구조

- **Project Guideline** : Workflow의 중심이 되는 지침
- **Workflow** : Plan, Act, Retrive로 구성된 양방향 구조


## Agent가 활용 가능한 Tool 설정하기

### Custom Mode로 상황에 맞는 Model 설정하기

#### Custom Mode 언제 사용할까?

- **Tool을 제한하고 싶을 때**
  - 예: 요청하지도 않았는데 DB 수정을 하는 경우
- **Tool을 확실하게 호출하고 싶을 때**
  - 예: 해당 문맥에서 반드시 Tool을 호출해야 하는 경우

## MCP Server를 활용하여 Task별로 개발하기

### AI를 활용한 테스트코드 작성하기

#### 기존 Workflow에 추가된 내용

1. **Plan**
   - Context 주입단계
   - 사용자의 요구사항을 구체화하고 Context를 구성한다.
   
2. **Test**
   - **Red Phase** (실패하는 테스트 케이스)
   - 핵심 테스트 케이스 구현
   
3. **Act**
   - 계획에 맞게 순차적 개발
   - 개발 완료시 Testing 진행을 통해 Green Phase 완료
   
4. **Reflect**
   - 완료된 내용을 검토하고 최종 요약하여 history에 기록

#### Workflow 다이어그램

- **명시적 테스트 트리거**
  - 역전환: Context 부족시
  - 역전환: 테스트 부족시
  - 테스트 코드 작성 완료 자동 전환
- **Phase 2: Act**
- **Phase 3: Reflect**
  - 명시적 완료 트리거


## AI 기반 Test 시나리오 구성의 장단점

### 장점
- 코드의 완결성 증대
- 기획/설계 단계에서 예측 가능
- AI로 인한 오류 최소화

### 단점
- 토큰 소모가 커서 AI 비용 증가
- 사전에 디테일한 설계로 인한 비용 증가

## AI 기반 개발에서 Test를 사용하는 경우

- 모듈 단위로 AI로 인한 개발에 리스크가 있는 경우
- 실제 현업에서 사용 시에 사용성이 중요한 경우
- 기존에 Test 기반으로 작업이 되어 있는 경우

---

### 개인의 활용과 조직에서의 활용은 무엇이 다를까?

## 목차

1. 조직에서 발생할 수 있는 문제
2. AI Coding Tool을 활용해서 해결할 수 있는 것
3. 왜 AI를 조직에 도입해야 하나요?

## 개발 단계에서 발생할 수 있는 문제

[그림: 개발 단계]
- **Analysis**
- **Requirement Specification**
- **Design**
- **Development**
- **Testing and Integration**
- **Implementation/Deployment**

## 문제는 코드를 고치는 과정에 있었다

[그림: 개발 프로세스]
- Front End
- Back End
- 디자인/설계
- 퍼블리싱
- Front End 개발
- Back End 개발
- 테스트

> 요구사항 변경으로 인해 개발 중인 코드를 수정하려고 들어갔다.
> 내가 개발하지 않은 소스의 구조가 **일반적이지 않았다** .

## 프로젝트 코드의 품질을 높이기 위한 방법

1. **코드리뷰**
   - 작성한 코드가 이상하지 않은지
   - Side Effect를 발생시키지는 않을지

2. **코드 컨벤션**
   - 프로젝트 철학에 맞는 코드 구조를 띠는지
   - 프로젝트 구성원 모두가 공감하는 형식을 갖췄는지

3. **Documentation**
   - 공통 코드 커스터 라이브러리에 대한 명세가 잘 되어있는지
   - 사용에 대한 예제 및 Playground (Storybook)

4. **개발 가이드 및 세미나**
   - 정기적으로 세미나를 통해 프로젝트에 중요한 부분을 강조
   - 조직 내 구성원들이 지속적으로 인지할 수 있도록 세미나 실시


## 개인에 따른 코드 품질의 차이

개인에 따라 **코드 품질의 차이** 가 발생한다. 내가 작성한 코드를 다른 사람이 작성할 수 있다고 생각해야 한다.

## 가설: AI를 활용해서 코드 품질과 생산성 둘 다 올릴 수 있을까?

- **일관되고 예측 가능한 코드 품질**
  - AI를 활용해 보일러 플레이트 개발
- **생산성 향상**
  - AI 자동화를 통한 개발 속도 증가

## 개인과 조직은 서로 AI 활용 목적이 다르다

- **AI를 개인이 활용할 때**
  - 개인의 생산성을 극대화
  - 개인 업무의 위임 및 역량 증강

- **AI를 조직이 활용할 때**
  - 일관되고 예측 가능한 코드
  - 프로젝트 관점에서 리스크 최소화

## AI Agent와 구성원이 함께 일하는 조직

AI Agent를 하나의 동료로 생각하여 우리의 개발 철학과 방법론을 일치시킨다.

## 조직 내 AI 활용 표준화

- 조직이 일하는 방식을 정의
- 개인의 Workflow와 조직의 Workflow 간 연계

## 조직에서 AI를 도입했을 때 따라오는 장점

1. 개발 가이드 및 리뷰에 들어가는 시간(비용)을 효율적으로 활용할 수 있다.
2. 온보딩에 들어가는 비용을 최소화할 수 있다.
3. 코드 품질의 일관성과 예측 가능성이 올라간다.
4. 일하는 방식의 변화가 없고 큰 틀에서 프로젝트를 관리할 수 있다.
5. 전반적인 개발 생산성이 개선된다.

## 정리

- 조직에서 AI를 도입하는 근본적인 이유가 무엇인가요?
- 조직에서 AI를 도입했을 때 따라오는 장점은 무엇인가요?


# 표준 라이브러리와 프레임워크 정하기


## 레거시 시스템에서 AI 적용시 고려할 사항

- **Documentation** : 기능에 대한 명세와 풍부한 예시 제공
- **Tools** : 필요한 정보와 데이터를 연계하여 일하는 방식에 맞게 도구 사용

## One Shot Prompting을 통한 품질 향상

유형을 구조화하여 각 유형에 맞는 기능 명세와 예시는 코드 품질을 높이는데 크게 도움을 준다.

## WHY, HOW, WHAT

### WHY
- System Prompt
- User Rules
- Project Definition Rules

### HOW
- Project Workflow Rules
- MCP Use Rules

### WHAT
- User Prompt
- '@' Input Tag

## Tool을 통해 라이브러리/프레임워크를 활용

MCP Server를 통해 해당 라이브러리/프레임워크를 손쉽게 사용할 수 있도록 세팅할 수 있다. (예: Toss에서 제작한 MCP)

## Cursor와 MCP 서버

- **Node.js**
  - Desktop Commander
  - Think MCP Server

- **Python**
  - FireCrawI
  - MCP-Atlassian

- **Remote MCP Servers**
  - Notion
  - Context7
  - Sequential Thinking Tools
  - Supabase MCP Server
  - Linear


## 정리

- **라이브러리/프레임워크 선정시 고려할 사항은 무엇인가요?**
- **라이브러리/프레임워크를 AI를 활용하여 쉽게 사용하려면 어떻게 해야하나요?**


## Context의 범위를 제한하기 위한 폴더구조

### 목차

1. **개발자 역할의 범위와 Rule 구조화**
2. **DDD(Domain Driven Design) 그리고 FSD(Feature Sliced Design)의 등장**
3. **Context 범위의 제약으로 가져올 수 있는 이점**

### 개발자 역할의 범위와 Rule 구조화

- **Project**
  - **Front End**
    - 재고
    - 주문
    - 결제
  - **Back End**
    - 상품 관리
    - 결제

### Context Switching은 복잡성을 높이고 효율성을 떨어뜨린다

- **Project**
  - **Front End**
  - **Back End**
    - 결제에 주문도 붙이고 상품 데이터도 관리하고...

## DDD(Domain Driven Design) 그리고 FSD(Feature Sliced Design)의 등장

프로젝트의 복잡성을 관리하기 위해 2003년 **Domain Driven Design** 이 등장했다. Front End의 세계에서는 비교적 나중에 **Feature Sliced Design** 아키텍처가 등장했다.

### DDD 예시

```plaintext
src/main/java/com/bookstore
├── BookstoreApplication.java
├── web
│   ├── BookController.java
│   └── OrderController.java
├── application
│   ├── BookService.java
│   └── OrderService.java
├── domain
│   ├── book
│   │   ├── Book.java
│   │   └── BookRepository.java
│   └── order
│       ├── Order.java
│       └── OrderRepository.java
└── infrastructure
    ├── BookRepositoryImpl.java
    └── OrderRepositoryImpl.java
```

### FSD 예시

```plaintext
src/
├── app/
├── pages/
│   ├── main-page/
│   └── book-details-page/
├── widgets/
│   ├── Header/
│   └── BookList/
├── features/
│   ├── search-book/
│   └── add-to-cart/
├── entities/
│   ├── book/
│   └── user/
└── shared/
    └── ui/
```

### 폴더가 Context의 범위를 강제한다

DDD/FSD와 같은 아키텍처는 결합도를 낮추고 응집도를 높이기 위해 폴더라는 구조를 활용해 Context의 범위를 제한한다.

## Context의 제한은 Agent의 월권을 방지한다


## 멀티 루트 워크스페이스

Cursor는 **멀티 루트 워크스페이스** 를 지원하여 여러 코드베이스로 작업할 수 있습니다:

- 모든 코드베이스가 자동으로 연결됩니다.
- 각 코드베이스의 컨텍스트를 AI가 사용할 수 있습니다.
- `.cursor/rules`가 모든 폴더에서 작동합니다.

## 하나의 작업공간에 여러 개의 폴더를 묶을 수 있다

Codebase를 **indexing** 하는 과정에서 하나의 작업공간에 여러 프로젝트를 묶을 수 있습니다. Codebase 분석하는 과정에서 각 폴더 단위로 **Rules** 를 구분합니다.

## 중첩 규칙

프로젝트 전체에 `.cursor/rules` 디렉토리를 배치해서 규칙을 구성합니다. 중첩된 규칙은 해당 디렉토리의 파일이 참조될 때 자동으로 연결됩니다.

```plaintext
project/
  .cursor/rules/    # 프로젝트 전체 규칙
  backend/
    server/
      .cursor/rules/  # 백엔드별 규칙
  frontend/
    .cursor/rules/    # 프론트엔드별 규칙
```

## Project 별로 Feature 별로 Rule을 구성한다

Domain별, Feature별로 폴더를 구성하고 폴더마다 개별적인 rule을 두고 관리합니다. 각자 맡고 있는 R&R이 명확할 경우 용이합니다.

## 정리

- **Context 범위의 제약으로 가져올 수 있는 이점**
- **AI 기반으로 일을 할 때 최적의 폴더구조는 무엇일까?**



## 표준 Workflow를 통한 Rules 공유하기

### 중첩 규칙

프로젝트 전체에 `.cursor/rules` 디렉토리를 배치해서 규칙을 구성합니다. 중첩된 규칙은 해당 디렉토리의 파일이 참조될 때 자동으로 연결됩니다.

```plaintext
project/
  .cursor/rules/       # 프로젝트 전체 규칙
  backend/
    server/
      .cursor/rules/   # 백엔드별 규칙
  frontend/
    .cursor/rules/     # 프론트엔드별 규칙
```

> 폴더 하위마다 cursor rules를 줘서 instruction별 범위를 제한시킵니다. AI가 수정할 수 있는 범위를 명확하게 주고 다른 업무에 지장이 없도록 조절합니다.

### Multi Root Workspace

하나의 작업 공간에 여러 폴더를 포함하여 작업합니다.

- 모든 코드베이스가 자동으로 연결됩니다.
- 각 코드베이스의 컨텍스트를 AI가 사용할 수 있습니다.
- `.cursor/rules`가 모든 폴더에서 작동합니다.

## 표준 workflow를 통한 MCP Server 관리하기

## Code Rabbit을 통한 Code Review 환경 구성하기

### Code Review를 위한 AI 도구

- **Code Quality** : 코드 품질을 향상시킵니다.
- **Code Security** : 보안 분석을 통해 소프트웨어 공급망을 보호합니다.
- **Developer Productivity** : 개발자의 생산성을 높입니다.

### [그림: CodeRabbit 아키텍처 다이어그램]

- **Git Platforms** : GitHub, GitLab, Azure DevOps, Bitbucket과 연동됩니다.
- **AI Agent** : 여러 LLMs에 요청을 보내고 응답을 받습니다.
- **Context Enrichment** : 코드베이스의 컨텍스트를 풍부하게 합니다.
- **Issues** : Jira, Linear와 같은 이슈 트래킹 시스템과 통합됩니다.
- **Learnings** : CodeRabbit Knowledge Base에 학습 내용을 저장합니다.
- **Reporting** : KPI를 추적하고 보고합니다.



## 보안이 강화된 환경에서 오픈소스 Coding Tool 활용하기

### 목차
1. 기업들의 AI Coding Tool 활용
2. 보안 환경에서 AI 활용 유형과 해결방안
3. 안전한 자체 호스팅 AI 개발을 위한 오픈소스

### 소스코드 보안과 생산성 사이에서

2025년 6월, 네이버는 4,500명에 달하는 자사 직원들에게 AI 코딩 플랫폼 **커서(Cursor)** 의 사용을 공식적으로 주문했습니다.

### 파일럿으로 먼저 사용해보기 시작했다

- **개발자 대상** : 'AI 마일리지 프로그램 도입'으로 실제 효용성 검증

### Outbound Risk
- 정보 유출

### Inbound Risk
- 취약점 유입

### 기업에서 AI 도구를 도입하기 위한 환경

1. **상용 AI 도구 전부 사용 가능**
   - 소스코드 보안보다 속도를 중요시하는 회사. AI를 적극적으로 받아들이고 조직내 사례를 적극 발굴.

2. **LLM Model을 자체 인프라 내에서 Serve**
   - 여러 보안제약으로 인해 자체 인프라 내에 AI Model을 올리고 서비스로 제공.

3. **외부에서 작업 후 내부 레거시와 merge**
   - 내부 인프라 구축 투자 비용의 한계로 생산성을 포기하지 못하는 케이스. 통합 시나리오를 구체화 해야함.

4. **절대 AI 사용 불가**
   - AI 도입을 위한 경영진의 의지가 부족한 경우.

### Achieving Secure LLM Governance

1. **Access Controls**
   - 모델 상호 작용을 위한 접근 통제

2. **Audit Logs**
   - 사용자 쿼리 및 시스템 응답 추적

3. **Encryption Standards**
   - 데이터셋과 모델 체크포인트를 위한 AES-256 이상의 암호화 적용

4. **Monitoring Tools**
   - AI 환경을 모니터링하기 위한 도구

### LLM 모델을 서비스로 제공했을 때 클라이언트 측에서 동작할 것


## 서비스 서버와 클라이언트의 상호작용

### 서비스 서버
- **Service Server** 는 클라이언트로부터 **Prompt** 를 받아 처리합니다.
- 서버는 **Source Code** 와 **User Rules** 를 기반으로 동작합니다.

### Private LLM 서버
- **Private LLM Server** 는 명확하게 격리된 환경에서 **Source Code** 를 처리합니다.

## Cline

- **Cline** 은 Agent 기반 Vscode Extension과 Memory bank 등의 아이디어로 시작되었습니다.
- Star: 50.1k

## Roo Code

- **Roo Code** 는 Cline의 포크로 출발한 프로젝트로, Custom 기능이 강점입니다.
- Star: 19.3K

## Continue.dev

- **Continue.dev** 는 Cursor와 가장 사용성이 흡사하며, Agent, Chat, Inline Edit, Tab 기능을 제공합니다.
- Star: 28.8K

## 정리

- 기업이 AI Coding Tool을 바라보는 관점은 어떻게 바뀌고 있나요?
- 보안에 따른 AI 도입 유형은 어떤 것이 있나요?
- 보안이 적용된 기업에서 사용 AI Coding Tool을 대체할 수 있는 오픈소스는 어떤 것이 있나요?

---

## Cline을 통한 Agent Coding 환경 구성하기

## Cursor 대용으로 Continue 사용하기

## Ollama를 활용한 자체 Model 설정하기
