// 默认 Prompts（初始值）
const INITIAL_DEFAULT_PROMPTS = {
    title: "基于提供的视频脚本,想出10个既吸睛又有SEO优势的YouTube视频标题。标题应反映出鲜明的个人视频作者风格(字数建议25-35字),并在输出时直接排列,不要加序号或附加解释说明。重要：每个标题占一行，标题之间不要有空行，从上到下紧密排列。",
    summary: "基于提供的视频脚本,请进行极致的提炼(不丢失重要信息),用作youtube视频的简介,控制在250字以内。请注意:1.所有原文涉及到\"我\"、\"作者\"这样的第一人称代词,请改为\"TuTu\",并尽量用\"TuTu\"来替代\"她\"的用法。2.文本内容尽量精简、准确,同时注意适当加入些口语化内容,不显得生硬。3.开头必须以TuTu开始。5.同时检查所有英文内容的拼写错误。6.文本内容为一段，不分行。",
    tags: "基于提供的视频脚本,将文中的关键词以出现频率、重要性、关联度、搜索优化等因素,提取至少10个与视频主体密切相关的词用于youtube视频的标签,方便相关视频的关联以及网络搜索优化,(开头需包含:TuTu生活志,tutu,tutu生活志,tutulifestyle,)然后请以这样的间隔英文逗号的格式输出,避免出现开头的四个标签:户晨风,峰哥亡命天涯,三大理论"
};

// 获取当前的默认Prompts（可能被用户替换过）
function getDefaultPrompts() {
    const customDefault = localStorage.getItem('defaultPrompts');
    if (customDefault) {
        try {
            return JSON.parse(customDefault);
        } catch {
            return INITIAL_DEFAULT_PROMPTS;
        }
    }
    return INITIAL_DEFAULT_PROMPTS;
}

// AI 服务商配置
const AI_CONFIGS = {
    openai: {
        apiUrl: "https://api.openai.com/v1/chat/completions",
        models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"]
    },
    deepseek: {
        apiUrl: "https://api.deepseek.com/v1/chat/completions",
        models: ["deepseek-chat", "deepseek-reasoner"]
    },
    gemini: {
        apiUrl: "https://generativelanguage.googleapis.com/v1beta",
        models: ["gemini-2.0-flash-exp", "gemini-1.5-pro", "gemini-1.5-flash"]
    },
    custom: {
        apiUrl: "",
        models: []
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // 加载保存的配置
    loadApiConfig();
    loadPrompts();
    loadTheme();
    loadApiConfigState();

    // 绑定事件
    bindEvents();
}

function bindEvents() {
    // 提交按钮
    document.getElementById('submitBtn').addEventListener('click', handleSubmit);

    // API 配置
    document.getElementById('aiProvider').addEventListener('change', handleProviderChange);
    document.getElementById('saveApiBtn').addEventListener('click', saveApiConfig);
    document.getElementById('testApiBtn').addEventListener('click', testApiConnection);
    document.getElementById('exportConfigBtn').addEventListener('click', exportConfig);
    document.getElementById('importConfigBtn').addEventListener('click', () => {
        document.getElementById('configFileInput').click();
    });
    document.getElementById('configFileInput').addEventListener('change', importConfig);
    document.getElementById('resetAllBtn').addEventListener('click', resetAllSettings);

    // Prompt 配置
    document.getElementById('configPromptBtn').addEventListener('click', openPromptModal);
    document.getElementById('savePromptsBtn').addEventListener('click', savePrompts);
    document.getElementById('resetPromptsBtn').addEventListener('click', resetPrompts);

    // 历史记录
    document.getElementById('historyBtn').addEventListener('click', openHistoryModal);
    document.getElementById('historyModalClose').addEventListener('click', closeHistoryModal);
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
    document.getElementById('exportHistoryBtn').addEventListener('click', exportSelectedHistory);

    // 模态框关闭
    document.querySelector('.close').addEventListener('click', closePromptModal);
    window.addEventListener('click', (e) => {
        const promptModal = document.getElementById('promptModal');
        const historyModal = document.getElementById('historyModal');
        if (e.target === promptModal) {
            closePromptModal();
        }
        if (e.target === historyModal) {
            closeHistoryModal();
        }
    });

    // 复制按钮（排除历史按钮）
    document.querySelectorAll('.btn-copy').forEach(btn => {
        if (btn.id !== 'historyBtn') {
            btn.addEventListener('click', (e) => {
                const targetId = e.currentTarget.getAttribute('data-target');
                copyToClipboard(targetId);
            });
        }
    });

    // 主题切换
    document.getElementById('themeSwitcherBtn').addEventListener('click', toggleThemeDropdown);
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const color = e.target.getAttribute('data-color');
            setTheme(color);
        });
    });

    // 点击外部关闭主题下拉框
    document.addEventListener('click', (e) => {
        const themeSwitcher = document.querySelector('.theme-switcher');
        if (!themeSwitcher.contains(e.target)) {
            closeThemeDropdown();
        }
    });

    // API配置折叠
    document.getElementById('apiCollapseBtn').addEventListener('click', toggleApiConfig);
}

