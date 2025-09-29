<script setup>
import { ref } from "vue";

const query = ref("");
const showMenu = ref(false);
const messages = ref([]);
const isDarkMode = ref(true);

function handleSearch() {
  if (!query.value.trim()) return;
  
  messages.value.push({
    type: 'user',
    text: query.value,
    timestamp: new Date()
  });
  
  const userQuery = query.value;
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
  messages.value = [];
  query.value = "";
}
</script>

<template>
  <div :class="['min-h-screen flex transition-colors duration-300', isDarkMode ? 'bg-[#212121] text-white' : 'bg-white text-gray-900']">
    <!-- Sidebar -->
    <div :class="['hidden md:flex w-64 flex-col border-r transition-colors duration-300', isDarkMode ? 'bg-[#171717] border-gray-700' : 'bg-gray-50 border-gray-200']">
      <div class="p-4">
        <button @click="startNewChat" :class="['w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg border transition', isDarkMode ? 'border-gray-600 hover:bg-[#2A2A2A]' : 'border-gray-300 hover:bg-gray-100']">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>New chat</span>
        </button>
      </div>
      
      <div class="flex-1 overflow-y-auto px-3">
        <div :class="['text-xs px-3 py-2 font-medium', isDarkMode ? 'text-gray-400' : 'text-gray-500']">Recent</div>
      </div>
      
      <div :class="['p-3 border-t transition-colors duration-300', isDarkMode ? 'border-gray-700' : 'border-gray-200']">
        <button @click="toggleTheme" :class="['w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition mb-2', isDarkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100']">
          <svg v-if="isDarkMode" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
          <span>{{ isDarkMode ? 'Light' : 'Dark' }} mode</span>
        </button>
        <button :class="['w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition', isDarkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100']">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span>Account</span>
        </button>
      </div>
    </div>

    <!-- Mobile menu toggle -->
    <button @click="showMenu = !showMenu" :class="['md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg transition', isDarkMode ? 'bg-[#2A2A2A] hover:bg-[#3A3A3A]' : 'bg-gray-200 hover:bg-gray-300']">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <div :class="['flex items-center justify-between px-4 py-3 border-b transition-colors duration-300', isDarkMode ? 'border-gray-700' : 'border-gray-200']">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">AR Solutions</span>
          <button :class="['p-1 rounded transition', isDarkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100']">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
        <button class="px-3 py-1.5 text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:opacity-90 transition flex items-center gap-2">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          Upgrade to Go
        </button>
      </div>

      <!-- Chat area -->
      <div class="flex-1 overflow-y-auto px-4 pb-32">
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center min-h-full">
          <div class="w-full max-w-3xl">
            <h1 class="text-2xl md:text-3xl font-normal text-center mb-12">
              Ready when you are.
            </h1>
          </div>
        </div>
        
        <div v-else class="max-w-3xl mx-auto py-8 space-y-6">
          <div v-for="(message, index) in messages" :key="index" :class="['flex gap-4', message.type === 'user' ? 'justify-end' : 'justify-start']">
            <div v-if="message.type === 'bot'" :class="['w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', isDarkMode ? 'bg-purple-600' : 'bg-purple-500']">
              <span class="text-white text-sm font-semibold">AR</span>
            </div>
            <div :class="['max-w-[80%] rounded-2xl px-4 py-3', message.type === 'user' ? (isDarkMode ? 'bg-[#2A2A2A]' : 'bg-gray-200') : (isDarkMode ? 'bg-[#2A2A2A]' : 'bg-gray-100')]">
              <p class="text-sm md:text-base">{{ message.text }}</p>
            </div>
            <div v-if="message.type === 'user'" :class="['w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', isDarkMode ? 'bg-blue-600' : 'bg-blue-500']">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Input area -->
      <div :class="['fixed bottom-0 left-0 md:left-64 right-0 pb-6 pt-12 transition-colors duration-300', isDarkMode ? 'bg-gradient-to-t from-[#212121] via-[#212121] to-transparent' : 'bg-gradient-to-t from-white via-white to-transparent']">
        <div class="max-w-3xl mx-auto px-4">
          <div class="relative">
            <div :class="['flex items-center rounded-3xl shadow-lg border focus-within:border-gray-500 transition', isDarkMode ? 'bg-[#2A2A2A] border-gray-600' : 'bg-white border-gray-300']">
              <button :class="['pl-4 pr-2 py-3 transition', isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700']">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>
              
              <input
                v-model="query"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Ask anything"
                :class="['flex-1 bg-transparent outline-none py-3 px-2 text-sm md:text-base', isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500']"
              />
              
              <button :class="['px-3 py-3 transition', isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700']">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                </svg>
              </button>
              
              <button :class="['pr-4 pl-2 py-3 transition', isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700']">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div :class="['text-center mt-3 text-xs', isDarkMode ? 'text-gray-500' : 'text-gray-400']">
            AR Solutions can make mistakes. Check important info.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #3A3A3A;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4A4A4A;
}

@media (max-width: 768px) {
  .fixed.bottom-0 {
    left: 0;
  }
}
</style>
