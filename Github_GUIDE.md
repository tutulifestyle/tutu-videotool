# 📘 GitHub部署完整指南

本指南将详细说明如何将TuTu视频发布工具上传到GitHub并部署为可访问的网页。

## 🔒 隐私保护说明

**重要：** 本项目采用100%本地存储方案，所有用户的API密钥都存储在各自的浏览器中，不会上传到GitHub或任何服务器。
详细了解隐私保护机制，请查看 [PRIVACY.md](PRIVACY.md)

---

## 📋 部署前准备

### ⚠️ 清理本地数据（重要！）

在上传项目之前，**必须清理浏览器中保存的敏感数据**，防止隐私泄露。

#### 方法1：使用浏览器开发者工具清理

1. **打开项目页面**（双击 `index.html` 打开）
2. **打开浏览器开发者工具**
   - Chrome/Edge: 按 `F12` 或 `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - Firefox: 按 `F12` 或 `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - Safari: `Cmd+Option+C`

3. **切换到 Console（控制台）标签**

4. **复制粘贴以下命令并按回车：**
   ```javascript
   localStorage.clear();
   console.log('✅ 所有本地数据已清除！');
   ```

5. **刷新页面**，确认所有配置都已清空

6. **关闭浏览器**

#### 方法2：使用项目自带的"一键还原"功能

1. 打开项目页面
2. 展开"API配置"区域
3. 点击"一键还原"按钮
4. 确认清除所有设置
5. 同时在浏览器控制台运行 `localStorage.clear()`（确保历史记录也被清除）

#### 方法3：手动清除浏览器数据

**Chrome/Edge:**
1. 打开设置 → 隐私和安全 → 清除浏览数据
2. 选择"高级"标签
3. 时间范围选择"不限时间"
4. 只勾选"Cookie和其他网站数据"
5. 点击"清除数据"

**Firefox:**
1. 打开设置 → 隐私与安全
2. 找到"Cookie和网站数据"
3. 点击"清除数据"
4. 只勾选"Cookie和网站数据"
5. 点击"清除"

**Safari:**
1. 偏好设置 → 隐私
2. 点击"管理网站数据"
3. 搜索"localhost"或"file://"
4. 删除相关数据

---

## 📂 准备上传的文件

确保你的项目文件夹包含以下文件：

### 必需文件（4个）✅
```
tutu-videotool/
├── index.html
├── styles.css
├── script.js
└── favicon.svg
```

### 推荐包含的文档文件📚
```
├── README.md
├── QUICK_START.md
├── PROJECT_GUIDE.md
├── CHECKLIST.md
├── CLAUDE_CODE_PROMPT.txt
├── FILE_LIST.md
└── Github_GUIDE.md (本文件)
```

**注意：** 不要上传以下文件：
- `.tutuapi` 配置文件（包含加密的API密钥）
- 任何txt导出文件（可能包含个人内容）
- `.DS_Store` (Mac系统文件)
- 任何临时文件或备份文件

---

## 🚀 方法1：使用GitHub网页界面（推荐新手）

### 步骤1：注册/登录GitHub账号

1. **访问GitHub官网**
   - 打开浏览器，访问 https://github.com

2. **如果已有账号**
   - 点击右上角"Sign in"登录
   - 输入用户名/邮箱和密码

3. **如果没有账号**
   - 点击"Sign up"注册
   - 填写邮箱地址（建议使用常用邮箱）
   - 创建密码（至少15字符，或8字符+数字+小写字母）
   - 填写用户名（这将成为你的GitHub地址的一部分）
   - 完成邮箱验证
   - 选择免费计划（Free plan）

### 步骤2：创建新仓库

1. **点击创建仓库按钮**
   - 登录后，点击页面右上角的 `+` 号
   - 选择"New repository"（新建仓库）

