
# Part 1. AI 생태계 톺아보기

# Chat에서 Agent로

## 목차

1. 코드 어시스턴트(Code Assistant)의 시대
2. 코드 에이전트(Code Agent)의 등장
3. 어시스턴트에서 에이전트로 나아가기

## 코드 어시스턴트(Code Assistant)의 시대

[그림: 코드 어시스턴트의 예시]
- 코드 어시스턴트는 개발자가 코드를 작성할 때 도움을 주는 도구입니다.

## Github Copilot의 등장

Github Copilot은 LLM기반의 코드 생성을 최초로 지원했다.

## 초기 Cursor의 역할

초기 Cursor는 Tab과 Chat기반의 협업 도구를 메인으로 사용했다.


## 코드 에이전트(Code Agent)의 등장

[그림: 코드 에이전트의 구조]
- **Human**: 사용자 입력
- **LLM Call**: 대규모 언어 모델 호출
- **Environment**: 실행 환경
- **Action**과 **Feedback**: 상호작용 과정
- **Stop**: 프로세스 중단

## Cursor Agent & MCP 지원

Cursor의 Agent와 MCP 지원은 개발 자동화에 대한 인식을 바꾸었다.

## Claude Code의 등장

Claude를 만든 Anthropic은 코드의 90%를 Agent를 통해 개발한다.

## Assistant와 Agent의 비교

| Code Assistant | Code Agent |
| --- | --- |
| **역할** | 페어프로그래머 | 1명의 온전한 개발자 |
| **범위** | 작성중인 Code File (맥락이 제한적) | 전체 Project Code Base (여러 맥락을 고려) |
| **할 수 있는 일** | 현재 코드를 수정 및 제안 | 전체 코드와 자료를 탐색하여 자동으로 코드 생성 |

## Context(맥락)를 어떻게 설계하는가?

## Chat에서 Agent로

1. 나만의 **Workflow**를 분석
2. **Instruction**으로 보상체계를 설정
3. Context에 필요한 **정보(데이터, 문서 등)**를 전달
4. Workflow를 바탕으로 **Context**를 설계

## 정리

- Code Assistant와 Code Agent의 차이
- Code Assistant에서 Code Agent로 바꾸는 방법
- 개발자의 역할의 변화가 어떻게 다가올까?

# 개발에 활용 가능한 AI 도구의 종류

Claude / Cursor / V0 / CodeRabbit

## 목차

1. 나의 보조 어시스턴트 ‘Claude’
2. 개발에 꼭 필요한 AI Coding 도구 ‘Cursor’
3. React로 화면을 만들어주는 ‘V0’
4. Code Review를 AI가 ‘CodeRabbit’


## Claude

**Claude**는 Anthropic에서 만든 AI 모델로, Chat UI 형태의 서비스를 제공합니다. 이 모델은 **Coding**에 특히 강점이 있으며, Opus, Sonnet, Haiku 세 가지 모델을 제공합니다.

### Claude 모델

| 모델명          | 특징                                      | 입력 비용 | 출력 비용 |
|----------------|-------------------------------------------|-----------|-----------|
| Claude Opus 4  | 복잡한 작업에 가장 지능적인 모델           | $15 / MTok| $75 / MTok|
| Claude Sonnet 4| 지능, 비용, 속도의 최적 균형               | $3 / MTok | $15 / MTok|
| Claude Haiku 3.5| 가장 빠르고 비용 효율적인 모델            | $0.80 / MTok| $4 / MTok |

## Claude Desktop (Web)

**Claude Desktop**은 Claude Haiku, Sonnet, Opus 모델을 활용하여 AI와 협업할 수 있는 도구입니다. Deep Research, Web 검색, Artifact, MCP를 제공합니다.

## Claude Code

**Claude Code**는 Anthropic이 자체 서비스를 개발하기 위해 사내에서 개발한 프로젝트입니다. Project의 문맥을 파악하고, Code를 읽고 작성하는 능력이 탁월합니다.

## Cursor

**Cursor**는 anysphere라는 회사에서 만든 AI 기반 Coding IDE입니다. VS Code 기반으로 제작되어 친숙한 UI/UX를 제공합니다.

### Tab / Agent / Inline Edit

- **Tab**: 문맥을 파악하여 Cursor 위치에 맞는 Code를 추천합니다.
- **Agent**: Codebase를 탐색하고 Tool을 호출하며, Rules를 기반으로 사용자의 의도에 맞는 소스코드를 만듭니다.
- **Inline Edit**: 특정 Code Block에 사용자의 의도에 맞는 요청사항을 실시간으로 반영합니다.