// ========== API 配置相关 ==========

// 简单的加密/解密函数（使用Base64和简单的异或）
function simpleEncrypt(text, key = 'tutu-video-tool-2025') {
    const encrypted = Array.from(text).map((char, i) => {
        return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length));
    }).join('');
    return btoa(encrypted);
}

function simpleDecrypt(encrypted, key = 'tutu-video-tool-2025') {
    try {
        const decrypted = atob(encrypted);
        return Array.from(decrypted).map((char, i) => {
            return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length));
        }).join('');
    } catch {
        return null;
    }
}

function handleProviderChange() {
    const provider = document.getElementById('aiProvider').value;

    // 加载该服务商的保存配置（包括API地址）
    loadProviderConfig(provider);
}

function updateModelOptions(models, savedModel = null) {
    const modelSelect = document.getElementById('modelName');

    modelSelect.innerHTML = '';
    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    });

    // 设置保存的模型值（如果提供且存在于列表中）
    if (savedModel && models.includes(savedModel)) {
        modelSelect.value = savedModel;
    }
}

function saveApiConfig() {
    const provider = document.getElementById('aiProvider').value;
    const modelSelect = document.getElementById('modelName');

    // 获取当前下拉框中的所有模型（可能包含测试连接时获取的模型）
    const availableModels = Array.from(modelSelect.options).map(opt => opt.value);

    const config = {
        apiUrl: document.getElementById('apiUrl').value,
        apiKey: document.getElementById('apiKey').value,
        model: modelSelect.value,
        availableModels: availableModels  // 保存当前可用的模型列表
    };

    // 为每个服务商独立保存配置
    const allConfigs = getAllProviderConfigs();
    allConfigs[provider] = config;

    // 加密保存到localStorage
    const encrypted = simpleEncrypt(JSON.stringify(allConfigs));
    localStorage.setItem('apiConfigs', encrypted);

    // 保存当前选择的服务商
    localStorage.setItem('currentProvider', provider);

    showMessage('apiMessage', 'API配置已保存！', 'success');
}

function loadApiConfig() {
    // 加载上次选择的服务商
    const savedProvider = localStorage.getItem('currentProvider');
    if (savedProvider && AI_CONFIGS[savedProvider]) {
        document.getElementById('aiProvider').value = savedProvider;
    }

    // 触发 provider 变化以加载配置
    handleProviderChange();
}

function loadProviderConfig(provider) {
    const allConfigs = getAllProviderConfigs();
    const config = allConfigs[provider];
    const defaultConfig = AI_CONFIGS[provider];

    if (config) {
        // 加载保存的配置
        document.getElementById('apiUrl').value = config.apiUrl || defaultConfig.apiUrl;
        document.getElementById('apiKey').value = config.apiKey || '';

        // 优先使用保存的模型列表（可能包含测试连接时获取的模型），否则使用默认列表
        const modelsToUse = (config.availableModels && config.availableModels.length > 0)
            ? config.availableModels
            : defaultConfig.models;

        // 更新模型列表并设置保存的模型值
        updateModelOptions(modelsToUse, config.model);
    } else {
        // 没有保存的配置，使用默认值
        document.getElementById('apiUrl').value = defaultConfig.apiUrl;
        document.getElementById('apiKey').value = '';

        // 更新模型列表为默认值
        updateModelOptions(defaultConfig.models);
    }
}

function getAllProviderConfigs() {
    const encrypted = localStorage.getItem('apiConfigs');
    if (encrypted) {
        const decrypted = simpleDecrypt(encrypted);
        if (decrypted) {
            try {
                return JSON.parse(decrypted);
            } catch {
                return {};
            }
        }
    }
    return {};
}

