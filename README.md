# TuTu视频发布工具

一个基于Web的YouTube视频发布辅助工具，使用AI自动生成视频标题、摘要和标签。用Claude Code写的，本人完全不懂代码，只是告诉了Claude Code个人需求，可能功能上尚有不够完善之处，如需要修改或升级，请自行完成。😂

## 🔒 隐私保护

✅ **100%本地存储** - 你的API密钥只存储在你自己的浏览器中
✅ **零数据上传** - 不会发送到GitHub或任何第三方服务器
✅ **完全透明** - 纯前端项目，源代码完全公开可审查
✅ **加密存储** - 使用XOR+Base64加密保护你的配置

👉 详细了解：查看 [PRIVACY.md](PRIVACY.md) 了解完整的隐私保护机制

## 快速开始

### 在新电脑上复刻此项目

#### 方法1：使用Claude Code（推荐）

1. 创建新文件夹并打开Claude Code
2. 复制 `PROJECT_GUIDE.md` 中的提示词到Claude Code
3. Claude Code会自动创建所有文件

#### 方法2：直接复制文件

1. 复制以下文件到新位置：
   - `index.html`
   - `styles.css`
   - `script.js`
   - `favicon.svg`

2. 双击 `index.html` 即可运行

## 功能特性

- 🤖 支持多种AI服务商（OpenAI、DeepSeek、Gemini、自定义）
- 📝 自动生成标题、摘要、标签
- 📚 历史记录保存（最近10条）
- 💾 配置导入/导出
- 🎨 多主题切换（4种配色）
- ⚙️ 自定义Prompt
- 📤 导出txt文件

## 项目结构

```
tutu-videotool/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 核心逻辑
├── favicon.svg         # 图标
├── README.md           # 本文件
└── PROJECT_GUIDE.md    # 详细复刻指南
```

## 技术栈

- 纯HTML + CSS + JavaScript
- 无需后端服务器
- localStorage数据存储
- Fetch API调用
- Promise.allSettled并发请求

## 使用说明

1. **配置API**
   - 展开"API配置"区域
   - 选择AI服务商并输入密钥
   - 测试连接后保存

2. **生成内容**
   - 输入视频脚本
   - 点击"提交"
   - 等待生成结果
   - 复制所需内容

3. **查看历史**
   - 点击"历史"按钮
   - 选择记录查看或导出

详细说明请查看 `PROJECT_GUIDE.md`

## 部署

### 本地运行
直接打开 `index.html` 文件

### HTTP服务器
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server
```

### 在线部署
可部署到：GitHub Pages、Netlify、Vercel、Cloudflare Pages

## 注意事项

⚠️ API密钥存储在本地浏览器中，请注意安全
⚠️ 清除浏览器数据会丢失所有配置
⚠️ 建议定期导出配置文件备份

## 创意来源

[@TuTu生活志](https://www.youtube.com/channel/UCuhAUKCdKrjYoMiJQc74ZkQ/)

## License

仅供学习和个人使用
