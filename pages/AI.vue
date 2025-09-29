<script setup>
import { ref } from "vue"

definePageMeta({
  layout: "default",
})

const query = ref("")
const messages = ref([])

function sendMessage() {
  if (!query.value.trim()) return
  messages.value.push({ role: "user", text: query.value })
  // Fake response for now
  messages.value.push({ role: "bot", text: "This is a sample response to: " + query.value })
  query.value = ""
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- Chat Area -->
    <div class="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div class="max-w-2xl mx-auto space-y-4">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          :class="msg.role === 'user' ? 'text-right' : 'text-left'"
        >
          <div
            :class="[
              'inline-block px-4 py-2 rounded-lg shadow-sm',
              msg.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 border'
            ]"
          >
            {{ msg.text }}
          </div>
        </div>
      </div>
    </div>

    <!-- Input Bar -->
    <div class="p-4 border-t bg-white">
      <div class="max-w-2xl mx-auto flex items-center gap-2">
        <input
          v-model="query"
          type="text"
          placeholder="Type your question..."
          class="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          @keyup.enter="sendMessage"
        />
        <button
          @click="sendMessage"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>
