# 📋 GitHub上传前检查清单

在将项目上传到GitHub之前，请逐项检查以下内容，确保没有敏感信息泄露。

---

## ⚠️ 清理浏览器数据（必做！）

### 方法1：浏览器控制台清理（推荐）

1. **打开项目页面**
   - 双击 `index.html` 在浏览器中打开

2. **打开开发者工具**
   - Windows: 按 `F12` 或 `Ctrl+Shift+I`
   - Mac: 按 `Cmd+Option+I`

3. **切换到 Console（控制台）标签**

4. **运行清理命令**
   ```javascript
   // 复制以下命令，粘贴到控制台，按回车执行
   localStorage.clear();
   console.log('✅ localStorage已清空');
   console.log('请检查以下项目是否为null:');
   console.log('apiConfigs:', localStorage.getItem('apiConfigs'));
   console.log('currentProvider:', localStorage.getItem('currentProvider'));
   console.log('prompts:', localStorage.getItem('prompts'));
   console.log('defaultPrompts:', localStorage.getItem('defaultPrompts'));
   console.log('themeColor:', localStorage.getItem('themeColor'));
   console.log('apiConfigCollapsed:', localStorage.getItem('apiConfigCollapsed'));
   console.log('generationHistory:', localStorage.getItem('generationHistory'));
   ```

5. **验证清理结果**
   - 所有输出应该显示 `null`
   - 如果不是，再次运行 `localStorage.clear()`

6. **关闭浏览器**

### 方法2：使用项目自带功能

1. 打开 `index.html`
2. 展开"API配置"
3. 点击"一键还原"按钮
4. 确认操作
5. 再打开控制台运行 `localStorage.clear()` 确保彻底清除

---

## 📂 文件检查

### ✅ 必须包含的文件（核心文件）

- [ ] `index.html` - 主页面文件
- [ ] `styles.css` - 样式文件
- [ ] `script.js` - JavaScript逻辑文件
- [ ] `favicon.svg` - 网站图标

### ✅ 推荐包含的文件（文档）

- [ ] `README.md` - 项目说明
- [ ] `QUICK_START.md` - 快速开始指南
- [ ] `PROJECT_GUIDE.md` - 详细项目指南
- [ ] `CHECKLIST.md` - 功能验证清单
- [ ] `CLAUDE_CODE_PROMPT.txt` - Claude Code重建提示词
- [ ] `FILE_LIST.md` - 文件清单
- [ ] `Github_GUIDE.md` - GitHub部署指南
- [ ] `.gitignore` - Git忽略文件配置
- [ ] `PRE_UPLOAD_CHECKLIST.md` - 本文件

### ❌ 不应包含的文件

- [ ] 检查是否有 `.tutuapi` 文件（API配置导出文件）
  ```bash
  # 在项目文件夹中搜索
  find . -name "*.tutuapi"
  ```
  如果找到，**必须删除**！

- [ ] 检查是否有纯数字的 `.txt` 文件（历史记录导出）
  ```bash
  # 搜索数字命名的txt文件
  find . -name "[0-9]*.txt"
  ```
  如果找到（如 `202510150341.txt`），**必须删除**！

- [ ] 检查是否有系统临时文件
  - Mac: `.DS_Store`
  - Windows: `Thumbs.db`, `Desktop.ini`
  - 编辑器: `.vscode/`, `.idea/`

---

## 🔍 代码检查

### 检查 script.js 中是否有硬编码的敏感信息

打开 `script.js` 文件，搜索以下内容：

#### 1. API密钥
```bash
# 搜索关键词
grep -i "api.*key.*=" script.js | grep -v "apiKey:"
grep -i "sk-" script.js
```

**应该没有任何输出**！

✅ 正确的方式（从localStorage读取）：
```javascript
apiKey: providerConfig.apiKey  // ✅ 从配置读取
```

❌ 错误的方式（硬编码）：
```javascript
apiKey: "sk-xxxxxxxxxxxxxxxx"  // ❌ 绝对不能这样
```

#### 2. 测试数据
```bash
# 搜索测试用的API密钥
grep -i "test.*key\|demo.*key" script.js
```

**应该没有任何输出**！

#### 3. 个人信息
```bash
# 搜索邮箱、电话等
grep -E "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" script.js
```

**应该没有任何输出**（除非是示例说明）！

---

## 🧪 功能测试

### 在上传前，确保项目功能正常

1. **打开 index.html**
   - [ ] 页面能正常显示
   - [ ] YouTube logo显示正常
   - [ ] 布局没有错乱

2. **主题切换**
   - [ ] 点击右上角🎨按钮
   - [ ] 能看到4个颜色选项
   - [ ] 切换颜色后主题变化正常

