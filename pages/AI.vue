<script setup>
import { ref, nextTick } from "vue";

const query = ref("");
const showMenu = ref(false);
const messages = ref([]);
const isDarkMode = ref(true);
const chatHistory = ref([]);
const currentChatId = ref(null);
const messagesContainer = ref(null);

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

async function handleSearch() {
  if (!query.value.trim()) return;
  
  const correctedQuery = autoCorrectText(query.value);
  
  if (!currentChatId.value) {
    currentChatId.value = Date.now();
  }
  
  messages.value.push({
    type: 'user',
    text: correctedQuery,
    timestamp: new Date()
  });
  
  const queryLower = correctedQuery.toLowerCase();
  const ecommerceKeywords = ['ecommerce', 'e-commerce', 'online store', 'shopify', 'online selling', 'online shop', 'webstore', 'web store', 'online business', 'sell online', 'store', 'shop'];
  const isEcommerceQuery = ecommerceKeywords.some(keyword => queryLower.includes(keyword));
  
  query.value = "";
  
  await nextTick();
  scrollToBottom();
  
  setTimeout(() => {
    if (isEcommerceQuery) {
      messages.value.push({
        type: 'bot',
        text: 'Hi, thank you so much for sharing your requirement! We surely help you with ecommerce store end to end. We are professional team of ecommerce experts. You will make and live store in just 25 days. Start today!',
        timestamp: new Date(),
        hasButton: true,
        buttonText: 'Launch My Store',
        buttonLink: 'https://pages.razorpay.com/pl_R6OXxjqi9EpIhJ/view'
      });
    } else {
      messages.value.push({
        type: 'bot',
        text: 'Oops! We will be soon live for you. 🚀',
        timestamp: new Date()
      });
    }
    scrollToBottom();
  }, 500);
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
}

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
}

function startNewChat() {
  if (messages.value.length > 0) {
    chatHistory.value.unshift({
      id: currentChatId.value || Date.now(),
      title: messages.value[0].text.substring(0, 30) + (messages.value[0].text.length > 30 ? '...' : ''),
      messages: [...messages.value],
      date: new Date()
    });
  }
  
  messages.value = [];
  query.value = "";
  currentChatId.value = null;
}

function loadChat(chat) {
  if (messages.value.length > 0 && currentChatId.value !== chat.id) {
    const existingIndex = chatHistory.value.findIndex(c => c.id === currentChatId.value);
    if (existingIndex === -1) {
      chatHistory.value.unshift({
        id: currentChatId.value,
        title: messages.value[0].text.substring(0, 30) + (messages.value[0].text.length > 30 ? '...' : ''),
        messages: [...messages.value],
        date: new Date()
      });
    }
  }
  messages.value = [...chat.messages];
  currentChatId.value = chat.id;
  showMenu.value = false;
  scrollToBottom();
}

function formatDate(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return new Date(date).toLocaleDateString();
}
</script>

