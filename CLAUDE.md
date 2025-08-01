# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# 📋 文档目录

1. [💬 技术表达优化指令](#技术表达优化指令)
2. [🏗️ 多语言项目结构规范](#多语言项目结构规范)
3. [🚀 Git 自动化工作流](#git-自动化工作流)
4. [📊 项目架构概览](#项目架构概览)

---

# 💬 技术表达优化指令

在回复用户时，请遵循以下格式：

1. **首先输出**：
   ```
   📝 **原始表达**：[用户的原始问题]
   ✨ **优化表达**：[技术上更准确、专业的表达方式]
   ```

2. **然后**：正常回答问题

## 优化目标
- 使用准确的技术术语
- 提供更清晰的问题描述
- 指出潜在的技术细节
- 建议更好的提问方式

## 示例
```
📝 **原始表达**：这些代码在容器运行 是不是我要重启容器?
✨ **优化表达**：修改了 Python 源代码后，由于容器内的应用进程已经加载了旧代码，是否需要重启容器来应用代码更改？
```

---

# 🏗️ 多语言项目结构规范

> 本文档指导 Claude Code 在本项目中的代码生成、结构组织与自动结构记录。  
> 本项目采用多语言架构（Python / Vue / TypeScript / Java / Go 等），需确保各模块职责清晰、结构一致、代码可维护、文档可追溯。

## 📚 规范目录

1. [📦 多语言模块结构标准](#多语言模块结构标准)
2. [🎯 单一职责原则 (SRP)](#单一职责原则-srp)
3. [📏 文件与函数复杂度控制](#文件与函数复杂度控制)
4. [🧠 命名与代码风格建议](#命名与代码风格建议)
5. [📚 自动结构记录结构](#自动结构记录结构)

---

## 📦 多语言模块结构标准

所有语言模块需统一遵循“**一目录一模块、一文件一职责**”的组织方式。Claude Code 应始终生成结构清晰、职责单一的代码。

### 🐍 Python 模块（FastAPI / Flask）

- `routes.py`：API 路由注册
- `service.py`：核心业务逻辑
- `schema.py`：请求/响应模型（Pydantic）
- `dao.py` / `crud.py`：数据库访问
- `utils.py`：本模块工具函数（非跨模块）

### 🖼 Vue / TypeScript 模块（Vue3）

- `XxxPage.vue`：页面组件（组合式 API）
- `composables/useXxx.ts`：逻辑封装（状态、计算）
- `api/xxxApi.ts`：接口请求封装
- `components/XxxItem.vue`：可复用 UI 子组件

### ☕ Java 模块（SpringBoot）

- `XxxController.java`：控制层
- `XxxService.java`：业务逻辑
- `XxxRepository.java`：数据访问层
- `XxxDto.java`：数据结构传输类

### 🌀 Go 模块

- `handler.go`：接口处理
- `service.go`：业务逻辑实现
- `model.go`：结构体定义
- `repo.go`：数据库封装

---

## 🎯 单一职责原则 (SRP)

Claude Code 必须遵循“单一职责原则”：

- 每个函数 / 文件 / 类仅完成一类任务
- 不允许在一个文件中混合视图逻辑、状态管理与数据库访问
- 若职责模糊或过多，必须主动建议拆分

📌 判断依据：

- 是否可单独测试？
- 是否会因多个原因变化？
- 是否影响模块复用？

---

## 📏 文件与函数复杂度控制

Claude Code 生成的代码必须控制在合理规模内，以下为推荐上限：

| 文件类型       | 推荐上限 | 强制上限 | 拆分建议                  |
|----------------|-----------|-----------|---------------------------|
| `.py` 文件     | ≤ 400 行  | < 500 行  | service / dao 拆分        |
| `.vue` 文件    | ≤ 400 行  | < 500 行  | 拆分 composables / 组件   |
| `.ts` / `.js`  | ≤ 400 行  | < 500 行  | 拆成 hooks / utils        |
| `.java`        | ≤ 500 行  | < 800 行  | 拆 controller/service/dto |
| `.go` 文件     | ≤ 500 行  | < 800 行  | 拆 handler / service 等   |

🔧 函数限制：

- 单个函数不超过 **30 行**
- 函数应聚焦一件事，避免嵌套层级超过 3 层

📌 所有行数包含注释、空行、import。结构复杂性 > 行数优先。

---

## 🧠 命名与代码风格建议

Claude Code 在生成文件与函数时，须遵循语言约定与语义清晰：

| 类型       | 命名风格     | 示例                   |
|------------|--------------|------------------------|
| Python     | `snake_case` | `get_user_info()`      |
| Java       | `PascalCase` | `UserController.java`  |
| Vue 组件   | `PascalCase` | `UserForm.vue`         |
| Composable | `useXxx`     | `useUserForm.ts`       |
| API 封装   | `xxxApi.ts`  | `userApi.ts`           |

📌 不得使用无意义命名如：`temp.js`、`test.py`、`final1.vue` 等。

---

## 📚 自动文档维护规范

### 📋 structure.md 更新触发条件
Claude Code 在执行以下操作时，**必须立即更新 `structure.md` 文件**：

#### 📁 文件系统变更
- 创建新目录或子目录（如 `[项目结构]/[子模块]/`）
- 创建新文件（任何扩展名：.py、.js、.vue、.java、.go、.rs 等）
- 删除或重命名重要文件/目录
- 移动文件到不同目录

#### 🔧 功能模块变更
- 新增 API/路由文件（根据项目技术栈）
- 新增业务逻辑模块（service、controller、handler 等）
- 新增页面/组件文件（React、Vue、Angular 等）
- 新增可复用组件或工具函数
- 新增数据模型、接口定义或类型声明
- 新增测试文件或测试套件

#### 🗄️ 数据存储变更
- 创建数据库迁移脚本（SQL、NoSQL、ORM）
- 新增或修改数据模型（任何ORM框架）
- 新增数据库初始化或种子脚本
- 新增配置文件（环境变量、配置类等）

### 📝 更新操作流程

1. **执行代码操作**：完成用户请求的文件创建/修改
2. **立即更新记录**：在同一回复中更新 structure.md
3. **版本递增**：每次更新时版本号 +0.1（如 v1.0 → v1.1）
4. **时间戳更新**：使用当前日期（格式：YYYY-MM-DD）
5. **进度标记**：在目录结构中新增文件后添加 `(新增)` 标记，便于用户追踪开发进度

### 📦 详细记录格式

#### 版本信息更新（文件顶部）
```markdown
> **版本**: v1.2  
> **更新时间**: 2025-07-19  
> **维护**: Claude Code 自动生成
```

#### 目录结构标记格式
```markdown
# 在目录树中标记新增文件
├── components/         # 可复用组件
│   ├── NewComponent.vue # 新组件描述(新增)
│   ├── ExistingComponent.vue # 已有组件描述
```

#### 📝 重要说明
**注意：结构变更记录已统一至 `CHANGELOG.md` 管理**

`structure.md` 专注于：
- 📁 当前项目结构快照
- 🎯 开发进度和 Issue 规划  
- 📖 版本历史摘要（引用 CHANGELOG.md）

详细的变更记录请使用 `@project-rules-cn/更新变更日志.mdc` 维护 CHANGELOG.md。

### 🚨 structure.md 执行规则

1. **立即性**：每次文件操作后立即更新，不得延迟或遗忘
2. **完整性**：记录所有相关文件变更，包括依赖文件的修改
3. **描述性**：每个文件都要有清晰的功能说明
4. **版本控制**：严格按版本号递增，便于追踪变更历史
5. **格式统一**：严格按照上述模板格式执行，保持文档一致性

---

### 📖 README.md 更新触发条件

Claude Code 在以下情况时，**考虑更新 `README.md` 文件**：

#### 🚀 功能特性变更
- 新增核心功能模块（影响用户主要使用场景）
- 完成重大功能里程碑（重要特性发布）
- 移除或重构主要功能模块
- 新增重要 API 接口或服务

#### 🏗️ 技术栈更新
- 框架版本重大升级（影响兼容性或使用方式）
- 新增重要技术依赖（改变项目能力边界）
- 架构迁移（单体→微服务、SPA→SSR 等）
- 数据库或存储方案变更

#### 📦 部署配置变更
- 构建流程重大调整（新增容器化、CI/CD 等）
- 部署方式变更（云平台迁移、CDN 配置等）
- 环境配置要求变化（运行时版本、系统依赖等）
- 新增性能监控或日志系统

#### 🎯 项目定位调整
- 项目名称、描述或用途变更
- 目标用户群体调整
- 功能范围扩展或收缩
- 开源协议或授权方式变更

### 🚨 README.md 维护原则

1. **稳定性优先**：避免频繁更新，保持文档稳定性
2. **用户导向**：以用户使用体验为主，技术细节为辅
3. **简洁明了**：保持简洁，详细信息引用其他文档
4. **版本同步**：重大版本发布时检查更新需求
5. **引用为主**：通过引用 structure.md 避免重复维护

### ❌ README.md 不更新情况

- 日常文件创建/修改（组件、工具函数等）
- Bug 修复和小功能优化
- 代码重构（不影响用户使用）
- 开发工具配置调整
- 测试文件增删

---

# 🚀 Git 自动化工作流

> 基于 `@project-rules-cn/提交规范.mdc` 规则，扩展 NumLogic 项目的 AI 协作流程

## 核心提交规则

使用 `@project-rules-cn/提交规范.mdc` 的标准化提交流程：
- 自动预检查 (lint/build/docs)
- Conventional commits 格式
- 完整的 emoji 类型映射 (28 种)
- 原子化提交建议

## 项目特化扩展

### 📋 Git 环境预检查

在执行 Git 工作流之前，额外检查：

```bash
# 检查用户身份配置
git config user.name
git config user.email

# 检查远程仓库连接
git remote -v
```

### 🎯 AI 协作流程

当用户要求 Claude 进行代码修改后自动提交时：

1. **完成代码修改**后，主动询问用户是否执行 Git 工作流
2. **等待用户确认**后，调用 `/commit` 执行标准提交流程
3. **强制 issue 关联**：所有提交必须包含 `#issue-number`
   - 当前活跃 Issue 可查看 `@structure.md` 中的"📈 当前进度"
   - 如用户未指定 Issue 编号，应主动查看 structure.md 确定合适的编号
   - 文档相关工作通常使用当前活跃的 Issue 编号

### 🔤 触发条件

当用户使用以下关键词时，Claude 应执行 Git 工作流：
- "提交代码"、"commit"
- "推送代码"、"push" 
- "自动提交"、"auto commit"
- "git 提交"

### 🚀 可用命令

- **`/commit`** - 执行标准提交流程 (参考: `@project-rules-cn/提交规范.mdc`)
- **`/commit-fast`** - 执行快速提交流程 (参考: `@project-rules-cn/快速提交.mdc`)  
- **`/push`** - 执行一键推送工作流 (参考: `@project-rules-cn/一键推送.mdc`)

### 📝 示例用法

用户：**"修改完数据收集器后自动提交代码 #12"**

Claude 执行流程：
1. 完成代码修改
2. **主动询问**：
   ```
   ✅ 代码修改完成！是否执行 Git 工作流？
   
   📋 预览操作：
   - 调用 /commit 执行标准提交流程
   - 自动添加 issue 关联: #12
   
   请回复：yes/y 执行 | no/n 跳过 | push 执行并推送
   ```

3. **等待用户确认**后执行 `/commit` 并确保包含 issue 编号

### 🔧 确认响应选项

- **`yes` / `y`** - 执行 `/commit`
- **`push` / `p`** - 执行 `/commit` + push
- **`no` / `n`** - 跳过所有 Git 操作
- **`preview`** - 显示将要执行的命令

### 📌 特殊情况处理

- 如果用户未提供 issue 编号，应查看 `@structure.md` 确定当前活跃的 Issue
- **Issue 编号获取顺序**：
  1. 用户明确指定的编号
  2. 从 @structure.md "📈 当前进度" 获取当前活跃编号
  3. 根据修改类型选择合适的规划编号
- 必要时可使用 `/commit-fast` 进行快速提交 (参考: `@project-rules-cn/快速提交.mdc`)

---

# 📊 项目架构概览

- 📋 **详细结构**: @structure.md (包含 Issue 编号规划和当前进度)
- 📖 **用户文档**: @README.md
- 📝 **版本历史**: @CHANGELOG.md
- 🎓 **学习指南**: @doc/新手学习指南.md

## 核心架构模式

- **前端**: Vue3 + TypeScript + Vite
- **状态管理**: Pinia  
- **路由**: Vue Router
- **代码规范**: ESLint
- **未来规划**: UniApp 多端适配

## 规则文件来源

### 📋 Agent Rules 项目
- **GitHub**: [steipete/agent-rules](https://github.com/steipete/agent-rules)
- **说明**: NumLogic 的 `project-rules/` 目录来源于 Agent Rules 项目
- **价值**: 社区验证的 AI 助手开发工作流规则集合
- **本地化**: 在原有基础上增加了中文版本和项目特化配置

## 文档管理规范

### 📋 CHANGELOG.md 维护

项目采用标准的变更日志管理：

- **格式标准**: 遵循 [Keep a Changelog](https://keepachangelog.com/) 规范
- **更新时机**: 每次重要功能开发完成后更新
- **分类方式**: Added/Changed/Deprecated/Removed/Fixed/Security
- **维护工具**: 使用 `@project-rules-cn/更新变更日志.mdc` 规则

### 📝 使用方式

```bash
/更新变更日志 1.8.0 added "新增暗色主题功能"
/更新变更日志 1.7.1 fixed "修复计算器精度问题"
```

### 🔗 文档关系

- **CHANGELOG.md** - 记录所有版本变更
- **structure.md** - 引用 CHANGELOG.md，避免重复
- **README.md** - 用户快速上手指南