## V0

**V0**는 Next.js를 만드는 Vercel에서 개발하는 React.js 기반의 프론트엔드 자동화 도구입니다.

### Code / Design Mode

- **Code Mode**: React 기반의 Code를 생성해주며, 오른쪽 패널에서 실시간으로 생성된 화면을 보여줍니다.
- **Design Mode**: 해당 Component를 선택하고 Context에 주입하여 자연어로 수정 요청할 수 있습니다.

## CodeRabbit

**CodeRabbit**은 Github/Gitlab에서 올라온 Pull Request에 대해 CodeRabbit Agent가 맥락을 파악해서 개선점을 도출합니다.


## IDE 기반 Code Review

IDE 기반으로 무료로 **Code Review Plugin**을 제공합니다.  
VS Code 기반의 Extension으로 설치할 수 있으며, 리뷰 결과는 영어로 제공됩니다.

## 정리

- **Claude란 무엇인가?**
- **Cursor와 V0의 차이는 무엇인가?**
- **Code Review에 사용할 수 있는 Tool은 무엇인가?**


# 맥락(Context)을 어떻게 전달해야 하는가

### 목차

1. **Context(맥락)이란?**
2. **AI 온보딩 - 4가지 핵심 가이드 전략**
3. **AI 멘토링 - 피드백 루프로 함께 성장하기**

### Context = "정보 꾸러미"

- **목표(Goal)**
  - 무엇을 해야 하는가?  
  (예: 카카오 소셜 로그인 기능 추가)

- **지식(Knowledge)**
  - 목표 달성을 위해 알아야 할 것은 무엇인가?  
  (예: 관련 코드 파일, API 문서)

- **제약조건(Constraints)**
  - 어떤 규칙 안에서 움직여야 하는가?  
  (예: 코딩 컨벤션, 에러 처리 방식)

## AI에게 어떤 정보를 전달할 수 있을까

[그림: Context Engineering]  
Context Engineering 다이어그램은 다양한 정보 요소들이 어떻게 AI에게 전달될 수 있는지를 보여줍니다. 주요 요소로는 Instructions/System Prompt, Long-Term Memory, State/History (Short-term Memory), Retrieved Information (RAG), Available Tools, Structured Output 등이 있습니다.

## Agent가 Email을 작성할 때 고려하는 사항

[그림: Email 작성 프로세스]  
Agent는 Incoming Email을 받아 Custom System Prompt를 통해 Email을 생성합니다. 이 과정에서 Calendar Tool, Email History Tool, Meeting Notes Tool, Contacts Tool 등을 사용하여 회의 일정, 수신자 정보, 이전 회의 노트 등을 고려합니다.

## Context Window의 한계

[그림: Context Window 다이어그램]  
Context Window는 200K tokens로 제한되며, 입력과 출력의 흐름을 보여줍니다. 각 Turn마다 Tools, User message, Extended thinking, Text response, Tool use 등이 포함됩니다. 기억력 범위를 초과하면 일부 정보는 잘리게 됩니다.


## AI를 신입사원이라고 생각해보자

**특징**: 기억력에 제한이 있음

- 어떤 자료를 보면 될까요?
- 인프라 설정부터 보면 되나요?
- 컨벤션 정리된거 있을까요?
- 보고는 어떻게 드리면 될까요?

## AI 온보딩 핵심전략 4가지

1. **Select (선택)**
   - "일단 이 두 개 파일만 읽어보세요"

2. **Isolate (격리)**
   - "다른 회의는 지금 신경 쓰지 마세요"

3. **Write (저장)**
   - "우리 팀의 규칙은 이 위키에 정리해뒀어요"

4. **Compress (압축)**
   - "오늘 한 일, 세 줄로 요약해서 보고해주세요"

### Select (선택)

"김신입님, 이번 작업은 `userService.js`랑 `authController.js` 두 개 파일과 가장 관련이 깊어요. 일단 이 두 파일의 내용부터 파악해보세요."

#### Select 전략의 좋은 예시

- **Bad**: "우리 서비스에 소셜 로그인 기능 추가해줘." (AI는 우리 서비스를 모릅니다)
- **Good**: "첨부한 `authController.js` 파일에 `googleLogin` 함수를 추가해줘"

### Isolation (격리)

