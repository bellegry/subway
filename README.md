## Bong Subway Project

## Project Structure

```bash
src
 ├ app              # Next.js App Router (페이지, 레이아웃, 라우팅)
 ├ components       # Atomic Design 기반 공용 UI 컴포넌트
 │   ├ atoms        # Button, Badge, Icon 등 최소 단위 컴포넌트
 │   ├ molecules    # 여러 Atom을 조합한 컴포넌트 (LineTab, ViewToggle 등)
 │   └ organisms    # 화면 단위의 큰 컴포넌트 (StationPanel, ArrivalSection 등)
 │
 ├ data             # 정적 데이터(JSON, 상수 매핑, 역 정보)
 │                    # 예: stations.json, subwayLine.ts
 │
 ├ lib              # API 호출 및 공통 라이브러리 코드
 │                    # 서울시 Open API 요청 처리
 │
 ├ stores           # Zustand 전역 상태 관리
 │                    # 예: subwayStore.ts
 │
 ├ types            # TypeScript 타입 및 인터페이스 정의
 │                    # 예: Station, RealtimeArrival
 │
 ├ ui               # 공통 UI 스타일 및 디자인 시스템
 │                    # 예: button.ts, badge.ts, variants.ts
 │
 └ utils            # 순수 유틸리티 함수
                      # 예: getSubwayLine.ts, sortByEta.ts, formatTime.ts
```

### 기술 스택

| name       | version |
| ---------- | ------- |
| node.js    | 24.14.0 |
| pnpm       | 11.1.1  |
| next.js    | 16.2.6  |
| react      | 19.2.4  |
| zustand    | 5.0.13  |
| typescript | 5       |
| tailwind   | 4       |
| eslint     | 9       |

### IDE

- VS Code
- VS Code Extensions
  - Prettier
  - Prettier Code formatter
  - ESLint
  - GitLens
  - Git Graph
  - Tailwind CSS IntelliSense

> 💡 **안내**
> 프로젝트 내 `.vscode/settings.json`에 ESLint 및 Prettier 자동 정렬(저장 시 자동 포맷팅) 설정이 이미 포함되어 있습니다. 익스텐션만 설치하시면 별도의 추가 설정 없이 바로 적용됩니다.

### Installation (node_module) 설치

```bash
npm install -g pnpm   # pnpm 미설치 경우에만 실행
pnpm install
```

### 로컬 Dev Server 실행 (development 모드)

```bash
pnpm dev
```

### 로컬 접속 URL

[http://localhost:2450](http://localhost:2450)

### Build (배포)

```bash
pnpm build
```
