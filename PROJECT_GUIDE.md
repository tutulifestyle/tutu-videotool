# TuTu视频发布工具 - 项目复刻指南

## 项目概述

这是一个基于Web的YouTube视频发布辅助工具，使用AI（支持OpenAI、DeepSeek、Gemini等）自动生成视频标题、摘要和标签。

## 技术栈

- 纯前端应用（HTML + CSS + JavaScript）
- 无需后端服务器
- 支持多种AI API（OpenAI、DeepSeek、Gemini、自定义）
- 使用localStorage进行数据持久化

## 项目结构

```
tutu-videotool/
├── index.html          # 主HTML文件
├── styles.css          # 样式文件
├── script.js           # JavaScript逻辑文件
├── favicon.svg         # 网站图标
└── PROJECT_GUIDE.md    # 本文档
```

## 快速开始

### 方法1：使用Claude Code重建项目

1. 在新电脑上创建项目文件夹：
   ```bash
   mkdir tutu-videotool
   cd tutu-videotool
   ```

2. 打开Claude Code，提供以下提示词：

```
我需要创建一个YouTube视频发布辅助工具，具有以下功能：

## 核心功能
1. 稿件录入区域，支持输入视频脚本
2. 使用AI生成三个内容：
   - 标题推荐（10个标题）
   - 摘要生成（250字以内）
   - 标签生成（至少10个标签）
3. 历史记录功能（保存最近10条记录）
4. 支持导出历史记录为txt文件

## AI服务商支持
- OpenAI (gpt-4o, gpt-4o-mini, gpt-4-turbo, gpt-3.5-turbo)
- DeepSeek (deepseek-chat, deepseek-reasoner)
- Gemini (gemini-2.0-flash-exp, gemini-1.5-pro, gemini-1.5-flash)
- 自定义API

## 技术要求
1. 纯HTML+CSS+JavaScript，无需后端
2. 使用localStorage存储配置和历史记录
3. API密钥使用简单的XOR+Base64加密
4. 三个AI请求并发执行（Promise.allSettled）
5. 响应式设计，主容器宽度1000px

## UI设计
### 布局
- 头部：YouTube logo + 标题 + 主题切换器（4种颜色：红、棕、蓝、绿）
- 主体区域（从上到下）：
  1. 稿件录入（带"历史"按钮）
  2. 标题推荐（min-height: 380px, max-height: 480px）
  3. 摘要生成（min-height: 200px, max-height: 300px）
  4. 标签生成（min-height: 100px, max-height: 150px）
  5. Prompt配置（可折叠）
  6. API配置（默认折叠）
- 页脚：创意来源链接

### 按钮样式统一
- 标准按钮：padding: 8px 16px; font-size: 14px;
- 提交按钮：padding: 8.8px 17.6px; font-size: 15.4px;（放大10%，带阴影效果）
- 所有按钮使用主题色背景，白色文字

### 主题颜色
- 默认红色：#802520
- 棕色：#6a4d43
- 蓝色：#70808f
- 绿色：#364023

## 功能详情

### 1. Prompt配置
- 三个可配置的prompt（标题、摘要、标签）
- "修改默认"按钮：打开单独窗口修改默认prompt，带红色警告"您的修改无法撤销，请谨慎进行。"
- "还原默认"按钮：恢复到当前默认prompt
- "保存"按钮：保存当前prompt配置

### 2. API配置
- 支持多服务商切换，每个服务商独立保存配置
- 测试连接功能：自动获取可用模型列表
- 配置导入/导出（.tutuapi文件，加密格式）
- 一键还原所有设置

### 3. 历史记录
- 保存最近10条生成结果
- 点击记录恢复内容（窗口不关闭）
- 清空功能（带确认）
- 存档功能：导出为txt文件，格式如下：
```
标题：
[标题内容]

摘要：
[摘要内容]

标签：
[标签内容]

视频稿件：
[稿件内容]

```
- 文件名格式：202510150341.txt（纯数字，日期+时间）

### 4. 默认Prompt内容
```javascript
标题: "基于提供的视频脚本,想出10个既吸睛又有SEO优势的YouTube视频标题。标题应反映出鲜明的个人视频作者风格(字数建议25-35字),并在输出时直接排列,不要加序号或附加解释说明。重要：每个标题占一行，标题之间不要有空行，从上到下紧密排列。"

摘要: "基于提供的视频脚本,请进行极致的提炼(不丢失重要信息),用作youtube视频的简介,控制在250字以内。请注意:1.所有原文涉及到\"我\"、\"作者\"这样的第一人称代词,请改为\"TuTu\",并尽量用\"TuTu\"来替代\"她\"的用法。2.文本内容尽量精简、准确,同时注意适当加入些口语化内容,不显得生硬。3.开头必须以TuTu开始。5.同时检查所有英文内容的拼写错误。6.文本内容为一段，不分行。"

标签: "基于提供的视频脚本,将文中的关键词以出现频率、重要性、关联度、搜索优化等因素,提取至少10个与视频主体密切相关的词用于youtube视频的标签,方便相关视频的关联以及网络搜索优化,(开头需包含:TuTu生活志,tutu,tutu生活志,tutulifestyle,)然后请以这样的间隔英文逗号的格式输出,避免出现开头的四个标签:户晨风,峰哥亡命天涯,三大理论"
```

### 5. localStorage数据结构
```javascript
// API配置（加密）
apiConfigs: {
  openai: { apiUrl, apiKey, model, availableModels },
  deepseek: { apiUrl, apiKey, model, availableModels },
  gemini: { apiUrl, apiKey, model, availableModels },
  custom: { apiUrl, apiKey, model, availableModels }
}

// 当前服务商
currentProvider: "openai"

