<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AR Solutions AI Chatbot</title>
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

    @media (max-width: 360px) {
      .empty-title {
        font-size: 18px;
      }
      .human-chat-btn {
        padding: 5px 8px;
        font-size: 11px;
      }
      .human-chat-text {
        display: none;
      }
      .search-input {
        font-size: 13px;
        padding: 8px 6px;
      }
      .messages-inner {
        padding: 12px 6px 0;
      }
      .input-area {
        padding: 8px 6px;
      }
      .search-container-center {
        padding: 0 6px;
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
      <!-- Desktop Sidebar -->
      <div id="sidebar" class="sidebar sidebar-light">
        <div class="sidebar-header">
          <button onclick="startNewChat()" class="new-chat-btn btn-light">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>New chat</span>
          </button>
        </div>
        
        <div class="sidebar-content" id="sidebarContent">
          <!-- Chat history will be inserted here -->
        </div>
        
        <div class="sidebar-footer footer-light">
          <a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="human-chat-btn footer-human-btn">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="human-chat-text">Chat with Human</span>
          </a>
          <button onclick="toggleTheme()" class="footer-btn btn-light">
            <svg id="themeIcon" class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Sidebar -->
      <div id="mobileOverlay" class="mobile-overlay hidden" onclick="toggleMenu()"></div>
      <div id="mobileSidebar" class="mobile-sidebar sidebar-light">
        <div class="sidebar-header">
          <button onclick="toggleMenu(); startNewChat()" class="new-chat-btn btn-light">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>New chat</span>
          </button>
        </div>
        
        <div class="sidebar-content" id="mobileSidebarContent">
          <!-- Chat history will be inserted here -->
        </div>
        
        <div class="sidebar-footer footer-light">
          <a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="human-chat-btn footer-human-btn">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="human-chat-text">Chat with Human</span>
          </a>
          <button onclick="toggleTheme()" class="footer-btn btn-light">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu toggle -->
      <button onclick="toggleMenu()" class="mobile-menu-btn btn-light">
        <svg class="icon-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <!-- Main content -->
      <div class="main-content">
        <div class="chat-header header-light">
          <div class="header-title">
            <span class="brand-name">AR Solutions</span>
            <span class="model-badge">AI</span>
          </div>
        </div>

        <div class="chat-area">
          <!-- Empty state -->
          <div id="emptyState" class="empty-state">
            <h1 class="empty-title text-gray-800">Hey there! How can I help you today?</h1>
            
            <div class="search-container-center">
              <div class="search-box search-light">
                <input
                  id="queryInputEmpty"
                  type="text"
                  placeholder="Ask anything"
                  class="search-input input-light"
                  onkeypress="handleEnter(event)"
                />
                <button onclick="handleSearch()" class="send-btn" id="sendBtnEmpty">
                  <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                </button>
              </div>
              <div class="disclaimer text-gray-400">
                AR Solutions AI can make mistakes. Check important info.
              </div>
            </div>
          </div>

          <!-- Chat messages -->
          <div id="messagesWrapper" class="messages-wrapper hidden">
            <div class="messages-container" id="messagesContainer">
              <div class="messages-inner" id="messagesInner">
                <!-- Messages will be inserted here -->
              </div>
            </div>

            <!-- Bottom input -->
            <div class="input-area">
              <div class="input-container">
                <div class="search-box search-light">
                  <input
                    id="queryInputBottom"
                    type="text"
                    placeholder="Message AR Solutions AI"
                    class="search-input input-light"
                    onkeypress="handleEnter(event)"
                  />
                  <button onclick="handleSearch()" class="send-btn" id="sendBtnBottom">
                    <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                  </button>
                </div>
                <div class="disclaimer text-gray-400">
                  AR Solutions AI can make mistakes. Check important info.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    let isDarkMode = false;
    let messages = [];
    let chatHistory = [];
    let currentChatId = null;
    let showMenu = false;

    const spellCheckDictionary = {
      'teh': 'the',
      'recieve': 'receive',
      'occured': 'occurred',
      'seperate': 'separate',
      'definately': 'definitely',
      'goverment': 'government',
      'accomodate': 'accommodate',
      'wich': 'which',
      'thier': 'their',
      'succesful': 'successful',
      'begining': 'beginning',
      'untill': 'until',
      'occassion': 'occasion',
      'calender': 'calendar',
      'existance': 'existence'
    };

    function autoCorrectText(text) {
      let correctedText = text;
      Object.keys(spellCheckDictionary).forEach(mistake => {
        const regex = new RegExp(`\\b${mistake}\\b`, 'gi');
        correctedText = correctedText.replace(regex, spellCheckDictionary[mistake]);
      });
      return correctedText;
    }

    function handleEnter(event) {
      if (event.key === 'Enter') {
        handleSearch();
      }
    }

    function updateSendButtons() {
      const emptyInput = document.getElementById('queryInputEmpty');
      const bottomInput = document.getElementById('queryInputBottom');
      const sendBtnEmpty = document.getElementById('sendBtnEmpty');
      const sendBtnBottom = document.getElementById('sendBtnBottom');

      if (emptyInput && emptyInput.value.trim()) {
        sendBtnEmpty.classList.add('send-btn-active');
      } else if (sendBtnEmpty) {
        sendBtnEmpty.classList.remove('send-btn-active');
      }

      if (bottomInput && bottomInput.value.trim()) {
        sendBtnBottom.classList.add('send-btn-active');
      } else if (sendBtnBottom) {
        sendBtnBottom.classList.remove('send-btn-active');
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      const emptyInput = document.getElementById('queryInputEmpty');
      const bottomInput = document.getElementById('queryInputBottom');
      
      if (emptyInput) emptyInput.addEventListener('input
