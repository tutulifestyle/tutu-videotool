# 🔒 隐私保护说明

## 📊 数据存储方式

本工具采用 **100% 客户端存储** 方案，保证用户数据隐私安全。

---

## ✅ 你的数据存储在哪里？

### localStorage（本地浏览器存储）

所有敏感数据都存储在 **你自己的浏览器** 中：

| 数据类型 | 存储位置 | 谁能访问 |
|---------|---------|---------|
| API密钥 | 你的浏览器localStorage | **只有你** |
| API配置 | 你的浏览器localStorage | **只有你** |
| Prompt配置 | 你的浏览器localStorage | **只有你** |
| 历史记录 | 你的浏览器localStorage | **只有你** |
| 主题设置 | 你的浏览器localStorage | **只有你** |

### 数据加密

- ✅ API密钥使用 **XOR + Base64** 加密后存储
- ✅ 加密密钥：`tutu-video-tool-2025`
- ✅ 即使他人访问localStorage，也无法直接看到明文密钥

**示例：**
```javascript
// 原始API密钥（不会以这种形式存储）
"sk-1234567890abcdef"

// 加密后存储在localStorage中
"SmdYXkRgQ1xYSE5TVlBY..." （Base64编码后的密文）
```

---

## 🚫 数据不会发送到哪里？

### ❌ 不会发送到GitHub
- GitHub Pages只托管静态HTML/CSS/JS文件
- 你的API密钥 **永远不会** 上传到GitHub
- 项目开发者（我）**看不到** 你的任何配置

### ❌ 不会发送到项目服务器
- 本项目 **没有后端服务器**
- 没有数据库
- 不收集任何用户信息
- 不发送任何统计数据

### ❌ 不会被其他用户看到
- 每个用户的数据完全隔离
- localStorage是浏览器级别的隔离
- 即使在同一台电脑，不同浏览器的数据也是独立的

---

## ✅ 数据会发送到哪里？

### 只发送到你配置的AI服务商

当你点击"提交"生成内容时：

```
你的浏览器
    ↓
    ↓ 直接发送（HTTPS加密）
    ↓
AI服务商的API
(OpenAI / DeepSeek / Gemini)
    ↓
    ↓ 返回生成结果
    ↓
你的浏览器
```

**特点：**
- ✅ 使用 HTTPS 加密传输
- ✅ 直接从你的浏览器到AI服务商
- ✅ **不经过** GitHub或任何中间服务器
- ✅ 符合AI服务商的隐私政策

---

## 🔍 验证隐私保护

### 方法1：检查网络请求

1. **打开开发者工具**
   - 按 `F12` 或 `Ctrl+Shift+I` (Windows)
   - 按 `Cmd+Option+I` (Mac)

2. **切换到 Network（网络）标签**

3. **点击"提交"生成内容**

4. **查看网络请求**
   - 你会看到请求只发送到：
     - `api.openai.com`（如果使用OpenAI）
     - `api.deepseek.com`（如果使用DeepSeek）
     - `generativelanguage.googleapis.com`（如果使用Gemini）
   - **不会有** 任何发送到 `github.com` 或其他服务器的请求

### 方法2：检查localStorage内容

在开发者工具的 **Console（控制台）** 中运行：

```javascript
// 查看所有存储的数据
Object.keys(localStorage).forEach(key => {
    console.log(key + ':', localStorage.getItem(key));
});
```

**你会看到：**
```
apiConfigs: U21kWXhR... (加密后的配置)
currentProvider: openai
prompts: {"title":"...","summary":"...","tags":"..."}
themeColor: #802520
generationHistory: [...]
```

**注意：**
- `apiConfigs` 是加密的，无法直接看到API密钥
- 这些数据 **只存在于你的浏览器中**

### 方法3：检查源代码

1. **查看项目源代码**
   - 访问 GitHub 仓库
   - 查看 `script.js` 文件

2. **搜索关键代码**
   ```javascript
   // 所有配置都从localStorage读取
   localStorage.getItem('apiConfigs')

   // API请求直接发送到AI服务商
   fetch(apiUrl, { /* ... */ })

   // 没有任何代码发送数据到其他服务器
   ```

---

## 🔐 安全最佳实践

### 对于用户

1. **使用HTTPS访问**
   - ✅ GitHub Pages默认使用HTTPS
   - ✅ 确保地址栏显示 🔒 图标

2. **定期导出配置备份**
   - 使用"导出配置"功能
   - 保存 `.tutuapi` 文件到安全位置
   - 不要分享给他人

3. **不在公共电脑使用**
   - 公共电脑可能被他人访问
   - 使用后记得清除浏览器数据

4. **定期更换API密钥**
   - 建议每3-6个月更换一次
   - 到AI服务商平台重新生成

5. **使用浏览器的隐私模式（可选）**
   - 注意：隐私模式关闭后数据会清除
   - 不适合长期使用

### 对于项目部署者

1. **上传前清除本地数据**
   - 运行 `localStorage.clear()`
   - 删除所有 `.tutuapi` 文件
   - 参考 `PRE_UPLOAD_CHECKLIST.md`

2. **不要硬编码API密钥**
   - ✅ 本项目已正确实现
   - 所有密钥都由用户输入和存储

3. **使用 .gitignore**
   - ✅ 已包含 `.gitignore` 文件
   - 自动排除敏感文件

---

## 📱 跨设备使用

### localStorage的特性

**独立性：**
- 不同电脑：数据独立
- 不同浏览器：数据独立
- 不同用户账户：数据独立
- 同一浏览器的隐私模式：数据独立