<template>
  <div :class="['chat-wrapper', isDarkMode ? 'dark-mode' : 'light-mode']">
    <div class="chat-container">
      <!-- Sidebar for Desktop -->
      <div :class="['sidebar', isDarkMode ? 'sidebar-dark' : 'sidebar-light']">
        <div class="sidebar-header">
          <button @click="startNewChat" :class="['new-chat-btn', isDarkMode ? 'btn-dark' : 'btn-light']">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>New chat</span>
          </button>
        </div>
        
        <div class="sidebar-content">
          <div v-if="chatHistory.length > 0" :class="['history-label', isDarkMode ? 'text-gray-500' : 'text-gray-600']">Recent</div>
          <div v-for="chat in chatHistory" :key="chat.id" @click="loadChat(chat)" :class="['history-item', isDarkMode ? 'history-item-dark' : 'history-item-light']">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            <span class="history-title">{{ chat.title }}</span>
          </div>
        </div>
        
        <div :class="['sidebar-footer', isDarkMode ? 'footer-dark' : 'footer-light']">
          <button @click="toggleTheme" :class="['footer-btn', isDarkMode ? 'btn-dark' : 'btn-light']">
            <svg v-if="isDarkMode" class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
          <button :class="['footer-btn', isDarkMode ? 'btn-dark' : 'btn-light']">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Sidebar -->
      <div v-if="showMenu" @click="showMenu = false" class="mobile-overlay"></div>
      <div :class="['mobile-sidebar', showMenu ? 'mobile-sidebar-open' : '', isDarkMode ? 'sidebar-dark' : 'sidebar-light']">
        <div class="sidebar-header">
          <button @click="showMenu = false; startNewChat()" :class="['new-chat-btn', isDarkMode ? 'btn-dark' : 'btn-light']">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>New chat</span>
          </button>
        </div>
        
        <div class="sidebar-content">
          <div v-if="chatHistory.length > 0" :class="['history-label', isDarkMode ? 'text-gray-500' : 'text-gray-600']">Recent</div>
          <div v-for="chat in chatHistory" :key="chat.id" @click="loadChat(chat)" :class="['history-item', isDarkMode ? 'history-item-dark' : 'history-item-light']">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            <span class="history-title">{{ chat.title }}</span>
          </div>
        </div>
        
        <div :class="['sidebar-footer', isDarkMode ? 'footer-dark' : 'footer-light']">
          <button @click="toggleTheme" :class="['footer-btn', isDarkMode ? 'btn-dark' : 'btn-light']">
            <svg v-if="isDarkMode" class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu toggle -->
      <button @click="showMenu = !showMenu" :class="['mobile-menu-btn', isDarkMode ? 'btn-dark' : 'btn-light']">
        <svg class="icon-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <!-- Main content -->
      <div class="main-content">
        <!-- Header -->
        <div :class="['chat-header', isDarkMode ? 'header-dark' : 'header-light']">
          <div class="header-title">
            <span class="brand-name">ChatGPT</span>
            <span class="model-badge">4</span>
          </div>
          <a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="human-chat-btn">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="human-chat-text">Chat with Human</span>
          </a>
        </div>

        <!-- Chat area -->
        <div class="chat-area">
          <!-- Empty state -->
          <div v-if="messages.length === 0" class="empty-state">
            <h1 :class="['empty-title', isDarkMode ? 'text-white' : 'text-gray-800']">What can I help with?</h1>
            
            <div class="search-container-center">
              <div :class="['search-box', isDarkMode ? 'search-dark' : 'search-light']">
                <input
                  v-model="query"
                  @keyup.enter="handleSearch"
                  type="text"
                  placeholder="Message ChatGPT"
                  :class="['search-input', isDarkMode ? 'input-dark' : 'input-light']"
                />
                <button @click="handleSearch" :class="['send-btn', query.trim() ? 'send-btn-active' : '']">
                  <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                </button>
              </div>
              <div :class="['disclaimer', isDarkMode ? 'text-gray-500' : 'text-gray-400']">
                ChatGPT can make mistakes. Check important info.
              </div>
            </div>
          </div>

          <!-- Chat messages -->
          <div v-else class="messages-wrapper">
            <div ref="messagesContainer" class="messages-container">
              <div class="messages-inner">
                <div v-for="(message, index) in messages" :key="index" class="message-group">
                  <div :class="['message-row', message.type === 'user' ? 'message-user' : 'message-bot']">
                    <div class="message-avatar">
                      <div v-if="message.type === 'bot'" :class="['avatar', isDarkMode ? 'avatar-bot-dark' : 'avatar-bot-light']">
                        <svg class="avatar-icon" fill="currentColor" viewBox="0 0 41 41">
                          <path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"></path>
                        </svg>
                      </div>
                      <div v-else :class="['avatar', 'avatar-user']">
                        <svg class="avatar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="message-content-wrapper">
                      <div class="message-content">
                        <p class="message-text">{{ message.text }}</p>
                        <a v-if="message.hasButton" :href="message.buttonLink" target="_blank" class="launch-btn">
                          {{ message.buttonText }}
                        </a>
                      </div>
                      <div v-if="message.type === 'bot'" class="message-actions">
                        <button class="action-btn" title="Good response">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                          </svg>
                        </button>
                        <button class="action-btn" title="Bad response">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"></path>
                          </svg>
                        </button>
                        <button class="action-btn" title="Copy">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                        </button>
                        <button class="action-btn" title="Regenerate">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                          </svg>
                        </button>
                        <a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="action-btn" title="WhatsApp">
                          <svg class="icon-xs" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                          </svg>
                        </a>
                        <a href="tel:+919050983530" class="action-btn" title="Call">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                        </a>
                      </div>
                      <div v-if="message.type === 'bot'" :class="['help-message', isDarkMode ? 'text-gray-400' : 'text-gray-500']">
                        Need more help? Click "Chat with Human" button in the top right corner.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom input -->
            <div class="input-area">
              <div class="input-container">
                <div :class="['search-box', isDarkMode ? 'search-dark' : 'search-light']">
                  <input
                    v-model="query"
                    @keyup.enter="handleSearch"
                    type="text"
                    placeholder="Message ChatGPT"
                    :class="['search-input', isDarkMode ? 'input-dark' : 'input-light']"
                  />
                  <button @click="handleSearch" :class="['send-btn', query.trim() ? 'send-btn-active' : '']">
                    <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                  </button>
                </div>
                <div :class="['disclaimer', isDarkMode ? 'text-gray-500' : 'text-gray-400']">
                  ChatGPT can make mistakes. Check important info.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.chat-wrapper {
  width: 100%;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  transition: background-color 0.2s, color 0.2s;
}