2. **填写仓库信息**
   - **Repository name（仓库名称）**: `tutu-videotool`
     - 注意：这个名字会出现在URL中
     - 只能包含字母、数字、连字符(-)和下划线(_)
     - 不能包含空格或特殊字符

   - **Description（描述）**: `YouTube视频发布辅助工具 - AI自动生成标题、摘要和标签`
     - 可选但推荐填写，便于他人了解项目

   - **Public/Private（公开/私有）**:
     - 选择 **Public**（公开）- 任何人都可以看到，且可以使用GitHub Pages
     - 或选择 **Private**（私有）- 只有你能看到（注意：私有仓库使用GitHub Pages需要付费）

   - **Initialize repository（初始化仓库）**:
     - ❌ **不要勾选** "Add a README file"（我们已经有了）
     - ❌ **不要选择** ".gitignore"模板
     - ❌ **不要选择** "Choose a license"

3. **点击绿色按钮 "Create repository"**

### 步骤3：上传文件

创建完仓库后，你会看到一个空仓库页面。

1. **找到"uploading an existing file"链接**
   - 在页面中间会看到"Quick setup"提示
   - 点击蓝色链接"uploading an existing file"

2. **上传文件**
   - 方法A：直接拖拽
     - 打开你的项目文件夹
     - 选中所有文件（不要选择文件夹本身）
     - 拖拽到GitHub页面的上传区域

   - 方法B：点击上传
     - 点击"choose your files"
     - 在弹出的文件选择窗口中，选中所有项目文件
     - 点击"打开"

3. **填写提交信息**
   - 在"Commit changes"区域
   - 第一行输入: `Initial commit - 首次提交`
   - 第二行（可选）输入更详细的说明
   - 保持"Commit directly to the main branch"选中

4. **点击绿色按钮 "Commit changes"**

5. **等待上传完成**
   - 上传完成后，你会看到所有文件显示在仓库中

### 步骤4：启用GitHub Pages

1. **进入仓库设置**
   - 在仓库页面顶部，点击"Settings"（设置）标签

2. **找到Pages设置**
   - 在左侧菜单中，向下滚动找到"Pages"
   - 点击"Pages"

3. **配置GitHub Pages**
   - 在"Source"（源）部分
   - 点击下拉菜单"None"
   - 选择"main"分支
   - 保持文件夹为"/ (root)"
   - 点击"Save"按钮

4. **等待部署完成**
   - GitHub会自动开始部署
   - 通常需要1-3分钟
   - 页面顶部会显示：
     ```
     Your site is live at https://[你的用户名].github.io/tutu-videotool/
     ```

5. **访问你的网站**
   - 点击显示的URL，或复制到浏览器访问
   - 如果显示404错误，等待几分钟后再试

### 步骤5：验证部署

1. **打开部署的网站**
2. **检查基本功能**
   - ✅ 页面能正常显示
   - ✅ YouTube logo显示正常
   - ✅ 主题切换按钮工作正常
   - ✅ 各个卡片显示正常
   - ✅ 模态框能正常打开/关闭

3. **配置API并测试**
   - 展开"API配置"
   - 输入你的API密钥
   - 测试连接
   - 提交一个测试稿件
   - 验证生成功能正常

---

## 💻 方法2：使用Git命令行（推荐有经验的用户）

### 前提条件

1. **安装Git**
   - Windows: 下载 https://git-scm.com/download/win
   - Mac: 打开终端，运行 `git --version`（如果没有会提示安装）
   - Linux: `sudo apt-get install git` 或 `sudo yum install git`

2. **配置Git**
   ```bash
   git config --global user.name "你的名字"
   git config --global user.email "你的邮箱@example.com"
   ```

### 步骤详解

1. **在GitHub创建空仓库**
   - 登录GitHub
   - 点击右上角 `+` → "New repository"
   - 仓库名: `tutu-videotool`
   - 选择Public
   - ❌ 不要勾选任何初始化选项
   - 点击"Create repository"

2. **在本地初始化Git仓库**
   ```bash
   # 打开终端/命令提示符
   # 进入项目文件夹
   cd /path/to/tutu-videotool

   # 初始化Git仓库
   git init

   # 添加所有文件到暂存区
   git add .

   # 创建第一次提交
   git commit -m "Initial commit - 首次提交"
   ```