**示例：**
```
电脑A的Chrome → 配置A（独立）
电脑A的Firefox → 配置B（独立）
电脑B的Chrome → 配置C（独立）
```

### 如何在多设备同步配置

**方法1：导出/导入配置文件**
1. 在电脑A导出配置（.tutuapi文件）
2. 通过U盘、云盘、邮件等方式传输到电脑B
3. 在电脑B导入配置

**方法2：手动记录**
1. 在电脑A记录API密钥和配置
2. 在电脑B手动输入

**注意：** 不建议将 `.tutuapi` 文件存储在公共云盘中

---

## 🆚 与其他方案的对比

### 传统方案（有后端服务器）

```
❌ 用户 → 你的服务器 → AI服务商
```

**缺点：**
- ❌ 你的API密钥暴露给服务器
- ❌ 服务器可能被攻击
- ❌ 需要信任服务器运营者
- ❌ 可能有数据泄露风险

### 本项目方案（纯前端）

```
✅ 用户浏览器 → AI服务商
```

**优点：**
- ✅ 数据只存在本地
- ✅ 不依赖任何第三方服务器
- ✅ 完全透明，可审查源代码
- ✅ 零隐私泄露风险

---

## 🔍 技术细节

### localStorage 存储机制

**浏览器沙箱隔离：**
```javascript
// 每个域名有独立的localStorage空间
// 域名A: https://user1.github.io/tutu-videotool/
localStorage.setItem('apiKey', 'key-A');  // 只属于user1

// 域名B: https://user2.github.io/tutu-videotool/
localStorage.setItem('apiKey', 'key-B');  // 只属于user2

// 两者完全隔离，互不影响
```

**同源策略保护：**
- 协议（https://）
- 域名（github.io）
- 端口（443）

三者完全相同才能访问localStorage，确保数据隔离。

### 加密实现

```javascript
// 简化示例（实际代码在script.js中）

// 加密
function encrypt(text) {
    const key = 'tutu-video-tool-2025';
    // XOR加密
    let encrypted = '';
    for (let i = 0; i < text.length; i++) {
        encrypted += String.fromCharCode(
            text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }
    // Base64编码
    return btoa(encrypted);
}

// 解密
function decrypt(encrypted) {
    const key = 'tutu-video-tool-2025';
    // Base64解码
    const decoded = atob(encrypted);
    // XOR解密
    let text = '';
    for (let i = 0; i < decoded.length; i++) {
        text += String.fromCharCode(
            decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }
    return text;
}
```

**安全性说明：**
- ✅ 防止localStorage被直接读取明文
- ✅ 增加一层保护
- ⚠️ 不是军事级加密，但足够日常使用
- ⚠️ 有浏览器访问权限的人仍可能解密

---

## ⚠️ 风险提示

### 可能的风险场景

1. **恶意浏览器扩展**
   - 某些扩展可能读取localStorage
   - **解决方案：** 只安装可信的扩展

2. **共享电脑**
   - 其他用户可能访问你的浏览器
   - **解决方案：** 使用后清除数据

3. **电脑被黑客攻击**
   - 如果电脑中毒，localStorage可能被读取
   - **解决方案：** 保持系统安全，使用杀毒软件

4. **物理访问**
   - 他人物理访问你的电脑
   - **解决方案：** 锁定电脑，设置密码

### 不是风险的场景

- ✅ 访问GitHub仓库的人 → **看不到你的数据**
- ✅ 项目开发者 → **看不到你的数据**
- ✅ 其他用户 → **看不到你的数据**
- ✅ 网络监听 → **看不到你的密钥**（存储在本地）

---

## 📋 隐私检查清单

### 用户使用前

- [ ] 确认访问的是HTTPS网站（有🔒图标）
- [ ] 确认URL是正确的GitHub Pages地址
- [ ] 不在公共WiFi下输入敏感信息

### 用户使用中

- [ ] API密钥只输入到本项目，不分享给他人
- [ ] 定期导出配置备份
- [ ] 不截图包含API密钥的界面

### 用户使用后

- [ ] 如果是公共电脑，清除浏览器数据
- [ ] 定期检查API使用量（在AI服务商平台）
- [ ] 发现异常立即重新生成API密钥

---

## 🎓 学习资源

### 了解localStorage

- [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [浏览器存储对比](https://web.dev/storage-for-the-web/)

### 了解同源策略

- [MDN: Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)

### 了解HTTPS

- [HTTPS工作原理](https://howhttps.works/)

---

## 💡 总结

### 核心要点

1. **你的API密钥只存在你自己的浏览器中**
   - 不在GitHub上
   - 不在任何服务器上
   - 其他人看不到

2. **数据传输直接到AI服务商**
   - 不经过中间服务器
   - 使用HTTPS加密
   - 符合AI服务商隐私政策

3. **完全透明可审查**
   - 源代码完全公开
   - 可以检查网络请求
   - 可以验证存储位置

4. **隐私保护由设计保证**
   - 技术上不可能收集用户数据
   - 没有后端服务器
   - 没有数据库

### 推荐做法

- ✅ 使用本项目的GitHub Pages版本（HTTPS）
- ✅ 定期导出配置备份
- ✅ 不在不信任的环境使用
- ✅ 定期更换API密钥

---

## 📞 问题反馈

如果你对隐私保护有任何疑问：

1. 查看项目源代码（完全公开）
2. 使用浏览器开发者工具验证
3. 在GitHub仓库提出Issue

---

**你的隐私安全是本项目的首要考虑！** 🔒

最后更新：2025-10-15