"지금은 데이터베이스 구조나 인프라 설정은 전혀 신경 쓰지 마시고, 오직 두 파일의 로직에만 집중해주세요."

### Write (기록)

"코딩하시기 전에, 우리 팀 컨벤션 문서 먼저 꼭 읽어주세요. 변수명 규칙이나 에러 처리 방식은 여기에 다 '기록되어 있습니다.'"

### Compress (압축)

"오전에는 A, B 두 가지 방법을 시도해봤는데, B 방법에서 성능 문제가 있어서 최종적으로 A 방법으로 구현을 완료했습니다."

## 정보를 요약해서 전달한다

**Context Window** (기억력) 한계로 중간중간 정보를 압축해야 한다.

[그림: 정보 요약 다이어그램]  
Remember, Summarize, Forget의 흐름을 통해 Long-term Memory와 Working Memory 간의 정보 이동을 설명합니다.


## 정보를 압축하여 맥락에 넣는다

Claude Code도 자동으로 압축을 진행한다.

### 토큰 사용량 줄이기

- **대화 압축** :
  - Claude는 컨텍스트가 95% 용량을 초과할 때 기본적으로 자동 압축을 사용합니다.
  - 자동 압축 토글: `/config` 콜 실행하고 "Auto-compact enabled"로 이동
  - 컨텍스트가 커질 때 `/compact` 콜 수동으로 사용.
  - 사용자 지정 지침 추가: `/compact focus on code samples and API usage`
  - CLAUDE.md에 추가하여 압축 사용자 지정:

    ```markdown
    # Summary instructions

    When you are using compact, please focus on test output and code changes.
    ```

- **구체적인 쿼리 작성**: 불필요한 스펙을 압박하는 모호한 요청 피하기

## AI를 멘토링하는 과정

1. **명확한 임무 부여**
   - "우리 팀 규칙(Write 전략)에 따라, authController.js 파일(Select & Isolate 전략)에 로그인 API를 구현해주세요."

2. **실행을 관찰**
   - "(속으로) 이부분 로직을 빼먹었네"

3. **피드백루프**
   - "사용자 비밀번호를 그대로 비교하면 보안에 아주 취약합니다. (현실 지적) 우리 회사 보안 가이드 문서(Write 전략으로 저장된 지식)의 3.1.2 항목을 다시 읽어보시고, bcrypt 라이브러리를 사용해서 비밀번호를 해싱하는 로직을 추가해주세요. (해결 방향 제시)"

### 피드백루프는 AI를 현실과 '동기화'하는 과정

1. 행동 결과(실수)를 관찰
2. 현실과 우리가 아는 정답의 차이를 지적
3. 해결을 위한 새로운 맥락을 제공
4. 추가된 맥락을 바탕으로 실행

## AI 신입사원을 우리팀의 에이스로 키워보자

특징: 기억력에 제한이 있음

## 정리

- Context란 무엇인가요?
- Context Engineering을 위한 4가지 전략은 무엇인가요?
- Feedback Loop가 AI에게 필요한 이유는 무엇인가요?

## AI와의 관계 설정하기

- **협업(Collaboration)**: AWS에 CI/CD 구축하는 방법 알려줄래?
- **위임(Delegation)**: 구글, 네이버 로그인 기능 구현해줘


## 협업 (Collaboration)

하나의 복잡한 문제를 AI와 해결해 나가는 것. AI와 같은 Window를 공유하며 '질문과 답변'을 통해 해결하는 과정.

## 위임 (Delegation)

두 개 이상의 Task를 역할을 분담해서 처리하는 것. 역할을 명확하게 하고 '명령과 행동'을 통해 업무를 수행하는 과정.

## 예시 - 보안이 강화된 로그인 시스템 만들기

### 01 요구사항 분석

**협업**으로 시작:
- JWT vs 세션 기반 중 어떤 게 좋을까?
- 소셜 로그인은 어디까지 지원해야 할까?
- 2FA는 필수인가?

불확실성이 매우 높기 때문에, 끊임없이 대화하며 함께 명확한 요구사항을 정리하는 '협업'이 필수적.

### 02 구현 설계

**일을 위임** :
- 구체적인 스펙 정의 후, 이 스펙에 맞춰서 데이터베이스 스키마와 기본 인증 미들웨어를 구현.

전체 아키텍처와 보안 정책을 관리하고, AI는 구체적인 코드 구현에 집중.

### 03 코드 리뷰 및 개선

