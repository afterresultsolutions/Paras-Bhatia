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
                      <div v-if="message.type === 'bot'" :class="['avatar', 'avatar-bot']">
                        <div class="custom-logo">
                          <svg viewBox="0 0 200 200" class="avatar-icon">
                            <defs>
                              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#FFB347"/>
                                <stop offset="25%" style="stop-color:#FF6B9D"/>
                                <stop offset="50%" style="stop-color:#C147E9"/>
                                <stop offset="75%" style="stop-color:#4285F4"/>
                                <stop offset="100%" style="stop-color:#00CED1"/>
                              </linearGradient>
                              <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" style="stop-color:#1E3A8A"/>
                                <stop offset="50%" style="stop-color:#7C3AED"/>
                                <stop offset="100%" style="stop-color:#EC4899"/>
                              </linearGradient>
                            </defs>
                            <path d="M50 20 Q30 20 20 40 Q20 60 30 70 L30 120 Q30 140 50 140 L90 140 Q110 140 120 130 Q130 120 130 100 L130 70 Q140 60 140 40 Q140 20 120 20 Z" fill="url(#grad1)"/>
                            <path d="M80 180 Q60 180 50 160 Q50 140 60 130 L60 80 Q60 60 80 60 L120 60 Q140 60 150 70 Q160 80 160 100 L160 130 Q170 140 170 160 Q170 180 150 180 Z" fill="url(#grad2)"/>
                            <circle cx="100" cy="100" r="30" fill="white"/>
                          </svg>
                        </div>
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
  min-height: 0;
}

.empty-title {
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 40px;
  text-align: center;
}

.search-container-center {
  width: 100%;
  max-width: 600px;
  position: sticky;
  bottom: 0;
}

.search-box {
  display: flex;
  align-items: center;
  border: 1px solid;
  border-radius: 24px;
  padding: 4px 4px 4px 16px;
  transition: border-color 0.2s;
  width: 100%;
  max-width: 100%;
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
  overflow: hidden;
}

.avatar-bot {
  background: transparent;
  padding: 2px;
}

.avatar-user {
  background-color: #5436da;
}

.avatar-icon {
  width: 28px;
  height: 28px;
  color: white;
}

.custom-logo {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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

  .avatar {
    width: 28px;
    height: 28px;
  }

  .avatar-icon {
    width: 24px;
    height: 24px;
  }

  .message-text {
    font-size: 14px;
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

  .avatar {
    width: 24px;
    height: 24px;
  }

  .avatar-icon {
    width: 20px;
    height: 20px;
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

/* Landscape mobile improvements */
@media (max-width: 768px) and (orientation: landscape) {
  .empty-state {
    padding-top: 20px;
  }

  .empty-title {
    font-size: 20px;
    margin-bottom: 20px;
  }
}

/* Touch improvements */
@media (hover: none) and (pointer: coarse) {
  .search-box {
    padding: 6px 6px 6px 16px;
  }

  .search-input {
    padding: 14px 8px;
    font-size: 16px; /* Prevents zoom on iOS */
  }

  .send-btn {
    width: 36px;
    height: 36px;
  }

  .action-btn {
    padding: 8px;
    min-height: 36px;
    min-width: 36px;
  }

  .human-chat-btn {
    padding: 10px 14px;
    min-height: 40px;
  }

  .mobile-menu-btn {
    padding: 10px;
    min-height: 40px;
    min-width: 40px;
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

}
</style>
