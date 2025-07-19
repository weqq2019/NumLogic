# NumLogic 项目结构文档

> **版本**: v1.2  
> **更新时间**: 2025-01-19  
> **维护**: Claude Code 自动生成

---

## 📊 项目概览

**NumLogic** 是一个跨平台计算器应用项目，采用现代前端技术栈构建：

- **前端架构**: Vue3 + TypeScript + Vite
- **状态管理**: Pinia
- **路由系统**: Vue Router
- **代码规范**: ESLint
- **开发模式**: 组合式 API (Composition API)
- **后期规划**: UniApp 多端适配

---

## 📁 项目目录结构

```
NumLogic/
├── CLAUDE.md                    # Claude Code 项目指令文档
├── NumLogic.code-workspace      # VS Code 工作区配置
├── structure.md                 # 项目结构记录文档（本文件）
└── frontend/                    # Vue3 前端应用目录
    ├── .editorconfig           # 编辑器配置
    ├── .gitattributes          # Git 属性配置
    ├── .gitignore              # Git 忽略文件
    ├── .vscode/                # VS Code 配置
    │   └── extensions.json     # 推荐扩展配置
    ├── README.md               # 前端项目说明
    ├── env.d.ts                # TypeScript 环境声明
    ├── eslint.config.ts        # ESLint 配置
    ├── index.html              # 入口 HTML
    ├── package.json            # 依赖管理
    ├── package-lock.json       # 锁定版本
    ├── tsconfig.json           # TypeScript 配置
    ├── tsconfig.app.json       # 应用 TS 配置
    ├── tsconfig.node.json      # Node.js TS 配置
    ├── vite.config.ts          # Vite 构建配置
    ├── public/                 # 静态资源
    │   └── favicon.ico         # 网站图标
    └── src/                    # 源代码目录
        ├── main.ts             # 应用入口文件
        ├── App.vue             # 根组件
        ├── types/              # TypeScript 类型定义(新增)
        │   └── calculator.ts   # 计算器类型定义(新增)
        ├── assets/             # 静态资源
        │   ├── base.css        # 基础样式
        │   ├── main.css        # 主样式文件
        │   └── logo.svg        # Logo 图标
        ├── components/         # 可复用组件
        │   ├── CalculatorButton.vue # 计算器按钮组件(新增)
        │   ├── HelloWorld.vue  # 示例组件
        │   ├── TheWelcome.vue  # 欢迎组件
        │   ├── WelcomeItem.vue # 欢迎项组件
        │   └── icons/          # 图标组件
        │       ├── IconCommunity.vue
        │       ├── IconDocumentation.vue
        │       ├── IconEcosystem.vue
        │       ├── IconSupport.vue
        │       └── IconTooling.vue
        ├── router/             # 路由配置
        │   └── index.ts        # 路由定义
        ├── stores/             # Pinia 状态管理
        │   └── counter.ts      # 示例 store
        └── views/              # 页面组件
            ├── HomeView.vue    # 首页
            └── AboutView.vue   # 关于页面
```

---

## 🛠 技术栈详情

### 📦 核心依赖
- **vue**: ^3.5.13 - Vue.js 框架
- **vue-router**: ^4.4.5 - 路由管理
- **pinia**: ^2.2.2 - 状态管理

### 🔧 开发依赖
- **vite**: ^5.4.8 - 构建工具
- **typescript**: ~5.6.3 - 类型系统
- **vue-tsc**: ^2.1.6 - Vue TypeScript 编译
- **eslint**: ^9.13.0 - 代码检查
- **@vitejs/plugin-vue**: ^5.1.4 - Vue 插件

### 📋 可用命令
```bash
npm run dev        # 启动开发服务器
npm run build      # 构建生产版本
npm run preview    # 预览构建结果
npm run type-check # TypeScript 类型检查
npm run lint       # 代码检查
npm run format     # 代码格式化
```

---

## 🎯 开发规范

### 🏗 架构原则
- **单一职责**: 每个组件/文件专注一个功能
- **组合式 API**: 使用 Vue3 Composition API
- **TypeScript 优先**: 全面类型安全
- **模块化设计**: 便于后续 UniApp 迁移

### 📏 文件命名规范
- **组件**: PascalCase (如 `CalculatorButton.vue`)
- **Composables**: useXxx (如 `useCalculator.ts`)
- **Pages**: XxxView.vue (如 `CalculatorView.vue`)
- **Stores**: camelCase (如 `calculatorStore.ts`)

---

## 📋 结构变更记录

### v1.0 (2025-01-19)
**项目初始化：**
- ✅ `CLAUDE.md` - Claude Code 项目协作指令文档
- ✅ `NumLogic.code-workspace` - VS Code 工作区配置
- ✅ `structure.md` - 项目结构记录文档

**前端架构搭建：**
- ✅ `frontend/` - Vue3 + TypeScript + Vite 前端项目目录
- ✅ `frontend/src/` - 源代码根目录
- ✅ `frontend/src/components/` - 可复用组件目录
- ✅ `frontend/src/views/` - 页面组件目录
- ✅ `frontend/src/stores/` - Pinia 状态管理目录
- ✅ `frontend/src/router/` - Vue Router 路由配置
- ✅ `frontend/src/assets/` - 静态资源目录

**开发环境配置：**
- ✅ `frontend/package.json` - 项目依赖和脚本配置
- ✅ `frontend/vite.config.ts` - Vite 构建配置
- ✅ `frontend/tsconfig.json` - TypeScript 配置
- ✅ `frontend/eslint.config.ts` - ESLint 代码检查配置
- ✅ `frontend/.vscode/extensions.json` - VS Code 推荐扩展

**功能说明：**
- ✅ Vue3 前端框架：现代响应式框架，支持组合式 API
- ✅ TypeScript 类型系统：提供类型安全和更好的开发体验
- ✅ Vite 构建工具：快速的开发服务器和现代构建流程
- ✅ Vue Router 路由：单页应用路由管理
- ✅ Pinia 状态管理：轻量级状态管理解决方案
- ✅ ESLint 代码检查：保证代码质量和一致性

---

## 📋 结构变更记录

### v1.1 (2025-01-19)
**新增组件：**
- ✅ `frontend/src/components/CalculatorButton.vue` - 计算器按钮组件

**功能说明：**
- ✅ CalculatorButton 组件：可复用的计算器按钮，支持数字、运算符、功能键和等号四种类型，包含悬停效果、按压反馈和响应式设计

### v1.2 (2025-01-19)
**新增类型定义：**
- ✅ `frontend/src/types/` - TypeScript 类型定义目录
- ✅ `frontend/src/types/calculator.ts` - 计算器核心类型定义文件

**功能说明：**
- ✅ calculator.ts 类型文件：包含完整的计算器类型系统，定义了操作符、按钮配置、状态管理、历史记录、内存管理等所有相关接口和类型，为后续开发提供类型安全保障