**다시 협업**으로:
- 전체적으로 좋은데, 이 부분에서 토큰 만료 처리가 좀 부족한 것 같고, 패스워드 암호화 강도를 더 높일 수 있을까?

위임된 결과물을 바탕으로, 더 나은 품질을 위해 함께 '협업'하며 다듬는 과정.

## 실제 개발에서의 현실적 워크플로우

1. **협업**: 문제 정의와 설계
2. **협업**: Task 분리 및 역할 분배
3. **위임**: Task 개발 계획 수립
4. **위임**: 계획에 맞게 소스코드 작성
5. **협업**: AI가 완성한 코드 검토 및 피드백

## [협업] 문제 정의와 설계

'보안이 강화된 로그인 시스템을 만들어주세요'라는 요청을 해왔어.

- JWT vs 세션 기반 중 어떤 게 좋을까?
- 소셜 로그인은 어디까지 지원해야 할까?
- 2FA는 필수인가?

보안이 강화된 로그인 시스템 구축에 대한 질문들에 대해 생각을 말해볼게요.

### JWT vs 세션 기반 인증

세션 기반을 추천합니다. 보안상 장점:
- 서버에 저장된 레이아웃이 가능하고 즉시 무효화할 수 있어요.
- XSS 공격에 상대적으로 안전합니다.
- 사용자 활동을 실시간으로 모니터링하기 용이해요.

JWT는 확장성을 줄지만 토큰 탈취 시 무효화가 어렵다는 제한적인 보안 약점이 있어요.

## [협업] Task 분리 및 역할 분배

작성한 요구사항을 바탕으로 작성하되, Task에는 실행해야하는 목표, 개발 난이도, 개발 기간, 개발 난이도가 높을 시 Sub Task로 분리해.

### 보안 강화 로그인 시스템 개발 Task (AI 개발 기준)

| Task | 목표 | 난이도 | 기간 | Sub Task 수 |
|------|------|--------|------|-------------|
| Task 1 | 기본 인증 시스템 구축 | ★★ | 2월 | 3개 |
| Task 2 | 세션 기반 인증 시스템 구현 | ★ | 1월 | 2개 |
| Task 3 | 소셜 로그인 통합 | ★★ | 2월 | 3개 |
| Task 4 | 2FA (이중인증) 구현 | ★★★ | 2월 | 3개 |
| Task 5 | 보안 강화 기능 구현 | ★★ | 2월 | 3개 |
| Task 6 | React 프론트엔드 구현 | ★★★ | 3월 | 3개 |

### 상세 Sub Task 목록

**Task 1: 기본 인증 시스템 구축**

| Sub Task | 목표 | 난이도 | 기간 |
|----------|------|--------|------|
| 1-1 | 사용자 데이터베이스 설계 | ★ | 0.5월 |
| 1-2 | 회원가입 API 개발 | ★★ | 1월 |
| 1-3 | 로그인/로그아웃 API 개발 | ★★ | 0.5월 |

## [위임] Task 개발 계획 수립

'파일의 task에서 가장 먼저 해야할 것을 뽑아서 개발 계획을 상세하게 수립해줄래?'

## [위임] 계획에 맞게 소스코드 작성

'주어진 계획에 맞게 구현해줘. 이때 DB는 추후에 등록하고 화면 mock먼저 해줘'

## [협업] AI가 완성한 코드 검토 및 피드백

AI가 작성한 코드를 확인하고, 내 의도에 부합하는지 검토합니다. 이때 의도와 맞지 않는 부분은 재요청을 통해 의도에 부합하도록 수정합니다.

## 언제 협업하고, 언제 위임할까?

### '협업' -> '위임'

1. 문제의 윤곽이 명확해졌을 때
2. 반복 가능한 패턴이 보일 때
3. 내가 원하는 결과물을 정확히 지시할 수 있을 때

### '위임' -> '협업'

1. AI 결과물이 예상과 다른 부분이 있을 때
2. 더 나은 방향을 함께 고민해야 할 때
3. 새로운 요구사항이 추가되었을 때


## AI와 협업(Collaboration)을 해야합니다

- AI와 함께 일하며 **개인의 역량**을 증강
- 습득된 지식과 내 지식을 결합하는 과정을 통해 원하는 형태의 정보를 도출
- **사고의 확장**으로 집단지성(AI)을 통한 개인의 사고력 향상

## AI에게 위임(Delicate)을 해야합니다