.dark-mode {
  background-color: #212121;
  color: #ececec;
}

.light-mode {
  background-color: #ffffff;
  color: #2f2f2f;
}

.chat-container {
  display: flex;
  height: 100vh;
  position: relative;
}

/* Sidebar */
.sidebar {
  width: 260px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid;
  transition: background-color 0.2s;
}

.sidebar-dark {
  background-color: #171717;
  border-color: #363636;
}

.sidebar-light {
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

.history-item-dark:hover {
  background-color: #2f2f2f;
}

.history-item-light:hover {
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
}

/* Mobile sidebar */
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

.mobile-sidebar-open {
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

/* Main content */
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

/* Chat area */
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
}

.empty-title {
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 48px;
  text-align: center;
}

.search-container-center {
  width: 100%;
  max-width: 768px;
}

.search-box {
  display: flex;
  align-items: center;
  border: 1px solid;
  border-radius: 24px;
  padding: 4px 4px 4px 16px;
  transition: border-color 0.2s;
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

.send-btn-active {
  background-color: #ececec;
  color: #2f2f2f;
  cursor: pointer;
}

.send-btn-active:hover {
  background-color: #d9d9d9;
}

.disclaimer {
  text-align: center;
  margin-top: 12px;
  font-size: 12px;
}

/* Messages */
.messages-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
}

.messages-inner {
  max-width: 768px;
  margin: 0 auto;
  padding: 24px 20px;
}

.message-group {
  margin-bottom: 24px;
}

.message-row {
  display: flex;
  gap: 16px;
}

.message-avatar {
  flex-shrink: 0;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-bot-dark {
  background-color: #19c37d;
}

.avatar-bot-light {
  background-color: #19c37d;
}

.avatar-user {
  background-color: #5436da;
}

.avatar-icon {
  width: 20px;
  height: 20px;
  color: white;
}

.message-content-wrapper {
  flex: 1;
  min-width: 0;
}

.message-content {
  margin-bottom: 8px;
}

.message-text {
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
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

.help-message {
  font-size: 13px;
  margin-top: 12px;
  line-height: 1.5;
}

/* Input area */
.input-area {
  padding: 20px;
  border-top: 1px solid transparent;
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

/* Icons */
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

/* Scrollbar */
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

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }

  .header-title {
    margin-left: 48px;
  }

  .empty-title {
    font-size: 24px;
  }

  .messages-inner {
    padding: 20px 16px;
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
}

.text-gray-400 {
  color: #9ca3af;
}

.text-gray-500 {
  color: #6b7280;
}

.text-gray-600 {
  color: #4b5563;
}

.text-white {
  color: white;
}

.text-gray-800 {
  color: #1f2937;
}
</style>