3. **连接到GitHub远程仓库**
   ```bash
   # 替换 [你的用户名] 为你的GitHub用户名
   git remote add origin https://github.com/[你的用户名]/tutu-videotool.git

   # 验证远程仓库
   git remote -v
   ```

4. **推送到GitHub**
   ```bash
   # 推送main分支
   git branch -M main
   git push -u origin main
   ```

   **如果遇到认证问题**：
   - GitHub不再支持密码认证
   - 需要使用Personal Access Token（个人访问令牌）

   **创建Token：**
   1. 登录GitHub
   2. 点击右上角头像 → Settings
   3. 左侧菜单最底部 → Developer settings
   4. Personal access tokens → Tokens (classic)
   5. Generate new token → Generate new token (classic)
   6. 填写Note: `tutu-videotool`
   7. 勾选权限: `repo` (全部)
   8. 点击"Generate token"
   9. **立即复制token**（只显示一次）

   **使用Token推送：**
   - 当Git要求输入密码时，粘贴Token（不是你的GitHub密码）
   - 或者使用: `git push https://[token]@github.com/[用户名]/tutu-videotool.git`

5. **启用GitHub Pages**
   - 进入仓库页面
   - Settings → Pages
   - Source选择"main"分支
   - 点击Save
   - 等待1-3分钟

6. **访问网站**
   - URL格式: `https://[你的用户名].github.io/tutu-videotool/`

---

## 🔧 方法3：使用GitHub Desktop（最简单的图形化工具）

### 步骤1：安装GitHub Desktop

1. **下载GitHub Desktop**
   - Windows/Mac: https://desktop.github.com/
   - 下载并安装

2. **登录GitHub账号**
   - 打开GitHub Desktop
   - 点击"Sign in to GitHub.com"
   - 输入用户名和密码
   - 完成授权

### 步骤2：创建仓库并上传

1. **创建新仓库**
   - 点击左上角"File" → "New repository"
   - Name: `tutu-videotool`
   - Local path: 选择项目所在的**父文件夹**（不是项目文件夹本身）
   - 勾选"Initialize this repository with a README"
   - 点击"Create repository"

2. **复制文件**
   - 如果你已经有项目文件，将它们复制到GitHub Desktop创建的仓库文件夹中
   - 或者在已有项目文件夹中创建仓库（File → Add local repository）

3. **提交更改**
   - GitHub Desktop会自动检测所有更改
   - 在左下角"Summary"输入: `Initial commit`
   - 点击"Commit to main"

4. **发布到GitHub**
   - 点击顶部"Publish repository"
   - 确认名称为`tutu-videotool`
   - 取消勾选"Keep this code private"（如果想公开）
   - 点击"Publish repository"

5. **启用GitHub Pages**
   - 在GitHub Desktop中，点击"Repository" → "View on GitHub"
   - 在浏览器中会打开仓库页面
   - 按照前面的步骤启用GitHub Pages

---

## 🌐 访问和分享你的网站

### 网站URL格式

```
https://[你的GitHub用户名].github.io/tutu-videotool/
```

**示例：**
- 如果你的用户名是 `zhang3`
- 网站地址就是: `https://zhang3.github.io/tutu-videotool/`

### 分享给他人

1. **直接分享URL**
   - 复制上面的URL发送给朋友

2. **在仓库添加网站链接**
   - 打开GitHub仓库页面
   - 点击右侧"About"旁边的齿轮图标⚙️
   - 在"Website"中粘贴GitHub Pages URL
   - 勾选"Use your GitHub Pages website"
   - 点击"Save changes"

3. **添加到README**
   - 编辑README.md文件
   - 在顶部添加:
     ```markdown
     🌐 在线体验: https://[你的用户名].github.io/tutu-videotool/
     ```

---

## 🔄 更新已部署的网站

### 如果你修改了代码，想要更新线上版本：

#### 使用网页界面更新

1. 进入GitHub仓库页面
2. 点击要修改的文件（如`script.js`）
3. 点击文件右上角的铅笔图标✏️（Edit this file）
4. 修改内容
5. 滚动到底部，填写"Commit changes"
6. 点击"Commit changes"
7. 等待1-2分钟，刷新网站查看更新

#### 使用Git命令行更新