3. **API配置**
   - [ ] 能展开/折叠API配置区域
   - [ ] 能切换不同的AI服务商
   - [ ] 表单显示正常

4. **Prompt配置**
   - [ ] 点击"配置"按钮能打开模态框
   - [ ] 显示三个文本框
   - [ ] "修改默认"按钮能打开新模态框
   - [ ] 红色警告文字显示正常

5. **历史记录**
   - [ ] 点击"历史"按钮能打开模态框
   - [ ] 显示"暂无历史记录"（因为已清空localStorage）

6. **复制按钮**
   - [ ] 所有"复制"按钮大小一致
   - [ ] 按钮样式正常

---

## 📊 文件大小检查

确保文件大小合理（太大可能包含了不必要的内容）：

```bash
ls -lh *.html *.css *.js *.svg
```

**预期大小：**
- `index.html`: ~10KB
- `styles.css`: ~12KB
- `script.js`: ~34KB
- `favicon.svg`: ~380B

**如果明显偏大，检查是否误加入了其他内容！**

---

## 🔐 安全检查

### 最后的安全确认

1. **确认localStorage已清空**
   ```javascript
   // 在浏览器控制台运行
   Object.keys(localStorage).forEach(key => console.log(key, localStorage.getItem(key)));
   ```
   **应该没有任何输出**！

2. **确认没有配置文件**
   ```bash
   ls *.tutuapi 2>/dev/null
   ```
   **应该显示"No such file or directory"**！

3. **确认没有导出文件**
   ```bash
   ls [0-9]*.txt 2>/dev/null
   ```
   **应该显示"No such file or directory"**！

4. **代码中没有硬编码的URL或密钥**
   - [ ] 已检查 `script.js`
   - [ ] 已检查 `index.html`
   - [ ] 没有发现硬编码的敏感信息

---

## 📝 文档完整性检查

### README.md

- [ ] 包含项目简介
- [ ] 包含功能特性
- [ ] 包含使用说明
- [ ] **没有包含** 你的个人API密钥
- [ ] **没有包含** 你的个人配置示例

### Github_GUIDE.md

- [ ] 包含完整的部署步骤
- [ ] 包含问题解决方案
- [ ] 内容准确无误

---

## ✅ 最终确认

在执行以下命令前，确认所有上述检查都已完成：

```bash
# 1. 查看所有将要上传的文件
ls -la

# 2. 确认.gitignore文件存在
cat .gitignore

# 3. 最后一次检查localStorage（在浏览器控制台）
localStorage.clear();
console.log('Storage cleared. Keys:', Object.keys(localStorage));
```

---

## 🚀 准备上传

### 所有检查都通过后，你可以：

1. **使用GitHub网页界面**
   - 按照 `Github_GUIDE.md` 的"方法1"步骤操作

2. **使用Git命令行**
   - 按照 `Github_GUIDE.md` 的"方法2"步骤操作

3. **使用GitHub Desktop**
   - 按照 `Github_GUIDE.md` 的"方法3"步骤操作

---

## ⚠️ 紧急情况：如果不小心上传了敏感信息

### 如果发现上传了API密钥或配置文件：

1. **立即删除仓库**
   - GitHub → 仓库 → Settings
   - 滚动到最底部 → "Delete this repository"

2. **重新生成API密钥**
   - 到对应的AI服务商平台
   - 删除旧密钥
   - 生成新密钥

3. **重新检查并上传**
   - 回到本清单的开头
   - 重新执行所有检查步骤
   - 再次上传

### 如果只是commit了但还没push：

```bash
# 撤销最后一次commit
git reset --soft HEAD~1

# 删除敏感文件
rm sensitive-file

# 重新commit
git add .
git commit -m "Initial commit - 清理后重新提交"
```

### 如果已经push但刚发现：

```bash
# 强制删除远程分支的历史
git filter-branch --force --index-filter \
"git rm --cached --ignore-unmatch 敏感文件名" \
--prune-empty --tag-name-filter cat -- --all

# 强制推送
git push origin --force --all
```

**注意：** 上述操作会改写Git历史，谨慎使用！

---

## 📞 需要帮助？

如果遇到问题：

1. **检查 `Github_GUIDE.md` 的"常见问题"部分**
2. **重新阅读本检查清单**
3. **在GitHub仓库创建Issue**
4. **参考项目文档**

---

## ✨ 检查完成

- [ ] 我已完成所有检查项
- [ ] 我确认没有敏感信息
- [ ] 我已测试基本功能正常
- [ ] 我准备好上传到GitHub了

**祝上传顺利！** 🎉

---

**提示：** 上传后，可以删除本文件（`PRE_UPLOAD_CHECKLIST.md`），或保留供他人参考。