- 반복된 자동화 위임을 통해 **생산성**을 극대화
- 기존에 개인의 WorkFlow의 일부를 AI가 처리하며, **병렬적인 업무처리**
- 개발자는 위임한 이후 결과에 대해 **검토하고 피드백**하는 과정을 거침

## 정리

- 언제 협업하고, 언제 위임할까?
- AI와 협업한다는 것의 의미
- AI에게 위임한다는 것의 의미


## Code Agent의 등장이 시사하는 것

### Agent, Agent, Agent

2025년 1월 6일, OpenAI CEO 샘 올트먼은 블로그에 다음과 같은 글을 작성했습니다:

> "우리는 2025년에 최초의 AI 에이전트들이 '노동력에 합류하여 기업들의 생산성을 실질적으로 변화시키는 것을 보게 될 것이라고 믿습니다. 우리는 계속해서 사람들의 손에 훌륭한 도구들을 반복적으로 제공하는 것이 광범위하게 분산된 훌륭한 결과들로 이어진다고 믿고 있습니다."

## OpenAI가 정의하는 Agent란?

"에이전트는 당신을 대신해서 독립적으로 작업을 수행하는 시스템입니다"

- **LLM**을 활용하여 워크플로우 실행을 관리하고 결정을 내림
- 다양한 도구에 접근하여 외부 시스템과 상호작용하며, 현재 워크플로우 상태에 따라 적절한 도구를 동적으로 선택


## Coding Agent의 등장

|               | Claude Code          | Codex             | Gemini CLI       |
|---------------|----------------------|-------------------|------------------|
| **실행 환경** | Terminal             | Terminal          | Terminal         |
| **Model**     | Claude4 Opus, Claude4 Sonnet | Codex-1           | Gemini 2.5 Pro   |
| **비용**      | Pro / Max            | Plus / Pro / Team | 하루 1000개 무료 |
| **MCP 지원**  | O                    | X                 | O                |

## Claude Code

Anthropic이 사내에서 사용하기 위한 **Agent Coding Tool**로, 문맥을 파악하고, 계획을 수립하며, 코드를 생성하는데 가장 탁월한 서비스입니다.

### Claude Code 동작 과정

- **Claude Code 실행**
  - CLI 내에서 폴더 수정 권한 필요

- **Claude Code 초기화**
  - Code Base 분석 및 Rules(CLAUDE.md) 작성

- **실행 계획 수립**
  - Code의 Context를 분석해서 Plan을 수립

- **계획에 맞게 개발**
  - Plan에 맞게 소스코드를 생성/수정 (자동모드/계획모드)

## 협업에서 위임으로

- **협업**에서 **위임**으로의 전환
  - Assistant → Agent
  - Prompt Engineering → Context Engineering

### 협업에서 위임으로 넘어가는 과정에서 주의해야할 점

- **신규 프로젝트**
  - 앞으로 코드를 통해 맥락을 쌓아야 한다 (의도적으로 정보를 묶고 맥락을 관리)

- **레거시 프로젝트**
  - 실무에서는 코드에 수많은 맥락이 담겨있다 (의도를 추적하고 정보를 탐색하는 과정 필요)

## 김신입이 필요한 맥락(Context)

- 어떤 자료를 보면 될까요?
- 인프라 설정부터 보면 되나요?
- 컨벤션 정리된거 있을까요?
- 보고는 어떻게 드리면 될까요?

> 특징: 기억력에 제한이 있음

## Context Engineering에 대해

1. **Select (선택)**
   - "일단 이 두 개 파일만 읽어보세요"

2. **Isolate (격리)**
   - "다른 회의는 지금 신경 쓰지 마세요"

3. **Write (기록)**
   - "우리 팀의 규칙은 이 위키에 정리되었어요"

4. **Compress (압축)**
   - "오늘 한 일, 세 줄로 요약해서 보고해주세요"

## 정리

- Agent Coding Tool은 어떤 방향으로 가고 있나요?
- Agent에게 전달할 맥락을 잘 관리하려면 어떻게 해야할까?
- AI에게 어떻게 맥락을 전달할 수 있을까?

## AI에게 어떻게 맥락을 전달할 수 있을까?

[그림: Context Engineering]
- **Context**는 여러 요소로 구성됩니다:
  - **Instructions / System Prompt**
  - **Long-Term Memory**
  - **State / History (Short-term Memory)**
  - **Retrieved Information (RAG)**
  - **User Prompt**
  - **Available Tools**
  - **Structured Output**

이러한 요소들은 AI에게 맥락을 전달하는 데 중요한 역할을 합니다.
