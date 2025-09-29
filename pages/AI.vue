<script setup>
import { ref, computed } from "vue";

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
  
  query.value = "";
  
  setTimeout(() => {
    messages.value.push({
      type: 'bot',
      text: 'Oops! We will be soon live for you. 🚀',
      timestamp: new Date()
    });
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
  <div :class="['min-h-screen flex transition-colors duration-300', isDarkMode ? 'bg-[#212121] text-white' : 'bg-white text-gray-800']">
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
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <div :class="['flex items-center justify-between px-4 md:px-6 py-2.5 border-b transition-colors duration-300', isDarkMode ? 'border-gray-700' : 'border-gray-200']">
        <div class="flex items-center gap-2 ml-12 md:ml-0">
          <span class="text-xs font-semibold">AR Solutions</span>
        </div>
        <a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="px-2.5 py-1.5 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:opacity-90 transition flex items-center gap-1.5">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
          </svg>
          <span class="hidden sm:inline">Chat with Human</span>
          <span class="sm:hidden">Human</span>
        </a>
      </div>

      <!-- Chat area -->
      <div class="flex-1 overflow-y-auto px-3 md:px-4 pb-32">
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center min-h-full">
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
      <div :class="['fixed bottom-0 left-0 md:left-64 right-0 pb-4 md:pb-6 pt-8 md:pt-12 transition-colors duration-300', isDarkMode ? 'bg-gradient-to-t from-[#212121] via-[#212121] to-transparent' : 'bg-gradient-to-t from-white via-white to-transparent']">
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

@media (max-width: 768px) {
  .fixed.bottom-0 {
    left: 0;
  }
}
</style>
