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
          <div v-if="chatHistory.length > 0" class="history-label">Recent</div>
          <div v-for="chat in chatHistory" :key="chat.id" @click="loadChat(chat)" :class="['history-item', isDarkMode ? 'history-item-dark' : 'history-item-light']">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            <span class="history-title">{{ chat.title }}</span>
          </div>
        </div>
        
        <div :class="['sidebar-footer', isDarkMode ? 'footer-dark' : 'footer-light']">
          <a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="human-chat-btn footer-human-btn">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="human-chat-text">Chat with Human</span>
          </a>
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
          <div v-if="chatHistory.length > 0" class="history-label">Recent</div>
          <div v-for="chat in chatHistory" :key="chat.id" @click="loadChat(chat)" :class="['history-item', isDarkMode ? 'history-item-dark' : 'history-item-light']">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            <span class="history-title">{{ chat.title }}</span>
          </div>
        </div>
        
        <div :class="['sidebar-footer', isDarkMode ? 'footer-dark' : 'footer-light']">
          <a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="human-chat-btn footer-human-btn">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="human-chat-text">Chat with Human</span>
          </a>
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
            <span class="brand-name">AR Solutions</span>
            <span class="model-badge">AI</span>
          </div>
        </div>

        <!-- Chat area -->
        <div class="chat-area">
          <!-- Empty state -->
          <div v-if="messages.length === 0" class="empty-state">
            <h1 :class="['empty-title', isDarkMode ? 'text-white' : 'text-gray-800']">Hey there! How can I help you today?</h1>
            
            <div class="search-container-center">
              <div :class="['search-box', isDarkMode ? 'search-dark' : 'search-light']">
                <input
                  v-model="query"
                  @keyup.enter="handleSearch"
                  type="text"
                  placeholder="Ask anything"
                  :class="['search-input', isDarkMode ? 'input-dark' : 'input-light']"
                />
                <button @click="handleSearch" :class="['send-btn', query.trim() ? 'send-btn-active' : '']">
                  <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                </button>
              </div>
              <div :class="['disclaimer', isDarkMode ? 'text-gray-500' : 'text-gray-400']">
                AR Solutions AI can make mistakes. Check important info.
              </div>
            </div>
          </div>

          <!-- Chat messages -->
          <div v-else class="messages-wrapper">
            <div ref="messagesContainer" class="messages-container">
              <div class="messages-inner">
                <div v-for="(message, index) in messages" :key="index" class="message-group">
                  <div :class="['message-row', message.type === 'user' ? 'message-user' : 'message-bot']">
                    <div class="message-content-wrapper">
                      <div class="message-content">
                        <p class="message-text">{{ message.text }}</p>
                        <a v-if="message.hasButton" :href="message.buttonLink" target="_blank" class="launch-btn">
                          {{ message.buttonText }}
                        </a>
                      </div>
                      <div v-if="message.type === 'bot'" class="message-actions">
                        <button @click="copyMessage(message.text)" class="action-btn" title="Copy">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                        </button>
                        <button @click="likeMessage(index)" class="action-btn" title="Good response">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                          </svg>
                        </button>
                        <button @click="dislikeMessage(index)" class="action-btn" title="Bad response">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"></path>
                          </svg>
                        </button>
                        <button @click="regenerateResponse(index)" class="action-btn" title="Regenerate">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                          </svg>
                        </button>
                        <button @click="shareMessage(message.text)" class="action-btn" title="Share">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
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
                    placeholder="Message AR Solutions AI"
                    :class="['search-input', isDarkMode ? 'input-dark' : 'input-light']"
                  />
                  <button @click="handleSearch" :class="['send-btn', query.trim() ? 'send-btn-active' : '']">
                    <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                  </button>
                </div>
                <div :class="['disclaimer', isDarkMode ? 'text-gray-500' : 'text-gray-400']">
                  AR Solutions AI can make mistakes. Check important info.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatbotPage',
  data() {
    return {
      query: "",
      showMenu: false,
      messages: [],
      isDarkMode: false,
      chatHistory: [],
      currentChatId: null,
      spellCheckDictionary: {
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
      }
    }
  },
  methods: {
    autoCorrectText(text) {
      let correctedText = text;
      Object.keys(this.spellCheckDictionary).forEach(mistake => {
        const regex = new RegExp(`\\b${mistake}\\b`, 'gi');
        correctedText = correctedText.replace(regex, this.spellCheckDictionary[mistake]);
      });
      return correctedText;
    },

    async handleSearch() {
      if (!this.query.trim()) return;
      
      const correctedQuery = this.autoCorrectText(this.query);
      
      if (!this.currentChatId) {
        this.currentChatId = Date.now();
      }
      
      this.messages.push({
        type: 'user',
        text: correctedQuery,
        timestamp: new Date()
      });
      
      const queryLower = correctedQuery.toLowerCase();
      
      const ecommerceKeywords = ['ecommerce', 'e-commerce', 'online store', 'shopify', 'online selling', 'online shop', 'webstore', 'web store', 'online business', 'sell online', 'store', 'shop'];
      const serviceKeywords = ['service', 'services', 'what do you offer', 'what can you do', 'help with', 'provide', 'offering', 'offerings', 'solutions', 'capabilities'];
      
      const isEcommerceQuery = ecommerceKeywords.some(keyword => queryLower.includes(keyword));
      const isServiceQuery = serviceKeywords.some(keyword => queryLower.includes(keyword));
      
      this.query = "";
      
      await this.$nextTick();
      this.scrollToBottom();
      
      setTimeout(() => {
        if (isServiceQuery) {
          this.messages.push({
            type: 'bot',
            text: 'We offer a comprehensive range of services to help grow your business both online and offline! From digital marketing and web development to business consulting and automation solutions, we\'ve got you covered. Download our detailed service deck to explore everything we can do for you! 🚀',
            timestamp: new Date(),
            hasButton: true,
            buttonText: 'Download Service Deck',
            buttonLink: 'https://cdn2.f-cdn.com/files/download/257089198/afterresult.pdf'
          });
        } else if (isEcommerceQuery) {
          this.messages.push({
            type: 'bot',
            text: 'Hi, thank you so much for sharing your requirement! We surely help you with ecommerce store end to end. We are professional team of ecommerce experts. You will make and live store in just 25 days. Start today!',
            timestamp: new Date(),
            hasButton: true,
            buttonText: 'Launch My Store',
            buttonLink: 'https://pages.razorpay.com/pl_R6OXxjqi9EpIhJ/view'
          });
        } else {
          this.messages.push({
            type: 'bot',
            text: 'Oops! We will be soon live for you. 🚀',
            timestamp: new Date()
          });
        }
        this.scrollToBottom();
      }, 500);
    },

    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.messagesContainer) {
          this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
        }
      });
    },

    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
    },

    startNewChat() {
      if (this.messages.length > 0) {
        this.chatHistory.unshift({
          id: this.currentChatId || Date.now(),
          title: this.messages[0].text.substring(0, 30) + (this.messages[0].text.length > 30 ? '...' : ''),
          messages: [...this.messages],
          date: new Date()
        });
      }
      
      this.messages = [];
      this.query = "";
      this.currentChatId = null;
    },

    loadChat(chat) {
      if (this.messages.length > 0 && this.currentChatId !== chat.id) {
        const existingIndex = this.chatHistory.findIndex(c => c.id === this.currentChatId);
        if (existingIndex === -1) {
          this.chatHistory.unshift({
            id: this.currentChatId,
            title: this.messages[0].text.substring(0, 30) + (this.messages[0].text.length > 30 ? '...' : ''),
            messages: [...this.messages],
            date: new Date()
          });
        }
      }
      this.messages = [...chat.messages];
      this.currentChatId = chat.id;
      this.showMenu = false;
      this.scrollToBottom();
    },

    copyMessage(text) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          console.log('Message copied to clipboard');
        }).catch(err => {
          console.error('Failed to copy message: ', err);
        });
      }
    },

    likeMessage(index) {
      console.log('Liked message at index:', index);
    },

    dislikeMessage(index) {
      console.log('Disliked message at index:', index);
    },

    regenerateResponse(index) {
      console.log('Regenerating response at index:', index);
    },

    shareMessage(text) {
      if (navigator.share) {
        navigator.share({
          title: 'AR Solutions AI Response',
          text: text
        });
      } else {
        this.copyMessage(text);
      }
    }
  }
}
</script>

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
  color: #6b7280;
}

.history-item {
  display: flex;
  align-items: center
