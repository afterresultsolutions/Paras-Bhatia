<script setup>
import { ref } from "vue";

const query = ref("");
const showMenu = ref(false);
const messages = ref([]);
const isDarkMode = ref(false);
const chatHistory = ref([]);
const currentChatId = ref(null);

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

function handleSearch() {
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
  }, 500);
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
  if (messages.value.length > 0) {
    startNewChat();
  }
  messages.value = [...chat.messages];
  currentChatId.value = chat.id;
  showMenu.value = false;
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
  <div :class="['chat-container h-screen flex transition-colors duration-300', isDarkMode ? 'bg-[#212121] text-white' : 'bg-white text-gray-800']">
    <!-- Sidebar for Desktop -->
    <div :class="['hidden md:flex w-64 flex-col border-r transition-colors duration-300', isDarkMode ? 'bg-[#171717] border-gray-700' : 'bg-gray-50 border-gray-200']">
      <div class="p-3">
        <button @click="startNewChat" :class="['w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg border transition', isDarkMode ? 'border-gray-600 hover:bg-[#2A2A2A]' : 'border-gray-300 hover:bg-gray-100']">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>New chat</span>
        </button>
      </div>
      
      <div class="flex-1 overflow-y-auto px-3">
        <div v-if="chatHistory.length > 0" :class="['text-xs px-3 py-2 font-medium', isDarkMode ? 'text-gray-400' : 'text-gray-500']">History</div>
        <div v-for="chat in chatHistory" :key="chat.id" @click="loadChat(chat)" :class="['px-3 py-2 text-xs rounded-lg cursor-pointer transition mb-1', isDarkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-200']">
          <div class="font-medium truncate">{{ chat.title }}</div>
          <div :class="['text-xs mt-0.5', isDarkMode ? 'text-gray-500' : 'text-gray-400']">{{ formatDate(chat.date) }}</div>
        </div>
      </div>
      
      <div :class="['p-3 border-t transition-colors duration-300', isDarkMode ? 'border-gray-700' : 'border-gray-200']">
        <button @click="toggleTheme" :class="['w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition mb-2', isDarkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100']">
          <svg v-if="isDarkMode" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
          <span>{{ isDarkMode ? 'Light' : 'Dark' }} mode</span>
        </button>
        <button :class="['w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition', isDarkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100']">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span>Account</span>
        </button>
      </div>
    </div>

    <!-- Mobile Sidebar -->
    <div v-if="showMenu" @click="showMenu = false" class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"></div>
    <div :class="['md:hidden fixed top-0 left-0 bottom-0 w-64 z-50 flex flex-col transition-transform duration-300', showMenu ? 'translate-x-0' : '-translate-x-full', isDarkMode ? 'bg-[#171717]' : 'bg-gray-50']">
      <div class="p-3 border-b" :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'">
        <button @click="showMenu = false; startNewChat()" :class="['w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg border transition', isDarkMode ? 'border-gray-600 hover:bg-[#2A2A2A]' : 'border-gray-300 hover:bg-gray-100']">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>New chat</span>
        </button>
      </div>
      
      <div class="flex-1 overflow-y-auto px-3">
        <div v-if="chatHistory.length > 0" :class="['text-xs px-3 py-2 font-medium', isDarkMode ? 'text-gray-400' : 'text-gray-500']">History</div>
        <div v-for="chat in chatHistory" :key="chat.id" @click="loadChat(chat)" :class="['px-3 py-2 text-xs rounded-lg cursor-pointer transition mb-1', isDarkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-200']">
          <div class="font-medium truncate">{{ chat.title }}</div>
          <div :class="['text-xs mt-0.5', isDarkMode ? 'text-gray-500' : 'text-gray-400']">{{ formatDate(chat.date) }}</div>
        </div>
      </div>
      
      <div :class="['p-3 border-t', isDarkMode ? 'border-gray-700' : 'border-gray-200']">
        <button @click="toggleTheme" :class="['w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition mb-2', isDarkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100']">
          <svg v-if="isDarkMode" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
          <span>{{ isDarkMode ? 'Light' : 'Dark' }} mode</span>
        </button>
      </div>
    </div>

    <!-- Mobile menu toggle -->
    <button @click="showMenu = !showMenu" :class="['md:hidden fixed top-3 left-3 z-30 p-2 rounded-lg transition', isDarkMode ? 'bg-[#2A2A2A] hover:bg-[#3A3A3A]' : 'bg-gray-100 hover:bg-gray-200']">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Main content -->
    <div class="flex-1 flex flex-col relative">
      <!-- Header -->
      <div :class="['flex items-center justify-between px-4 md:px-6 py-2.5 border-b transition-colors duration-300', isDarkMode ? 'border-gray-700' : 'border-gray-200']">
        <div class="flex items-center gap-2 ml-12 md:ml-0">
          <span class="text-xs font-semibold">AR Solutions</span>
        </div>
        <a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="px-2.5 py-1.5 text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:opacity-90 transition flex items-center gap-1.5">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <svg class="w-3 h-3 absolute ml-1.5 mt-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          <span class="hidden sm:inline ml-2">Chat with Human</span>
          <span class="sm:hidden ml-2">Human</span>
        </a>
      </div>

      <!-- Chat area -->
      <div class="flex-1 overflow-y-auto px-3 md:px-4" style="padding-bottom: 150px;">
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full">
          <div class="w-full max-w-2xl px-4">
            <h1 class="text-xl md:text-2xl font-normal text-center mb-8 md:mb-12">
              Ready when you are.
            </h1>
          </div>
        </div>
        
        <div v-else class="max-w-2xl mx-auto py-6 md:py-8 space-y-4">
          <div v-for="(message, index) in messages" :key="index" :class="['flex gap-2 md:gap-3', message.type === 'user' ? 'justify-end' : 'justify-start']">
            <div v-if="message.type === 'bot'" :class="['w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0', isDarkMode ? 'bg-purple-600' : 'bg-purple-500']">
              <span class="text-white text-xs font-semibold">AR</span>
            </div>
            <div :class="['max-w-[75%] md:max-w-[80%] rounded-2xl px-3 py-2 md:px-4 md:py-2.5', message.type === 'user' ? (isDarkMode ? 'bg-[#2A2A2A]' : 'bg-gray-100') : (isDarkMode ? 'bg-[#2A2A2A]' : 'bg-gray-50')]">
              <p class="text-xs md:text-sm leading-relaxed">{{ message.text }}</p>
              <a v-if="message.hasButton" :href="message.buttonLink" target="_blank" :class="['inline-block mt-3 px-4 py-2 text-xs font-medium rounded-full transition-all hover:scale-105', isDarkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md']">
                {{ message.buttonText }}
              </a>
            </div>
            <div v-if="message.type === 'user'" :class="['w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0', isDarkMode ? 'bg-blue-600' : 'bg-blue-500']">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Input area -->
      <div :class="['absolute bottom-0 left-0 right-0 pb-4 md:pb-6 pt-8 md:pt-12 transition-colors duration-300', isDarkMode ? 'bg-gradient-to-t from-[#212121] via-[#212121] to-transparent' : 'bg-gradient-to-t from-white via-white to-transparent']">
        <div class="max-w-2xl mx-auto px-3 md:px-4">
          <div class="relative">
            <div :class="['flex items-center rounded-full md:rounded-3xl shadow-lg border focus-within:border-gray-400 transition', isDarkMode ? 'bg-[#2A2A2A] border-gray-600' : 'bg-white border-gray-300']">
              <button :class="['pl-3 md:pl-4 pr-1 md:pr-2 py-2.5 md:py-3 transition', isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700']">
                <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>
              
              <input
                v-model="query"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Ask anything"
                :class="['flex-1 bg-transparent outline-none py-2.5 md:py-3 px-2 text-xs md:text-sm', isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500']"
              />
              
              <button :class="['px-2 md:px-3 py-2.5 md:py-3 transition', isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700']">
                <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                </svg>
              </button>
              
              <button :class="['pr-3 md:pr-4 pl-1 md:pl-2 py-2.5 md:py-3 transition', isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700']">
                <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div :class="['text-center mt-2 md:mt-3 text-xs', isDarkMode ? 'text-gray-500' : 'text-gray-400']">
            AR Solutions can make mistakes. Check important info.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  position: relative;
  isolation: isolate;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #777;
}
</style>