```bash
# 进入项目文件夹
cd /path/to/tutu-videotool

# 修改文件后...

# 查看更改
git status

# 添加所有更改
git add .

# 提交更改
git commit -m "更新说明"

# 推送到GitHub
git push origin main

# 等待1-2分钟，GitHub Pages会自动更新
```

#### 使用GitHub Desktop更新

1. 修改本地文件
2. GitHub Desktop会自动显示更改
3. 填写提交说明
4. 点击"Commit to main"
5. 点击顶部"Push origin"
6. 等待1-2分钟查看更新

---

## ⚠️ 常见问题与解决方案

### Q1: 网站显示404错误

**可能原因和解决方法：**

1. **刚启用GitHub Pages**
   - 等待3-5分钟再访问
   - 检查Settings → Pages是否显示绿色的"Your site is published"

2. **URL拼写错误**
   - 确认URL格式: `https://[用户名].github.io/[仓库名]/`
   - 用户名和仓库名都是小写
   - 不要忘记最后的斜杠 `/`

3. **仓库是私有的**
   - 私有仓库使用GitHub Pages需要付费
   - 改为Public: Settings → 滚动到底部 → "Change visibility" → "Make public"

4. **index.html文件名错误**
   - 确保文件名是 `index.html`（全小写）
   - 不是 `Index.html` 或 `INDEX.html`

### Q2: 页面样式显示不正常

**解决方法：**

1. **检查文件引用路径**
   - 打开`index.html`，确认：
     ```html
     <link rel="stylesheet" href="styles.css">
     <script src="script.js"></script>
     <link rel="icon" type="image/svg+xml" href="favicon.svg">
     ```
   - 路径必须是相对路径，不能是绝对路径

2. **清除浏览器缓存**
   - 按 `Ctrl+F5` (Windows) 或 `Cmd+Shift+R` (Mac) 强制刷新
   - 或在浏览器中清除缓存

3. **检查所有文件是否上传**
   - 在GitHub仓库页面确认4个核心文件都存在
   - 文件大小不为0

### Q3: API功能不工作

**解决方法：**

1. **检查浏览器控制台**
   - 按F12打开开发者工具
   - 查看Console标签是否有错误信息

2. **CORS跨域问题**
   - GitHub Pages支持HTTPS
   - 如果API服务商不支持CORS，可能无法调用
   - 解决方案：使用支持CORS的API服务商

3. **重新配置API**
   - 打开部署的网站
   - 展开API配置
   - 输入API密钥
   - 测试连接
   - 保存配置

### Q4: 本地运行正常，但部署后不工作

**检查清单：**

1. **检查浏览器控制台错误**
   - F12打开控制台
   - 查看是否有文件加载失败

2. **检查文件路径大小写**
   - Linux服务器区分大小写
   - 确保所有引用的文件名大小写完全匹配

3. **检查localStorage支持**
   - 某些浏览器的隐私模式可能禁用localStorage
   - 提示用户使用正常模式

### Q5: 想使用自定义域名

**步骤：**

1. **购买域名**
   - 从域名服务商购买（如Namecheap, GoDaddy, 阿里云等）

2. **配置DNS**
   - 在域名服务商的DNS管理中添加CNAME记录
   - 记录类型: `CNAME`
   - 主机记录: `www` 或 `@`
   - 记录值: `[你的用户名].github.io`

3. **在GitHub配置**
   - 仓库 Settings → Pages
   - 在"Custom domain"输入你的域名
   - 点击Save
   - 勾选"Enforce HTTPS"

4. **等待DNS生效**
   - 通常需要几分钟到24小时

### Q6: 推送时要求输入密码但密码不正确

**原因：** GitHub已停止支持密码认证

**解决方法：** 使用Personal Access Token
1. GitHub头像 → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. 勾选`repo`权限
5. 生成后复制token
6. 推送时用token代替密码

### Q7: 如何删除仓库

**步骤（谨慎操作）：**
1. 进入仓库页面
2. Settings → 滚动到最底部
3. "Danger Zone" → "Delete this repository"
4. 输入仓库全名确认
5. 点击"I understand the consequences, delete this repository"

