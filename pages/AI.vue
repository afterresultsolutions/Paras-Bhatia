<script setup>
import { ref } from "vue";

const query = ref("");
const showMenu = ref(false);

function handleSearch() {
  if (!query.value.trim()) return;
  alert("You searched for: " + query.value);
  query.value = "";
}
</script>

<template>
  <div class="min-h-screen bg-[#212121] text-white flex">
    <!-- Sidebar -->
    <div class="hidden md:flex w-64 bg-[#171717] flex-col border-r border-gray-700">
      <div class="p-4">
        <button class="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg border border-gray-600 hover:bg-[#2A2A2A] transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>New chat</span>
        </button>
      </div>
      
      <div class="flex-1 overflow-y-auto px-3">
        <div class="text-xs text-gray-400 px-3 py-2 font-medium">Recent</div>
      </div>
      
      <div class="p-3 border-t border-gray-700">
        <button class="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-[#2A2A2A] transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span>Account</span>
        </button>
      </div>
    </div>

    <!-- Mobile menu toggle -->
    <button @click="showMenu = !showMenu" class="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A]">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">ChatGPT</span>
          <button class="p-1 rounded hover:bg-[#2A2A2A]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
        <button class="px-3 py-1.5 text-xs bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:opacity-90 transition flex items-center gap-2">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          Upgrade to Go
        </button>
      </div>

      <!-- Chat area -->
      <div class="flex-1 flex flex-col items-center justify-center px-4 pb-32">
        <div class="w-full max-w-3xl">
          <h1 class="text-2xl md:text-3xl font-normal text-center mb-12">
            Ready when you are.
          </h1>
        </div>
      </div>

      <!-- Input area -->
      <div class="fixed bottom-0 left-0 md:left-64 right-0 bg-gradient-to-t from-[#212121] via-[#212121] to-transparent pb-6 pt-12">
        <div class="max-w-3xl mx-auto px-4">
          <div class="relative">
            <div class="flex items-center bg-[#2A2A2A] rounded-3xl shadow-lg border border-gray-600 focus-within:border-gray-500 transition">
              <button class="pl-4 pr-2 py-3 text-gray-400 hover:text-gray-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>
              
              <input
                v-model="query"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Ask anything"
                class="flex-1 bg-transparent outline-none text-white placeholder-gray-400 py-3 px-2 text-sm md:text-base"
              />
              
              <button class="px-3 py-3 text-gray-400 hover:text-gray-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                </svg>
              </button>
              
              <button class="pr-4 pl-2 py-3 text-gray-400 hover:text-gray-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="text-center mt-3 text-xs text-gray-500">
            ChatGPT can make mistakes. Check important info.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #171717;
}

::-webkit-scrollbar-thumb {
  background: #3A3A3A;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4A4A4A;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .fixed.bottom-0 {
    left: 0;
  }
}
</style>
