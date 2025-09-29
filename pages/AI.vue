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
        text: 'Hi there! Thank you for sharing your requirement. We provide complete eCommerce store solutions, from setup to launch, with your store ready in just 25 days. For more details, including services, pricing, and process, please click on Launch My Store.',
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
  <div :class="['chat-container h-screen flex font-sans', isDarkMode ? 'bg-[#212121] text-white' : 'bg-white text-[#2D2D2D]']">
    <!-- Sidebar -->
    <div :class="['hidden md:flex w-64 flex-col transition-colors', isDarkMode ? 'bg-[#171717]' : 'bg-[#F9F9F9]']">
      <div class="p-2">
        <button @click="startNewChat" :class="['w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition', isDarkMode ? 'border border-white/20 hover:bg-white/10' : 'border border-black/10 hover:bg-black/5']">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>New chat</span>
        </button>
      </div>
      
      <div class="flex-1 overflow-y-auto px-2">
        <div v-if="chatHistory.length > 0">
          <div :class="['text-xs px-3 py-3 font-semibold', isDarkMode ? 'text-gray-400' : 'text-gray-600']">Chats</div>
          <div v-for="chat in chatHistory" :key="chat.id" @click="loadChat(chat)" :class="['px-3 py-2.5 text-sm rounded-lg cursor-pointer transition mb-1', isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5']">
            <div class="font-medium truncate">{{ chat.title }}</div>
          </div>
        </div>
      </div>
      
      <div :class="['p-2 border-t', isDarkMode ? 'border-white/10' : 'border-black/10']">
        <button @click="toggleTheme" :class="['w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition', isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5']">
          <svg v-if="isDarkMode" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
          <span>{{ isDarkMode ? 'Light' : 'Dark' }} mode</span>
        </button>
      </div>
    </div>

    <!-- Mobile Sidebar -->
    <div v-if="showMenu" @click="showMenu = false" class="md:hidden fixed inset-0 bg-black/50 z-40"></div>
    <div :class="['md:hidden fixed top-0 left-0 bottom-0 w-64 z-50 flex flex-col transition-transform duration-300', showMenu ? 'translate-x-0' : '-translate-x-full', isDarkMode ? 'bg-[#171717]' : 'bg-[#F9F9F9]']">
      <div class="p-2">
        <button @click="showMenu = false; startNewChat()" :class="['w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition', isDarkMode ? 'border border-white/20 hover:bg-white/10' : 'border border-black/10 hover:bg-black/5']">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>New chat</span>
        </button>
      </div>
      
      <div class="flex-1 overflow-y-auto px-2">
        <div v-if="chatHistory.length > 0">
          <div :class="['text-xs px-3 py-3 font-semibold', isDarkMode ? 'text-gray-400' : 'text-gray-600']">Chats</div>
          <div v-for="chat in chatHistory" :key="chat.id" @click="loadChat(chat)" :class="['px-3 py-2.5 text-sm rounded-lg cursor-pointer transition mb-1', isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5']">
            <div class="font-medium truncate">{{ chat.title }}</div>
          </div>
        </div>
      </div>
      
      <div :class="['p-2 border-t', isDarkMode ? 'border-white/10' : 'border-black/10']">
        <button @click="toggleTheme" :class="['w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition', isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5']">
          <svg v-if="isDarkMode" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
          <span>{{ isDarkMode ? 'Light' : 'Dark' }} mode</span>
        </button>
      </div>
    </div>

    <!-- Mobile menu toggle -->
    <button @click="showMenu = !showMenu" :class="['md:hidden fixed top-3 left-3 z-30 p-2 rounded-md transition', isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10']">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <div :class="['flex items-center justify-between px-4 py-3 border-b', isDarkMode ? 'border-white/10' : 'border-black/10']">
        <div class="flex items-center gap-2 ml-12 md:ml-0">
          <span class="text-lg font-semibold">AR Solutions</span>
        </div>
        <a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="px-3 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
          </svg>
          <span class="hidden sm:inline">Chat with Human</span>
        </a>
      </div>

      <!-- Main content area -->
      <div class="flex-1 relative overflow-hidden">
        <!-- Empty state -->
        <div v-if="messages.length === 0" class="h-full flex flex-col items-center justify-center px-4">
          <div class="w-full max-w-3xl flex flex-col items-center">
            <h1 class="text-3xl md:text-4xl font-medium text-center mb-12">
              What can I help with?
            </h1>
            
            <div class="w-full max-w-2xl">
              <div :class="['flex items-center rounded-3xl shadow-lg border transition', isDarkMode ? 'bg-[#2F2F2F] border-white/10' : 'bg-white border-black/10']">
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
                  :class="['flex-1 bg-transparent outline-none py-3 px-2 text-base', isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500']"
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
              
              <div :class="['text-center mt-3 text-xs', isDarkMode ? 'text-gray-500' : 'text-gray-400']">
                AR Solutions can make mistakes. Check important info.
              </div>
            </div>
          </div>
        </div>

        <!-- Chat messages -->
        <div v-else class="h-full flex flex-col">
          <div class="flex-1 overflow-y-auto pb-48">
            <div class="max-w-3xl mx-auto px-4 py-8">
              <div v-for="(message, index) in messages" :key="index" class="mb-8">
                <!-- User message -->
                <div v-if="message.type === 'user'" class="flex justify-end mb-4">
                  <div :class="['max-w-[85%] rounded-3xl px-5 py-3', isDarkMode ? 'bg-[#2F2F2F]' : 'bg-[#F4F4F4]']">
                    <p class="text-base leading-relaxed">{{ message.text }}</p>
                  </div>
                </div>
                
                <!-- Bot message -->
                <div v-else class="mb-4">
                  <div class="flex gap-4 mb-3">
                    <div :class="['w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', isDarkMode ? 'bg-purple-600' : 'bg-purple-500']">
                      <span class="text-white text-sm font-semibold">AR</span>
                    </div>
                    <div class="flex-1">
                      <p class="text-base leading-relaxed mb-3">{{ message.text }}</p>
                      
                      <a v-if="message.hasButton" :href="message.buttonLink" target="_blank" :class="['inline-block px-4 py-2 text-sm font-medium rounded-lg transition-all hover:opacity-90', isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white']">
                        {{ message.buttonText }}
                      </a>
                      
                      <!-- Action buttons -->
                      <div class="flex items-center gap-2 mt-4">
                        <button :class="['p-2 rounded-lg transition', isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5']" title="Good response">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                          </svg>
                        </button>
                        <button :class="['p-2 rounded-lg transition', isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5']" title="Bad response">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"></path>
                          </svg>
                        </button>
                        <a href="https://api.whatsapp.com/send/?phone=919050983530" target="_blank" :class="['p-2 rounded-lg transition', isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5']" title="WhatsApp">
                          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                          </svg>
                        </a>
                        <a href="tel:+919050983530" :class="['p-2 rounded-lg transition', isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5']" title="Call">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Help text -->
                  <div class="ml-12 mt-4">
                    <p :class="['text-sm', isDarkMode ? 'text-gray-400' : 'text-gray-600']">
                      Need more help? Please click on <span class="font-semibold">Chat with Human</span> button on top right, or call us directly for personalized assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom input -->
          <div :class="['absolute bottom-0 left-0 right-0 pb-6 pt-12 transition-colors', isDarkMode ? 'bg-gradient-to-t from-[#212121] via-[#212121] to-transparent' : 'bg-gradient-to-t from-white via-white to-transparent']">
            <div class="max-w-3xl mx-auto px-4">
              <div :class="['flex items-center rounded-3xl shadow-lg border transition', isDarkMode ? 'bg-[#2F2F2F] border-white/10' : 'bg-white border-black/10']">
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
                  :class="['flex-1 bg-transparent outline-none py-3 px-2 text-base', isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500']"
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
              
              <div :class="['text-center mt-3 text-xs', isDarkMode ? 'text-gray-500' : 'text-gray-400']">
                AR Solutions can make mistakes. Check important info.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-
