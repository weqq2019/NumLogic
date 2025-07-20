# NumLogic

一个现代化的跨平台计算器应用，采用 Vue3 + TypeScript 构建。

## 功能特性

- 🧮 **基础计算**: 四则运算、百分比、平方根等
- 💾 **内存功能**: MC/MR/M+/M- 内存操作
- 📝 **历史记录**: 保存计算历史便于回顾
- 🎨 **现代设计**: 响应式界面，支持多种设备
- ⌨️ **键盘支持**: 支持键盘快捷操作
- 🔧 **TypeScript**: 完整类型安全保障

## 技术栈

- **前端框架**: Vue 3.5+ (组合式 API)
- **开发语言**: TypeScript 5.6+
- **构建工具**: Vite 5.4+
- **状态管理**: Pinia 2.2+
- **路由管理**: Vue Router 4.4+
- **代码规范**: ESLint 9.13+

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
cd frontend
npm install
```

### 开发运行

```bash
npm run dev
```

访问 `http://localhost:5173` 查看应用。

### 构建生产版本

```bash
npm run build
```

## 项目结构

详细的项目结构和变更记录请查看：📋 [structure.md](./structure.md)

核心目录概览：
- `frontend/` - Vue3 + TypeScript 前端应用
- `CLAUDE.md` - Claude Code 开发协作指令
- `structure.md` - 完整项目结构文档

## 开发指令

```bash
npm run dev        # 启动开发服务器
npm run build      # 构建生产版本
npm run preview    # 预览构建结果
npm run type-check # TypeScript 类型检查
npm run lint       # 代码检查
npm run format     # 代码格式化
```

## 未来规划

- 📱 **多端适配**: 计划使用 UniApp 实现跨平台
- 🧮 **科学计算**: 扩展高级数学运算功能
- 🌐 **PWA 支持**: 添加离线使用能力
- 🌍 **国际化**: 多语言支持

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 许可证

MIT License

---

> 基于 Vue3 + TypeScript 构建的现代计算器应用