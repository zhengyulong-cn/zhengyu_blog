# Hermes Agent 教程

## 项目概述

### 什么是 Hermes Agent

Hermes Agent 是由 NousResearch 开发的开源 AI Agent 框架。它可以运行在终端、桌面应用、消息平台(Telegram、Discord、Slack 等 23+个平台）中，自主调用工具完成任务。

**本质上一个拥有内置学习循环的自主 AI Agent**：它会从经验中创造技能、在使用过程中自我改进、搜索自己的历史对话获取上下文、并跨会话建立你的用户画像。

它可以跑在一台 $5 的 VPS 上、GPU 集群里，或者按需启停的无服务器基础设施上(Modal、Daytona)。它**不绑定在你的笔记本上**——你可以从 Telegram 跟它聊天，而它正在一台云 VM 上工作。

### 与 OpenClaw 对比

| 维度            | Hermes Agent                   | OpenClaw   |
| :-------------- | :----------------------------- | :--------- |
| 技能存储        | 透明、人类可读的 SKILL.md 文件 | 不透明格式 |
| 自我改进        | 内置 Curator 自动维护技能库    | 无         |
| Provider 灵活性 | 20+ 提供商，400+ 模型          | 较少       |
| Windows 支持    | v0.14+ 原生支持                | 有限       |
| 桌面应用        | v0.16+ Hermes Desktop          | 无         |
| 许可证          | MIT                            | —          |

### 配置 PowerShell 临时代理

```
$env:HTTP_PROXY="http://127.0.0.1:7890"
$env:HTTPS_PROXY="http://127.0.0.1:7890"
$env:ALL_PROXY="socks5h://127.0.0.1:7891"
```

### 安装

官网：https://hermes-agent.nousresearch.com/docs/zh-Hans

```
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

执行 `hermes setup --portal`，完成登录、设置 Nous 提供商等配置。

### 配置

配置目录：`C:\Users\zheng\AppData\Local\hermes`

目录结构：

```
~/.hermes/
├── config.yaml    # 主配置文件（模型、终端、TTS、压缩等）
├── .env           # API 密钥和机密信息
├── auth.json      # OAuth 提供商凭证 (Nous Portal 等)
├── SOUL.md        # 主 Agent 的身份 / 人格文件，会拼入系统提示词开头部分
├── memories/      # 持久化记忆 (MEMORY.md、USER.md)
├── skills/        # 技能
├── cron/          # 定时任务
├── sessions/      # 会话
└── logs/          # 日志 (errors.log、gateway.log - 密钥自动脱敏)
```

配置管理命令：

```bash
# 查看当前配置
hermes config
# 用 $EDITOR 打开 config.yaml 编辑
hermes config edit
# 直接设置某个配置项
hermes config set section.key value
```

安装好 hermes 后，可以执行如下命令运行客户端：

```bash
hermes dashboard
```

将 DeepSeek 接入 hermes，按照 DeepSeek 官网给出步骤：

https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/hermes/

::: tip

当遇到 API 连接问题时，可以执行 `hermes gateway restart` 重启网关。

:::
