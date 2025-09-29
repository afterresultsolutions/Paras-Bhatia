<script setup>
import { ref } from "vue";

definePageMeta({
  layout: "default",
});

const query = ref("");

function handleSearch() {
  if (!query.value.trim()) return;
  alert("You searched for: " + query.value); // replace with actual search logic
  query.value = "";
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white px-4">
    <!-- Logo placeholder -->
    <div class="mb-12 mt-8">
      <img src="/images/logo.png" alt="Logo" class="h-10 md:h-12" />
    </div>

    <!-- Main heading -->
    <h1 class="text-2xl md:text-3xl font-normal mb-6 text-gray-900 text-center">
      What are you working on?
    </h1>

    <!-- Search input -->
    <div class="w-full max-w-xl flex items-center border rounded-full shadow-sm px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
      <span class="text-gray-400 mr-2">+</span>
      <input
        v-model="query"
        @keyup.enter="handleSearch"
        type="text"
        placeholder="Ask anything"
        class="flex-1 outline-none text-gray-900 placeholder-gray-400 px-2 py-1"
      />
      <!-- Microphone icon -->
      <button class="ml-2 text-gray-500 hover:text-gray-700">
        🎤
      </button>
      <!-- Wave icon -->
      <button class="ml-2 text-gray-500 hover:text-gray-700">
        🔊
      </button>
    </div>

    <!-- Optional footer / buttons -->
    <div class="mt-6 text-center text-gray-500 text-sm">
      Press Enter or click 🔊 to speak
    </div>
  </div>
</template>

<style scoped>
/* Make it responsive and center perfectly */
@media (max-width: 640px) {
  h1 {
    font-size: 1.5rem;
  }
  input {
    font-size: 0.9rem;
  }
}
</style>