// 导出配置到加密文件
function exportConfig() {
    const allConfigs = getAllProviderConfigs();

    if (Object.keys(allConfigs).length === 0) {
        showMessage('apiMessage', '暂无配置可导出！', 'error');
        return;
    }

    // 创建加密的配置文件内容
    const configData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        configs: allConfigs
    };

    const encrypted = simpleEncrypt(JSON.stringify(configData));

    // 创建下载链接
    const blob = new Blob([encrypted], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tutu-api-config-${Date.now()}.tutuapi`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showMessage('apiMessage', '配置已导出！', 'success');
}

// 从加密文件导入配置
function importConfig(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const encrypted = e.target.result;
            const decrypted = simpleDecrypt(encrypted);

            if (!decrypted) {
                showMessage('apiMessage', '配置文件解密失败！', 'error');
                return;
            }

            const configData = JSON.parse(decrypted);

            // 验证配置文件格式
            if (!configData.configs || typeof configData.configs !== 'object') {
                showMessage('apiMessage', '配置文件格式错误！', 'error');
                return;
            }

            // 保存导入的配置
            const encrypted2 = simpleEncrypt(JSON.stringify(configData.configs));
            localStorage.setItem('apiConfigs', encrypted2);

            // 重新加载当前页面配置
            loadApiConfig();

            showMessage('apiMessage', '配置导入成功！', 'success');
        } catch (error) {
            console.error('导入配置失败:', error);
            showMessage('apiMessage', '配置文件读取失败！', 'error');
        }
    };

    reader.readAsText(file);

    // 清空文件选择，允许重复导入相同文件
    event.target.value = '';
}

// 一键还原所有设置
function resetAllSettings() {
    if (!confirm('确定要还原所有设置吗？这将清除所有API配置、Prompt配置和主题设置，此操作不可恢复！')) {
        return;
    }

    // 清除所有localStorage数据
    localStorage.removeItem('apiConfigs');
    localStorage.removeItem('currentProvider');
    localStorage.removeItem('prompts');
    localStorage.removeItem('defaultPrompts');  // 清除自定义的默认Prompt
    localStorage.removeItem('themeColor');

    // 重新加载页面配置
    document.getElementById('aiProvider').value = 'openai';
    handleProviderChange();

    // 清空表单
    document.getElementById('apiKey').value = '';

    // 还原Prompt
    loadPrompts();

    // 还原主题
    setTheme('#802520');

    showMessage('apiMessage', '所有设置已还原为初始值！', 'success');
}

// ========== Prompt 配置相关 ==========

function openPromptModal() {
    const modal = document.getElementById('promptModal');
    modal.classList.add('show');
}

function closePromptModal() {
    const modal = document.getElementById('promptModal');
    modal.classList.remove('show');
}

function savePrompts() {
    const prompts = {
        title: document.getElementById('titlePrompt').value,
        summary: document.getElementById('summaryPrompt').value,
        tags: document.getElementById('tagsPrompt').value
    };

    localStorage.setItem('prompts', JSON.stringify(prompts));
    showMessage('promptMessage', 'Prompt配置已保存！', 'success');
    setTimeout(() => {
        closePromptModal();
    }, 1500);
}

function resetPrompts() {
    if (confirm('确定要还原为默认Prompt吗？')) {
        localStorage.removeItem('prompts');
        loadPrompts();
        showMessage('promptMessage', '已还原为默认Prompt！', 'success');
    }
}

function loadPrompts() {
    const saved = localStorage.getItem('prompts');
    const prompts = saved ? JSON.parse(saved) : getDefaultPrompts();

    document.getElementById('titlePrompt').value = prompts.title;
    document.getElementById('summaryPrompt').value = prompts.summary;
    document.getElementById('tagsPrompt').value = prompts.tags;
}

function getPrompts() {
    const saved = localStorage.getItem('prompts');
    return saved ? JSON.parse(saved) : getDefaultPrompts();
}

// ========== AI 请求处理 ==========

async function handleSubmit() {
    const scriptText = document.getElementById('scriptInput').value.trim();

    if (!scriptText) {
        showMessage('submitMessage', '请输入视频稿件！', 'error');
        return;
    }

    // 获取当前选择的服务商配置
    const provider = localStorage.getItem('currentProvider') || 'openai';
    const allConfigs = getAllProviderConfigs();
    const providerConfig = allConfigs[provider];

    if (!providerConfig || !providerConfig.apiKey) {
        showMessage('submitMessage', '请先配置 API 密钥！', 'error');
        return;
    }

    // 构建完整的配置对象
    const apiConfig = {
        provider: provider,
        apiUrl: providerConfig.apiUrl,
        apiKey: providerConfig.apiKey,
        model: providerConfig.model
    };

    // 清除之前的消息
    hideMessage('submitMessage');

    // 获取 Prompts
    const prompts = getPrompts();

    // 显示加载状态
    showLoading('titleOutput');
    showLoading('summaryOutput');
    showLoading('tagsOutput');

    // 并发请求三个 AI 回复
    try {
        const [titleResult, summaryResult, tagsResult] = await Promise.allSettled([
            callAI(scriptText, prompts.title, apiConfig),
            callAI(scriptText, prompts.summary, apiConfig),
            callAI(scriptText, prompts.tags, apiConfig)
        ]);

        // 显示结果
        displayResult('titleOutput', titleResult, 'titleMessage');
        displayResult('summaryOutput', summaryResult, 'summaryMessage');
        displayResult('tagsOutput', tagsResult, 'tagsMessage');

        // 检查是否全部成功
        const allSuccess = titleResult.status === 'fulfilled' &&
                          summaryResult.status === 'fulfilled' &&
                          tagsResult.status === 'fulfilled';

        if (allSuccess) {
            showMessage('submitMessage', '内容生成成功！', 'success');

            // 保存到历史记录
            saveToHistory({
                script: scriptText,
                title: titleResult.value,
                summary: summaryResult.value,
                tags: tagsResult.value,
                timestamp: new Date().toISOString()
            });
        } else {
            showMessage('submitMessage', '部分内容生成失败，请查看详情', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('titleOutput', '请求失败，请检查配置');
        showError('summaryOutput', '请求失败，请检查配置');
        showError('tagsOutput', '请求失败，请检查配置');
        showMessage('submitMessage', '请求失败，请检查配置', 'error');
    }
}

async function callAI(scriptText, prompt, config) {
    const provider = config.provider;

    if (provider === 'openai' || provider === 'deepseek') {
        return await callOpenAICompatible(scriptText, prompt, config);
    } else if (provider === 'gemini') {
        return await callGemini(scriptText, prompt, config);
    } else if (provider === 'custom') {
        return await callOpenAICompatible(scriptText, prompt, config);
    }
}

async function callOpenAICompatible(scriptText, prompt, config) {
    // 确保URL包含完整的端点
    let apiUrl = config.apiUrl;
    if (!apiUrl.includes('/chat/completions')) {
        apiUrl = apiUrl.endsWith('/') ? apiUrl + 'chat/completions' : apiUrl + '/chat/completions';
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
            model: config.model,
            messages: [
                {
                    role: 'system',
                    content: prompt
                },
                {
                    role: 'user',
                    content: scriptText
                }
            ],
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

async function callGemini(scriptText, prompt, config) {
    try {
        // Gemini API URL格式
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${prompt}\n\n视频脚本：\n${scriptText}`
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`HTTP ${response.status}: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            throw new Error('网络错误：无法连接到Gemini API，请检查网络和API密钥');
        }
        throw error;
    }
}

// ========== UI 更新 ==========

function showLoading(elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '<div class="loading">正在生成中...</div>';
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.innerHTML = `<div class="error">${message}</div>`;
}

function displayResult(elementId, result, messageId) {
    const element = document.getElementById(elementId);

    if (result.status === 'fulfilled') {
        element.textContent = result.value;
    } else {
        element.innerHTML = `<div class="error">生成失败: ${result.reason.message}</div>`;
        if (messageId) {
            showMessage(messageId, `生成失败: ${result.reason.message}`, 'error');
        }
    }
}

// ========== 复制功能 ==========

function copyToClipboard(elementId) {
      const element = document.getElementById(elementId);
      const text = element.textContent;

      // 获取对应的消息框ID
      const messageId = elementId.replace('Output', 'Message');

      if (!text || text.includes('正在生成') || text.includes('生成失败')) {
          showMessage(messageId, '暂无可复制内容！', 'error');
          return;
      }

      // 检查是否支持 Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
          // 使用现代 Clipboard API
          navigator.clipboard.writeText(text).then(() => {
              showMessage(messageId, '已复制到剪贴板！', 'success');
          }).catch(err => {
              console.error('复制失败:', err);
              // 如果失败，尝试备用方案
              fallbackCopyToClipboard(text, messageId);
          });
      } else {
          // 使用备用方案
          fallbackCopyToClipboard(text, messageId);
      }
  }

  // 备用复制方案（兼容旧浏览器和非安全上下文）
  function fallbackCopyToClipboard(text, messageId) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
          const successful = document.execCommand('copy');
          if (successful) {
              showMessage(messageId, '已复制到剪贴板！', 'success');
          } else {
              showMessage(messageId, '复制失败，请手动复制', 'error');
          }
      } catch (err) {
          console.error('备用复制方案失败:', err);
          showMessage(messageId, '复制失败，请手动复制', 'error');
      }

      document.body.removeChild(textArea);
  }

// ========== 消息提示功能 ==========

function showMessage(messageId, text, type) {
    const messageBox = document.getElementById(messageId);
    if (!messageBox) return;

    messageBox.textContent = text;
    messageBox.className = `message-box show ${type}`;

    // 3秒后自动隐藏
    setTimeout(() => {
        hideMessage(messageId);
    }, 3000);
}

function hideMessage(messageId) {
    const messageBox = document.getElementById(messageId);
    if (!messageBox) return;

    messageBox.classList.remove('show');
}

// ========== 主题切换功能 ==========

function toggleThemeDropdown(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('themeDropdown');
    dropdown.classList.toggle('show');
}

function closeThemeDropdown() {
    const dropdown = document.getElementById('themeDropdown');
    dropdown.classList.remove('show');
}

function setTheme(color) {
    document.documentElement.style.setProperty('--theme-color', color);
    localStorage.setItem('themeColor', color);

    // 更新激活状态
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-color') === color) {
            option.classList.add('active');
        }
    });

    closeThemeDropdown();
}

function loadTheme() {
    const savedTheme = localStorage.getItem('themeColor');
    if (savedTheme) {
        setTheme(savedTheme);
    }
}

// ========== API配置折叠功能 ==========

function toggleApiConfig() {
    const content = document.getElementById('apiConfigContent');
    const header = document.getElementById('apiCardHeader');
    const btn = document.getElementById('apiCollapseBtn');
    const isCollapsed = content.classList.contains('collapsed');

    if (isCollapsed) {
        // 展开
        content.classList.remove('collapsed');
        header.classList.remove('no-margin');
        btn.textContent = '折叠';
        localStorage.setItem('apiConfigCollapsed', 'false');
    } else {
        // 折叠
        content.classList.add('collapsed');
        header.classList.add('no-margin');
        btn.textContent = '配置';
        localStorage.setItem('apiConfigCollapsed', 'true');
    }
}

function loadApiConfigState() {
    const savedState = localStorage.getItem('apiConfigCollapsed');
    const content = document.getElementById('apiConfigContent');
    const header = document.getElementById('apiCardHeader');
    const btn = document.getElementById('apiCollapseBtn');

    // 默认折叠状态（首次访问或未保存状态时）
    const isCollapsed = savedState === null ? true : savedState === 'true';

    if (isCollapsed) {
        content.classList.add('collapsed');
        header.classList.add('no-margin');
        btn.textContent = '配置';
    } else {
        btn.textContent = '折叠';
    }
}

// ========== API 测试和模型获取功能 ==========

async function testApiConnection() {
    const provider = document.getElementById('aiProvider').value;
    const apiUrl = document.getElementById('apiUrl').value.trim();
    const apiKey = document.getElementById('apiKey').value.trim();

    if (!apiUrl) {
        showMessage('apiMessage', '请先输入API地址！', 'error');
        return;
    }

    if (!apiKey) {
        showMessage('apiMessage', '请先输入API密钥！', 'error');
        return;
    }

    showMessage('apiMessage', '正在测试连接...', 'success');

    try {
        const models = await fetchAvailableModels(provider, apiUrl, apiKey);

        if (models && models.length > 0) {
            // 更新模型下拉列表
            updateModelSelect(models);
            showMessage('apiMessage', `连接成功！获取到 ${models.length} 个可用模型`, 'success');
        } else {
            showMessage('apiMessage', '连接成功，但未获取到模型列表', 'success');
        }
    } catch (error) {
        console.error('API测试失败:', error);
        showMessage('apiMessage', `连接失败: ${error.message}`, 'error');
    }
}

async function fetchAvailableModels(provider, apiUrl, apiKey) {
    if (provider === 'openai' || provider === 'custom') {
        return await fetchOpenAIModels(apiUrl, apiKey);
    } else if (provider === 'deepseek') {
        return await fetchDeepSeekModels(apiUrl, apiKey);
    } else if (provider === 'gemini') {
        return await fetchGeminiModels(apiKey);
    }
}

async function fetchOpenAIModels(apiUrl, apiKey) {
    // OpenAI 使用 /v1/models 端点
    const modelsUrl = apiUrl.replace('/chat/completions', '/models');

    const response = await fetch(modelsUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // 过滤出 gpt 模型
    return data.data
        .filter(model => model.id.includes('gpt'))
        .map(model => model.id)
        .sort();
}

async function fetchDeepSeekModels(apiUrl, apiKey) {
    // DeepSeek 使用 /v1/models 端点
    const modelsUrl = apiUrl.replace('/chat/completions', '/models');

    const response = await fetch(modelsUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.map(model => model.id);
}

async function fetchGeminiModels(apiKey) {
    // Gemini 使用特定的 API 格式
    const modelsUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    const response = await fetch(modelsUrl, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // 过滤支持 generateContent 的模型
    return data.models
        .filter(model => model.supportedGenerationMethods?.includes('generateContent'))
        .map(model => model.name.replace('models/', ''))
        .sort();
}

function updateModelSelect(models) {
    const modelSelect = document.getElementById('modelName');
    const currentValue = modelSelect.value;

    modelSelect.innerHTML = '';

    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    });

    // 如果之前选择的模型还在列表中，保持选择
    if (models.includes(currentValue)) {
        modelSelect.value = currentValue;
    }
}

// ========== 历史记录功能 ==========

let selectedHistoryIndex = null;

function saveToHistory(record) {
    let history = getHistory();

    // 添加到历史记录开头
    history.unshift(record);

    // 只保留最近10条
    if (history.length > 10) {
        history = history.slice(0, 10);
    }

    localStorage.setItem('generationHistory', JSON.stringify(history));
}

function getHistory() {
    const saved = localStorage.getItem('generationHistory');
    return saved ? JSON.parse(saved) : [];
}

function openHistoryModal() {
    const modal = document.getElementById('historyModal');
    modal.classList.add('show');
    selectedHistoryIndex = null;
    renderHistoryList();
}

function closeHistoryModal() {
    const modal = document.getElementById('historyModal');
    modal.classList.remove('show');
    selectedHistoryIndex = null;
}

function renderHistoryList() {
    const historyList = document.getElementById('historyList');
    const history = getHistory();

    if (history.length === 0) {
        historyList.innerHTML = '<div class="history-empty">暂无历史记录</div>';
        return;
    }

    historyList.innerHTML = '';

    history.forEach((record, index) => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.dataset.index = index;

        const date = new Date(record.timestamp);
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

        // 获取标题的前两行作为预览
        const preview = record.title.split('\n').slice(0, 2).join('\n') || '无标题';

        item.innerHTML = `
            <div class="history-item-header">
                <span class="history-item-date">${dateStr}</span>
            </div>
            <div class="history-item-preview">${preview}</div>
        `;

        item.addEventListener('click', () => {
            // 移除其他项的选中状态
            document.querySelectorAll('.history-item').forEach(i => i.classList.remove('selected'));
            // 添加当前项的选中状态
            item.classList.add('selected');
            selectedHistoryIndex = index;

            // 恢复数据到页面
            restoreHistory(record);
        });

        historyList.appendChild(item);
    });
}

function restoreHistory(record) {
    document.getElementById('scriptInput').value = record.script;
    document.getElementById('titleOutput').textContent = record.title;
    document.getElementById('summaryOutput').textContent = record.summary;
    document.getElementById('tagsOutput').textContent = record.tags;

    showMessage('historyMessage', '已恢复历史记录！', 'success');
}

function clearHistory() {
    if (!confirm('确定要清空所有历史记录吗？此操作不可恢复！')) {
        return;
    }

    localStorage.removeItem('generationHistory');
    selectedHistoryIndex = null;
    renderHistoryList();
    showMessage('historyMessage', '历史记录已清空！', 'success');
}

function exportSelectedHistory() {
    if (selectedHistoryIndex === null) {
        showMessage('historyMessage', '请先选择要存档的记录！', 'error');
        return;
    }

    const history = getHistory();
    const record = history[selectedHistoryIndex];

    if (!record) {
        showMessage('historyMessage', '记录不存在！', 'error');
        return;
    }

    // 按照指定格式生成文本内容，每个部分下方加一个空行
    const content = `标题：
${record.title}

摘要：
${record.summary}

标签：
${record.tags}

视频稿件：
${record.script}
`;

    // 创建下载
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // 使用时间戳作为文件名，格式：纯数字（日期+时间）
    const date = new Date(record.timestamp);
    const filename = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}.txt`;
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showMessage('historyMessage', '已导出为txt文件！', 'success');
}
