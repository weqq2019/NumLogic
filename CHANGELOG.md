# 变更日志

所有项目的重要变更都记录在此文件中。

此项目遵循 [Keep a Changelog](https://keepachangelog.com/) 格式，并采用 [语义化版本](https://semver.org/) 进行版本管理。

## [未发布]

### Added (新增)
- 待添加功能

## [v1.9] - 2025-01-20

### Added (新增)
- `doc/` 项目文档目录
- `doc/新手学习指南.md` 完整的开发工具链学习指南
- CLAUDE.md 中新增学习指南引用

### Changed (变更)
- 完善 `doc/新手学习指南.md`，添加 23 个开发工具的完整说明
- 为已掌握的 Git 工作流工具添加完成标记
- 优化学习路径和实践建议

## [v1.8] - 2025-01-20

### Added (新增)
- `CHANGELOG.md` 标准变更日志文件
- CLAUDE.md 文档管理规范章节
- 专业的版本历史管理体系

### Changed (变更)
- 重构 structure.md 文档架构，移除重复的变更记录
- 实现文档职责分离：CHANGELOG.md 负责变更历史，structure.md 负责结构说明
- 优化文档引用关系和维护流程

## [v1.7] - 2025-01-20

### Added (新增)
- `project-rules-cn/` 中文版项目规则目录
- `project-rules-cn/提交规范.mdc` Git 提交规范中文版
- `project-rules-cn/快速提交.mdc` 快速提交规范中文版
- `project-rules-cn/一键推送.mdc` 一键推送工作流规则
- `project-rules-cn/新手学习指南.md` Git 新手学习指导文档
- `project-rules-cn/更新变更日志.mdc` 变更日志管理规则

### Changed (变更)
- 更新 CLAUDE.md Git 工作流章节引用为中文版规则文件
- 简化提交模板，去除 Claude Code 标识
- 添加快速提交选项的中文引用

## [v1.6] - 2025-01-20

### Added (新增)
- `README.md` 项目说明文档

## [v1.5] - 2025-01-19

### Fixed (修复)
- 修复 `calculatorStore.ts` TypeScript 导入错误 (INITIAL_STATE, ERROR_MESSAGES)
- 简化 `App.vue` 移除默认 Vue 欢迎内容，直接显示计算器

### Changed (变更)
- 验证计算器功能完全正常工作
- 数字输入、四则运算、等号计算完全正常
- 清除功能 (C/CE/退格)、内存操作 (MC/MR/M+/M-) 工作正常
- 特殊功能 (±/√/%) 和历史记录功能正常
- 响应式设计在不同设备上显示完美

## [v1.4] - 2025-01-19

### Added (新增)
- `frontend/src/views/CalculatorView.vue` 计算器主页面
- 完整的计算器用户界面，集成 CalculatorButton 组件和 CalculatorStore 状态管理
- 美观的显示屏、完整的按钮布局、历史记录面板、响应式设计

## [v1.3] - 2025-01-19

### Added (新增)
- `frontend/src/stores/calculatorStore.ts` 计算器 Pinia 状态管理
- 完整的计算器状态管理系统，包含数字输入、运算符处理、计算执行
- 内存操作、历史记录、错误处理等核心功能
- 采用 Pinia 架构提供响应式状态管理

## [v1.2] - 2025-01-19

### Added (新增)
- `frontend/src/types/` TypeScript 类型定义目录
- `frontend/src/types/calculator.ts` 计算器核心类型定义文件
- 完整的计算器类型系统，定义操作符、按钮配置、状态管理
- 历史记录、内存管理等所有相关接口和类型，提供类型安全保障

## [v1.1] - 2025-01-19

### Added (新增)
- `frontend/src/components/CalculatorButton.vue` 计算器按钮组件
- 可复用的计算器按钮，支持数字、运算符、功能键和等号四种类型
- 包含悬停效果、按压反馈和响应式设计

## [v1.0] - 2025-01-19

### Added (新增)
- 项目初始化和基础架构
- Vue3 + TypeScript + Vite 前端框架
- Pinia 状态管理和 Vue Router 路由系统
- ESLint 代码检查和 VS Code 工作区配置
- CLAUDE.md 项目协作指令文档
- NumLogic.code-workspace VS Code 工作区配置