// Prompt配置
prompts: { title, summary, tags }

// 默认Prompt（用户自定义的默认值）
defaultPrompts: { title, summary, tags }

// 主题颜色
themeColor: "#802520"

// API配置折叠状态
apiConfigCollapsed: "true"

// 历史记录
generationHistory: [
  { script, title, summary, tags, timestamp }
]
```

## 实现要点

1. **API调用**
   - OpenAI/DeepSeek: 使用 /v1/chat/completions 端点
   - Gemini: 使用特殊的 generateContent 端点格式
   - 三个请求使用 Promise.allSettled 并发执行

2. **加密功能**
   - 使用简单的XOR cipher + Base64
   - 密钥: 'tutu-video-tool-2025'

3. **模态框**
   - Prompt配置模态框
   - 默认Prompt配置模态框（带警告）
   - 历史记录模态框

4. **样式细节**
   - 卡片悬停效果：box-shadow加深
   - 按钮悬停：opacity: 0.85
   - 提交按钮特殊：带阴影，悬停时阴影加深并上移
   - 历史记录项悬停：红色边框，无位移动画
   - 主题色使用CSS变量 --theme-color

5. **用户体验**
   - API配置默认折叠
   - 复制功能自动复制到剪贴板
   - 所有操作有消息提示（3秒自动消失）
   - 模态框点击外部关闭
   - 历史记录恢复后不关闭窗口

请按照这些要求创建完整的项目文件。
```

### 方法2：手动创建文件

如果需要手动创建，请按以下步骤操作：

## 详细文件内容

由于文件内容较大，建议使用以下命令复制：

### 1. 创建 index.html
请参考项目中的 index.html 文件，包含：
- 完整的HTML结构
- 三个模态框（Prompt配置、默认Prompt配置、历史记录）
- 所有必要的表单元素和按钮

### 2. 创建 styles.css
请参考项目中的 styles.css 文件，关键样式点：
- 使用 CSS 变量定义主题色
- 所有按钮统一样式（padding: 8px 16px）
- 提交按钮特殊样式（放大10%，带阴影）
- 响应式设计
- 模态框样式和动画

### 3. 创建 script.js
请参考项目中的 script.js 文件，关键功能：
- 初始化和事件绑定
- API配置管理（加密/解密）
- Prompt管理
- AI请求处理（OpenAI/DeepSeek/Gemini）
- 历史记录功能
- 主题切换
- 复制功能

### 4. 创建 favicon.svg
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 159 110">
    <path fill="#FF0000" d="M154 17.5c-1.82-6.73-7.07-12-13.8-13.8-9.04-3.49-96.6-5.2-122 0.1-6.73 1.82-12 7.07-13.8 13.8-4.08 17.9-4.39 56.6 0.1 74.9 1.82 6.73 7.07 12 13.8 13.8 17.9 4.12 103 4.7 122 0 6.73-1.82 12-7.07 13.8-13.8 4.35-19.5 4.66-55.8-0.1-75z"/>
    <path fill="#FFF" d="M105 55 64 31.5v47z"/>
</svg>
```

## 部署方法

### 本地运行
1. 双击 index.html 文件即可在浏览器中打开
2. 或使用简单的HTTP服务器：
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js
   npx http-server
   ```

### 在线部署
可以部署到以下平台：
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

## 使用说明

1. **首次使用**
   - 点击"API配置"展开配置区
   - 选择AI服务商
   - 输入API密钥
   - 点击"测试连接"获取可用模型
   - 点击"保存"

2. **生成内容**
   - 在"稿件录入"区域输入视频脚本
   - 点击"提交"按钮
   - 等待AI生成结果
   - 点击各区域的"复制"按钮复制内容

3. **自定义Prompt**
   - 点击"Prompt配置"右侧的"配置"按钮
   - 修改Prompt内容
   - 点击"保存"

4. **修改默认Prompt**
   - 在Prompt配置窗口点击"修改默认"
   - 在新窗口中修改默认值
   - 注意：修改无法撤销

5. **查看历史**
   - 点击"稿件录入"右侧的"历史"按钮
   - 点击记录恢复内容
   - 选择记录后点击"存档"导出txt文件

## 注意事项

1. **API密钥安全**
   - 密钥存储在本地localStorage中
   - 使用简单加密，不适合生产环境
   - 建议不要在公共电脑使用

2. **数据备份**
   - 使用"导出配置"功能备份API配置
   - 历史记录存储在localStorage，清除浏览器数据会丢失

3. **浏览器兼容性**
   - 现代浏览器（Chrome、Firefox、Edge、Safari）
   - 需要支持ES6+、Fetch API、localStorage

## 常见问题

### Q: 如何迁移到新电脑？
A:
1. 导出API配置（.tutuapi文件）
2. 如果需要保留自定义的默认Prompt，需要手动记录
3. 在新电脑上导入配置文件

### Q: 如何更换主题颜色？
A: 点击右上角的🎨按钮，选择喜欢的颜色

### Q: 生成失败怎么办？
A:
1. 检查API密钥是否正确
2. 检查网络连接
3. 确认API服务商是否可用
4. 查看浏览器控制台的错误信息

## 更新日志

### 版本特性
- ✅ 多AI服务商支持
- ✅ 历史记录功能
- ✅ Prompt自定义
- ✅ 主题切换
- ✅ 配置导入导出
- ✅ 模型自动获取
- ✅ 并发请求优化
- ✅ 响应式设计

## 技术支持

如需帮助，请联系：
- 创意来源：[@TuTu生活志](https://www.youtube.com/channel/UCuhAUKCdKrjYoMiJQc74ZkQ/)

## 许可证

本项目仅供学习和个人使用。

---

**祝使用愉快！** 🎬✨