---

## 📊 GitHub Pages的限制

### 使用限制

- ✅ **免费使用**（Public仓库）
- ✅ **每个账号一个用户网站** + **无限项目网站**
- ✅ **每个仓库1GB存储空间**
- ✅ **每月100GB流量**（足够个人使用）
- ⚠️ **不支持服务器端代码**（PHP, Python, Node.js等）
- ⚠️ **只能部署静态网站**（HTML, CSS, JavaScript）

### 适用场景

本项目非常适合GitHub Pages，因为：
- ✅ 纯前端项目（HTML + CSS + JavaScript）
- ✅ 无需后端服务器
- ✅ 数据存储在浏览器localStorage
- ✅ 直接调用第三方API

---

## 🎯 部署检查清单

### 上传前

- [ ] 已清除浏览器localStorage中的所有数据
- [ ] 项目文件夹中没有`.tutuapi`配置文件
- [ ] 项目文件夹中没有历史记录txt文件
- [ ] 已确认4个核心文件完整（index.html, styles.css, script.js, favicon.svg）
- [ ] 已准备好文档文件（README.md等）

### 上传后

- [ ] 所有文件已成功上传到GitHub
- [ ] 仓库设置为Public（如果想使用免费GitHub Pages）
- [ ] 已启用GitHub Pages（Settings → Pages → Source设为main）
- [ ] 等待3-5分钟让部署完成

### 验证

- [ ] 网站能正常访问（无404错误）
- [ ] 页面样式显示正常
- [ ] YouTube logo显示正常
- [ ] 主题切换功能正常
- [ ] 所有卡片和按钮显示正常
- [ ] 模态框能正常打开关闭
- [ ] API配置功能正常
- [ ] 能成功生成内容
- [ ] 历史记录功能正常
- [ ] 导出功能正常

---

## 🔗 相关资源

### GitHub相关
- GitHub官网: https://github.com
- GitHub Pages文档: https://pages.github.com/
- GitHub Desktop: https://desktop.github.com/

### Git学习资源
- Git官方文档: https://git-scm.com/doc
- Git简明指南: https://rogerdudler.github.io/git-guide/index.zh.html

### API服务商
- OpenAI API: https://platform.openai.com/
- DeepSeek API: https://platform.deepseek.com/
- Gemini API: https://ai.google.dev/

---

## 💡 最佳实践建议

### 安全性

1. **永远不要在代码中硬编码API密钥**
   - ✅ 本项目已正确使用localStorage存储
   - ✅ 使用加密存储（XOR + Base64）

2. **定期导出配置备份**
   - 使用"导出配置"功能
   - 保存`.tutuapi`文件到安全位置
   - 不要上传到GitHub

3. **定期更新API密钥**
   - 建议每3-6个月更新一次
   - 如果怀疑泄露，立即重新生成

### 维护

1. **版本管理**
   - 每次重大更新都创建一个commit
   - 使用有意义的commit信息
   - 示例: `feat: 添加导出历史记录功能` 或 `fix: 修复主题切换bug`

2. **文档更新**
   - 添加新功能时更新README.md
   - 记录重要的改动

3. **测试**
   - 本地测试通过后再推送
   - 部署后完整测试所有功能

### 分享

1. **添加清晰的README**
   - 说明项目用途
   - 提供使用说明
   - 标注注意事项

2. **提供在线演示**
   - GitHub Pages URL
   - 配置说明
   - 使用示例

---

## 🎉 完成！

恭喜你成功将TuTu视频发布工具部署到GitHub Pages！

现在你可以：
- ✅ 通过URL访问你的工具
- ✅ 分享给朋友使用
- ✅ 在任何设备上访问
- ✅ 随时更新和维护

**网站地址：**
```
https://[你的GitHub用户名].github.io/tutu-videotool/
```

**下一步建议：**
1. 配置你的API密钥
2. 测试所有功能
3. 导出配置文件备份
4. 分享给需要的朋友

---

**祝使用愉快！** 🎬✨

如有问题，请查看"常见问题与解决方案"部分，或在GitHub仓库创建Issue。
