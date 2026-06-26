## Bong Subway Project

## WorkSpaces

```bash

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

### Dependencies (node_module) 설치

```bash
npm install -g pnpm   #pnpm 미설치 경우에만 실행
pnpm install
```

### 로컬 Dev Server 실행 (development 모드)

```bash
pnpm run dev
```

### 로컬 접속 URL

[http://localhost:2450](http://localhost:2450)

### Build (배포)

```bash
pnpm run build
```
