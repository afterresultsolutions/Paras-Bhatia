<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AR Solutions AI Chatbot</title>
  <meta name="description" content="AR Solutions AI - Your intelligent business assistant">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }

    .chat-wrapper {
      width: 100%;
      min-height: 100vh;
      transition: background-color 0.2s, color 0.2s;
    }

    .chat-wrapper.dark-mode {
      background-color: #212121;
      color: #ececec;
    }

    .chat-wrapper.light-mode {
      background-color: #ffffff;
      color: #2f2f2f;
    }

    .chat-container {
      display: flex;
      height: 100vh;
      position: relative;
    }

    .sidebar {
      width: 260px;
      display: flex;
      flex-direction: column;
      border-right: 1px solid;
      transition: background-color 0.2s;
    }

    .sidebar.sidebar-dark {
      background-color: #171717;
      border-color: #363636;
    }

    .sidebar.sidebar-light {
      background-color: #f9f9f9;
      border-color: #e5e5e5;
    }

    .sidebar-header {
      padding: 12px 8px;
      border-bottom: 1px solid;
    }

    .sidebar-dark .sidebar-header {
      border-color: #363636;
    }

    .sidebar-light .sidebar-header {
      border-color: #e5e5e5;
    }

    .new-chat-btn {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      font-size: 14px;
      border: 1px solid;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s;
      background: none;
    }

    .btn-dark {
      color: #ececec;
      border-color: #4d4d4d;
    }

    .btn-dark:hover {
      background-color: #2f2f2f;
    }

    .btn-light {
      color: #2f2f2f;
      border-color: #d1d1d1;
    }

    .btn-light:hover {
      background-color: #f0f0f0;
    }

    .sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 8px;
    }

    .history-label {
      font-size: 11px;
      font-weight: 500;
      padding: 8px 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #6b7280;
    }

    .history-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      font-size: 14px;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-bottom: 4px;
    }

    .history-item.history-item-dark:hover {
      background-color: #2f2f2f;
    }

    .history-item.history-item-light:hover {
      background-color: #ececec;
    }

    .history-title {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sidebar-footer {
      padding: 12px 8px;
      border-top: 1px solid;
      display: flex;
      gap: 8px;
    }

    .footer-dark {
      border-color: #363636;
    }

    .footer-light {
      border-color: #e5e5e5;
    }

    .footer-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px;
      font-size: 14px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s;
      background: none;
      max-width: 60px;
    }

    .footer-human-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 20px;
      text-decoration: none;
      cursor: pointer;
      transition: opacity 0.2s;
      flex: 1;
      max-width: none;
    }

    .footer-human-btn:hover {
      opacity: 0.9;
    }

    .mobile-sidebar {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: 260px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      transform: translateX(-100%);
      transition: transform 0.3s;
    }

    .mobile-sidebar.mobile-sidebar-open {
      transform: translateX(0);
    }

    .mobile-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }

    .mobile-menu-btn {
      position: fixed;
      top: 14px;
      left: 12px;
      z-index: 998;
      padding: 8px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .chat-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid;
    }

    .header-dark {
      background-color: #212121;
      border-color: #363636;
    }

    .header-light {
      background-color: #ffffff;
      border-color: #e5e5e5;
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: 40px;
    }

    .brand-name {
      font-size: 18px;
      font-weight: 600;
    }

    .model-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      font-size: 11px;
      font-weight: 600;
      background: linear-gradient(135deg, #00d084 0%, #00a86b 100%);
      color: white;
      border-radius: 4px;
    }

    .human-chat-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 20px;
      text-decoration: none;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .human-chat-btn:hover {
      opacity: 0.9;
    }

    .human-chat-text {
      display: none;
    }

    .chat-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .empty-state {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      min-height: calc(100vh - 200px);
    }

    .empty-title {
      font-size: 28px;
      font-weight: 400;
      margin-bottom: 60px;
      text-align: center;
    }

    .search-container-center {
      width: 100%;
      max-width: 600px;
    }

    .search-box {
      display: flex;
      align-items: center;
      border: 1px solid;
      border-radius: 24px;
      padding: 4px 4px 4px 16px;
      transition: border-color 0.2s;
      width: 100%;
    }

    .search-dark {
      background-color: #2f2f2f;
      border-color: #4d4d4d;
    }

    .search-light {
      background-color: #f4f4f4;
      border-color: #d1d1d1;
    }

    .search-box:focus-within {
      border-color: #6e6e6e;
    }

    .search-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      padding: 12px 8px;
      font-size: 15px;
      min-width: 0;
    }

    .input-dark {
      color: #ececec;
    }

    .input-dark::placeholder {
      color: #8e8e8e;
    }

    .input-light {
      color: #2f2f2f;
    }

    .input-light::placeholder {
      color: #8e8e8e;
    }

    .send-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 50%;
      background-color: #676767;
      color: white;
      cursor: not-allowed;
      transition: background-color 0.2s;
      flex-shrink: 0;
    }

    .send-btn.send-btn-active {
      background-color: #ececec;
      color: #2f2f2f;
      cursor: pointer;
    }

    .send-btn.send-btn-active:hover {
      background-color: #d9d9d9;
    }

    .disclaimer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      padding-bottom: 40px;
    }

    .messages-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .messages-container {
      flex: 1;
      overflow-y: auto;
      padding-bottom: 0;
    }

    .messages-inner {
      max-width: 768px;
      margin: 0 auto;
      padding: 24px 20px 0;
    }

    .message-group {
      margin-bottom: 24px;
    }

    .message-row {
      display: flex;
      gap: 16px;
    }

    .message-user {
      flex-direction: row-reverse;
    }

    .message-bot {
      flex-direction: row;
    }

    .message-content-wrapper {
      flex: 1;
      min-width: 0;
    }

    .message-user .message-content-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .message-bot .message-content-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .message-content {
      margin-bottom: 8px;
      max-width: 70%;
    }

    .message-user .message-content {
      background-color: #2f2f2f;
      color: white;
      padding: 12px 16px;
      border-radius: 18px;
      border-bottom-right-radius: 4px;
    }

    .light-mode .message-user .message-content {
      background-color: #f0f0f0;
      color: #2f2f2f;
    }

    .message-text {
      font-size: 15px;
      line-height: 1.6;
      white-space: pre-wrap;
      word-wrap: break-word;
      margin: 0;
    }

    .launch-btn {
      display: inline-block;
      margin-top: 12px;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 500;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 20px;
      text-decoration: none;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .launch-btn:hover {
      opacity: 0.9;
    }

    .message-actions {
      display: flex;
      gap: 4px;
      margin-top: 8px;
      opacity: 1;
      transition: opacity 0.2s;
    }

    .action-btn {
      padding: 6px;
      border: none;
      background: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s;
      color: inherit;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dark-mode .action-btn:hover {
      background-color: #2f2f2f;
    }

    .light-mode .action-btn:hover {
      background-color: #f0f0f0;
    }

    .input-area {
      padding: 20px;
      border-top: 1px solid transparent;
      position: sticky;
      bottom: 0;
      z-index: 100;
    }

    .dark-mode .input-area {
      background: linear-gradient(to top, #212121 0%, #212121 85%, transparent 100%);
    }

    .light-mode .input-area {
      background: linear-gradient(to top, #ffffff 0%, #ffffff 85%, transparent 100%);
    }

    .input-container {
      max-width: 768px;
      margin: 0 auto;
    }

    .icon-xs {
      width: 16px;
      height: 16px;
    }

    .icon-sm {
      width: 20px;
      height: 20px;
    }

    .icon-md {
      width: 24px;
      height: 24px;
    }

    .hidden {
      display: none;
    }

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #4d4d4d;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #6e6e6e;
    }

    .text-gray-400 {
      color: #9ca3af;
    }

    .text-gray-500 {
      color: #6b7280;
    }

    .text-white {
      color: white;
    }

    .text-gray-800 {
      color: #1f2937;
    }

    @media (max-width: 1024px) {
      .sidebar {
        width: 240px;
      }
    }

    @media (max-width: 768px) {
      .sidebar {
        display: none;
      }
      .header-title {
        margin-left: 48px;
      }
      .empty-title {
        font-size: 22px;
        margin-bottom: 30px;
      }
      .messages-inner {
        padding: 20px 12px 0;
      }
      .input-area {
        padding: 12px;
      }
      .search-container-center {
        max-width: 100%;
        padding: 0 12px;
      }
      .empty-state {
        padding: 12px;
        justify-content: flex-start;
        padding-top: 40px;
      }
      .message-row {
        gap: 12px;
      }
      .message-text {
        font-size: 14px;
      }
      .disclaimer {
        padding-bottom: 20px;
      }
    }

    @media (max-width: 480px) {
      .empty-title {
        font-size: 20px;
        margin-bottom: 20px;
      }
      .header-title {
        margin-left: 44px;
      }
      .mobile-menu-btn {
        top: 10px;
        left: 8px;
        padding: 6px;
      }
      .chat-header {
        padding: 8px 10px;
      }
      .human-chat-btn {
        padding: 6px 10px;
        font-size: 12px;
        gap: 4px;
      }
      .brand-name {
        font-size: 16px;
      }
      .model-badge {
        width: 18px;
        height: 18px;
        font-size: 10px;
      }
      .search-input {
        font-size: 14px;
        padding: 10px 6px;
      }
      .send-btn {
        width: 28px;
        height: 28px;
      }
      .search-box {
        padding: 3px 3px 3px 12px;
      }
      .messages-inner {
        padding: 16px 8px 0;
      }
      .input-area {
        padding: 10px 8px;
      }
      .search-container-center {
        padding: 0 8px;
      }
      .message-row {
        gap: 8px;
      }
      .message-text {
        font-size: 13px;
        line-height: 1.5;
      }
      .launch-btn {
        padding: 8px 16px;
        font-size: 13px;
      }
      .action-btn {
        padding: 4px;
      }
      .icon-xs {
        width: 14px;
        height: 14px;
      }
      .disclaimer {
        font-size: 11px;
        margin-top: 8px;
        padding-bottom: 15px;
      }
    }

    @media (min-width: 640px) {
      .human-chat-text {
        display: inline;
      }
    }

    @media (min-width: 769px) {
      .mobile-menu-btn {
        display: none;
      }
      .mobile-sidebar {
        display: none;
      }
      .header-title {
        margin-left: 0;
      }
      .empty-state {
        justify-content: center;
        padding-top: 20px;
      }
    }
  </style>
</head>
<body>
  <div id="app" class="chat-wrapper light-mode">
    <div class="chat-container">
      <div id="sidebar" class="sidebar sidebar-light">
        <div class="sidebar-header">
          <button onclick="app.startNewChat()" class="new-chat-btn btn-light">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>New chat</span>
          </button>
        </div>
        <div class="sidebar-content" id="sidebarContent"></div>
        <div class="sidebar-footer footer-light">
          <a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="human-chat-btn footer-human-btn">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="human-chat-text">Chat with Human</span>
          </a>
          <button onclick="app.toggleTheme()" class="footer-btn btn-light">
            <svg id="themeIcon" class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div id="mobileOverlay" class="mobile-overlay hidden" onclick="app.toggleMenu()"></div>
      <div id="mobileSidebar" class="mobile-sidebar sidebar-light">
        <div class="sidebar-header">
          <button onclick="app.toggleMenu(); app.startNewChat()" class="new-chat-btn btn-light">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>New chat</span>
          </button>
        </div>
        <div class="sidebar-content" id="mobileSidebarContent"></div>
        <div class="sidebar-footer footer-light">
          <a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="human-chat-btn footer-human-btn">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="human-chat-text">Chat with Human</span>
          </a>
          <button onclick="app.toggleTheme()" class="footer-btn btn-light">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>
      </div>

      <button onclick="app.toggleMenu()" class="mobile-menu-btn btn-light">
        <svg class="icon-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <div class="main-content">
        <div class="chat-header header-light">
          <div class="header-title">
            <span class="brand-name">AR Solutions</span>
            <span class="model-badge">AI</span>
          </div>
        </div>

        <div class="chat-area">
          <div id="emptyState" class="empty-state">
            <h1 class="empty-title text-gray-800">Hey there! How can I help you today?</h1>
            <div class="search-container-center">
              <div class="search-box search-light">
                <input id="queryInputEmpty" type="text" placeholder="Ask anything" class="search-input input-light" onkeypress="app.handleEnter(event)" oninput="app.updateSendButtons()"/>
                <button onclick="app.handleSearch()" class="send-btn" id="sendBtnEmpty">
                  <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                </button>
              </div>
              <div class="disclaimer text-gray-400">AR Solutions AI can make mistakes. Check important info.</div>
            </div>
          </div>

          <div id="messagesWrapper" class="messages-wrapper hidden">
            <div class="messages-container" id="messagesContainer">
              <div class="messages-inner" id="messagesInner"></div>
            </div>
            <div class="input-area">
              <div class="input-container">
                <div class="search-box search-light">
                  <input id="queryInputBottom" type="text" placeholder="Message AR Solutions AI" class="search-input input-light" onkeypress="app.handleEnter(event)" oninput="app.updateSendButtons()"/>
                  <button onclick="app.handleSearch()" class="send-btn" id="sendBtnBottom">
                    <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                  </button>
                </div>
                <div class="disclaimer text-gray-400">AR Solutions AI can make mistakes. Check important info.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const app = {
      isDarkMode: false,
      messages: [],
      chatHistory: [],
      currentChatId: null,
      showMenu: false,
      spellCheckDictionary: {
        'teh': 'the', 'recieve': 'receive', 'occured': 'occurred', 'seperate': 'separate',
        'definately': 'definitely', 'goverment': 'government', 'accomodate': 'accommodate',
        'wich': 'which', 'thier': 'their', 'succesful': 'successful', 'begining': 'beginning',
        'untill': 'until', 'occassion': 'occasion', 'calender': 'calendar', 'existance': 'existence'
      },

      autoCorrectText(text) {
        let correctedText = text;
        Object.keys(this.spellCheckDictionary).forEach(mistake => {
          const regex = new RegExp(`\\b${mistake}\\b`, 'gi');
          correctedText = correctedText.replace(regex, this.spellCheckDictionary[mistake]);
        });
        return correctedText;
      },

      handleEnter(event) {
        if (event.key === 'Enter') this.handleSearch();
      },

      updateSendButtons() {
        const emptyInput = document.getElementById('queryInputEmpty');
        const bottomInput = document.getElementById('queryInputBottom');
        const sendBtnEmpty = document.getElementById('sendBtnEmpty');
        const sendBtnBottom = document.getElementById('sendBtnBottom');
        if (emptyInput && emptyInput.value.trim()) sendBtnEmpty.classList.add('send-btn-active');
        else if (sendBtnEmpty) sendBtnEmpty.classList.remove('send-btn-active');
        if (bottomInput && bottomInput.value.trim()) sendBtnBottom.classList.add('send-btn-active');
        else if (sendBtnBottom) sendBtnBottom.classList.remove('send-btn-active');
      },

      handleSearch() {
        const emptyInput = document.getElementById('queryInputEmpty');
        const bottomInput = document.getElementById('queryInputBottom');
        const query = (emptyInput && emptyInput.value.trim()) || (bottomInput && bottomInput.value.trim());
        if (!query) return;
        const correctedQuery = this.autoCorrectText(query);
        if (!this.currentChatId) this.currentChatId = Date.now();
        this.messages.push({ type: 'user', text: correctedQuery, timestamp: new Date() });
        if (emptyInput) emptyInput.value = '';
        if (bottomInput) bottomInput.value = '';
        this.updateSendButtons();
        document.getElementById('emptyState').classList.add('hidden');
        document.getElementById('messagesWrapper').classList.remove('hidden');
        this.renderMessages();
        this.scrollToBottom();
        const queryLower = correctedQuery.toLowerCase();
        const ecommerceKeywords = ['ecommerce', 'e-commerce', 'online store', 'shopify', 'online selling', 'online shop', 'webstore', 'web store', 'online business', 'sell online', 'store', 'shop'];
        const serviceKeywords = ['service', 'services', 'what do you offer', 'what can you do', 'help with', 'provide', 'offering', 'offerings', 'solutions', 'capabilities'];
        const isEcommerceQuery = ecommerceKeywords.some(k => queryLower.includes(k));
        const isServiceQuery = serviceKeywords.some(k => queryLower.includes(k));
        setTimeout(() => {
          if (isServiceQuery) {
            this.messages.push({ type: 'bot', text: 'We offer a comprehensive range of services to help grow your business both online and offline! From digital marketing and web development to business consulting and automation solutions, we have got you covered. Download our detailed service deck to explore everything we can do for you!', timestamp: new Date(), hasButton: true, buttonText: 'Download Service Deck', buttonLink: 'https://cdn2.f-cdn.com/files/download/257089198/afterresult.pdf' });
          } else if (isEcommerceQuery) {
            this.messages.push({ type: 'bot', text: 'Hi, thank you so much for sharing your requirement! We surely help you with ecommerce store end to end. We are professional team of ecommerce experts. You will make and live store in just 25 days. Start today!', timestamp: new Date(), hasButton: true, buttonText: 'Launch My Store', buttonLink: 'https://pages.razorpay.com/pl_R6OXxjqi9EpIhJ/view' });
          } else {
            this.messages.push({ type: 'bot', text: 'Oops! We will be soon live for you.', timestamp: new Date() });
          }
          this.renderMessages();
          this.scrollToBottom();
        }, 500);
      },

      renderMessages() {
        const messagesInner = document.getElementById('messagesInner');
        messagesInner.innerHTML = '';
        this.messages.forEach((msg, i) => {
          const group = document.createElement('div');
          group.className = 'message-group';
          const row = document.createElement('div');
          row.className = `message-row ${msg.type === 'user' ? 'message-user' : 'message-bot'}`;
          const wrapper = document.createElement('div');
          wrapper.className = 'message-content-wrapper';
          const content = document.createElement('div');
          content.className = 'message-content';
          const text = document.createElement('p');
          text.className = 'message-text';
          text.textContent = msg.text;
          content.appendChild(text);
          if (msg.hasButton) {
            const btn = document.createElement('a');
            btn.href = msg.buttonLink;
            btn.target = '_blank';
            btn.className = 'launch-btn';
            btn.textContent = msg.buttonText;
            content.appendChild(btn);
          }
          wrapper.appendChild(content);
          if (msg.type === 'bot') {
            const actions = document.createElement('div');
            actions.className = 'message-actions';
            actions.innerHTML = `<button onclick="app.copyMessage('${msg.text.replace(/'/g, "\\'")}')"><svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg></button><a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="action-btn"><svg class="icon-xs" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg></a><a href="tel:+919050983530" class="action-btn"><svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></a>`;
            wrapper.appendChild(actions);
          }
          row.appendChild(wrapper);
          group.appendChild(row);
          messagesInner.appendChild(group);
        });
      },

      scrollToBottom() {
        setTimeout(() => {
          const container = document.getElementById('messagesContainer');
          if (container) container.scrollTop = container.scrollHeight;
        }, 100);
      },

      toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        const appEl = document.getElementById('app');
        const sidebar = document.getElementById('sidebar');
        const mobileSidebar = document.getElementById('mobileSidebar');
        const themeIcon = document.getElementById('themeIcon');
        if (this.isDarkMode) {
          appEl.className = 'chat-wrapper dark-mode';
          sidebar.className = 'sidebar sidebar-dark';
          mobileSidebar.className = 'mobile-sidebar sidebar-dark';
          themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
          document.querySelectorAll('.btn-light').forEach(el => { el.className = el.className.replace('btn-light', 'btn-dark'); });
          document.querySelectorAll('.header-light').forEach(el => { el.className = el.className.replace('header-light', 'header-dark'); });
          document.querySelectorAll('.search-light').forEach(el => { el.className = el.className.replace('search-light', 'search-dark'); });
          document.querySelectorAll('.input-light').forEach(el => { el.className = el.className.replace('input-light', 'input-dark'); });
          document.querySelectorAll('.footer-light').forEach(el => { el.className = el.className.replace('footer-light', 'footer-dark'); });
          document.querySelectorAll('.text-gray-800').forEach(el => { el.className = el.className.replace('text-gray-800', 'text-white'); });
          document.querySelectorAll('.text-gray-400').forEach(el => { el.className = el.className.replace('text-gray-400', 'text-gray-500'); });
        } else {
          appEl.className = 'chat-wrapper light-mode';
          sidebar.className = 'sidebar sidebar-light';
          mobileSidebar.className = 'mobile-sidebar sidebar-light';
          themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
          document.querySelectorAll('.btn-dark').forEach(el => { el.className = el.className.replace('btn-dark', 'btn-light'); });
          document.querySelectorAll('.header-dark').forEach(el => { el.className = el.className.replace('header-dark', 'header-light'); });
          document.querySelectorAll('.search-dark').forEach(el => { el.className = el.className.replace('search-dark', 'search-light'); });
          document.querySelectorAll('.input-dark').forEach(el => { el.className = el.className.replace('input-dark', 'input-light'); });
          document.querySelectorAll('.footer-dark').forEach(el => { el.className = el.className.replace('footer-dark', 'footer-light'); });
          document.querySelectorAll('.text-white').forEach(el => { el.className = el.className.replace('text-white', 'text-gray-800'); });
          document.querySelectorAll('.text-gray-500').forEach(el => { el.className = el.className.replace('text-gray-500', 'text-gray-400'); });
        }
      },

      startNewChat() {
        if (this.messages.length > 0) {
          this.chatHistory.unshift({ id: this.currentChatId || Date.now(), title: this.messages[0].text.substring(0, 30) + (this.messages[0].text.length > 30 ? '...' : ''), messages: [...this.messages], date: new Date() });
          this.renderChatHistory();
        }
        this.messages = [];
        this.currentChatId = null;
        document.getElementById('emptyState').classList.remove('hidden');
        document.getElementById('messagesWrapper').classList.add('hidden');
        document.getElementById('messagesInner').innerHTML = '';
        const emptyInput = document.getElementById('queryInputEmpty');
        const bottomInput = document.getElementById('queryInputBottom');
        if (emptyInput) emptyInput.value = '';
        if (bottomInput) bottomInput.value = '';
        this.updateSendButtons();
      },

      loadChat(chatId) {
        const chat = this.chatHistory.find(c => c.id === chatId);
        if (!chat) return;
        if (this.messages.length > 0 && this.currentChatId !== chatId) {
          const existingIndex = this.chatHistory.findIndex(c => c.id === this.currentChatId);
          if (existingIndex === -1) {
            this.chatHistory.unshift({ id: this.currentChatId, title: this.messages[0].text.substring(0, 30) + (this.messages[0].text.length > 30 ? '...' : ''), messages: [...this.messages], date: new Date() });
          }
        }
        this.messages = [...chat.messages];
        this.currentChatId = chat.id;
        this.showMenu = false;
        document.getElementById('mobileOverlay').classList.add('hidden');
        document.getElementById('mobileSidebar').classList.remove('mobile-sidebar-open');
        document.getElementById('emptyState').classList.add('hidden');
        document.getElementById('messagesWrapper').classList.remove('hidden');
        this.renderMessages();
        this.scrollToBottom();
      },

      renderChatHistory() {
        const sidebarContent = document.getElementById('sidebarContent');
        const mobileSidebarContent = document.getElementById('mobileSidebarContent');
        let html = '';
        if (this.chatHistory.length > 0) {
          html = '<div class="history-label">Recent</div>';
          this.chatHistory.forEach(chat => {
            const itemClass = this.isDarkMode ? 'history-item-dark' : 'history-item-light';
            html += `<div class="history-item ${itemClass}" onclick="app.loadChat(${chat.id})"><svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg><span class="history-title">${chat.title}</span></div>`;
          });
        }
        sidebarContent.innerHTML = html;
        mobileSidebarContent.innerHTML = html;
      },

      toggleMenu() {
        this.showMenu = !this.showMenu;
        const overlay = document.getElementById('mobileOverlay');
        const mobileSidebar = document.getElementById('mobileSidebar');
        if (this.showMenu) {
          overlay.classList.remove('hidden');
          mobileSidebar.classList.add('mobile-sidebar-open');
        } else {
          overlay.classList.add('hidden');
          mobileSidebar.classList.remove('mobile-sidebar-open');
        }
      },

      copyMessage(text) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => console.log('Copied')).catch(err => console.error('Copy failed:', err));
        }
      }
    };
  </script>
</body>
</html>
