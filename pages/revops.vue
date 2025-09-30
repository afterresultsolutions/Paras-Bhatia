<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900">
    <!-- Hero -->
    <section class="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-16 px-6 text-center">
      <h1 class="text-3xl md:text-5xl font-bold mb-4">Revenue Operations Made Simple</h1>
      <p class="text-lg md:text-xl mb-6">
        Streamline your business with expert RevOps services
      </p>
      <button
        @click="showPopup = true"
        class="px-6 py-3 bg-white text-blue-700 rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        Schedule a Call
      </button>
    </section>

    <!-- Services -->
    <section id="services" class="py-12 px-6 max-w-6xl mx-auto">
      <h2 class="text-2xl font-bold text-center mb-8">Our Services</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="bg-white shadow-md rounded-xl p-4 cursor-pointer transition hover:shadow-xl"
          @click="toggleService(index)"
        >
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-3">
              <span class="text-blue-600 text-2xl">{{ service.icon }}</span>
              <h3 class="text-lg font-semibold">{{ service.title }}</h3>
            </div>
            <span
              :class="[
                'transform transition-transform',
                activeService === index ? 'rotate-180' : 'rotate-0'
              ]"
            >
              ▼
            </span>
          </div>
          <p
            v-if="activeService === index"
            class="mt-3 text-sm text-gray-600 transition-all"
          >
            {{ service.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="bg-gray-100 py-12 px-6">
      <h2 class="text-2xl font-bold text-center mb-8">Pricing Plans</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div
          v-for="(plan, index) in pricing"
          :key="index"
          class="bg-white shadow-lg rounded-xl p-6 text-center"
        >
          <h3 class="text-xl font-semibold mb-2">{{ plan.name }}</h3>
          <p class="text-3xl font-bold text-blue-700 mb-4">{{ plan.price }}</p>
          <ul class="text-sm text-gray-600 mb-4 space-y-2">
            <li v-for="(feature, fIndex) in plan.features" :key="fIndex">
              ✓ {{ feature }}
            </li>
          </ul>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Choose Plan
          </button>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section id="contact" class="py-12 px-6 text-center">
      <h2 class="text-2xl font-bold mb-4">Ready to Grow?</h2>
      <p class="mb-6">Book a free consultation today and boost your revenue!</p>
      <button
        @click="showPopup = true"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Schedule a Call
      </button>
    </section>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-6 mt-12">
      <div
        class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div class="text-lg font-semibold">RevOps Solutions</div>
        <nav class="flex flex-wrap gap-4 text-sm">
          <a href="#services" class="hover:underline">Services</a>
          <a href="#pricing" class="hover:underline">Pricing</a>
          <a href="#contact" class="hover:underline">Contact</a>
        </nav>
        <p class="text-xs text-gray-200">
          © 2025 RevOps Solutions. All rights reserved.
        </p>
      </div>
    </footer>

    <!-- WhatsApp Popup -->
    <div
      v-if="showPopup"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 relative">
        <button
          @click="closePopup"
          class="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h3 class="text-xl font-semibold mb-4">Schedule a Call</h3>
        <form @submit.prevent="sendWhatsApp" class="space-y-4">
          <input
            v-model="formData.name"
            type="text"
            placeholder="Your Name"
            required
            class="w-full p-2 border rounded"
          />
          <input
            v-model="formData.position"
            type="text"
            placeholder="Your Position"
            required
            class="w-full p-2 border rounded"
          />
          <input
            v-model="formData.company"
            type="text"
            placeholder="Company Name"
            required
            class="w-full p-2 border rounded"
          />
          <input
            v-model="formData.date"
            type="date"
            required
            class="w-full p-2 border rounded"
          />
          <input
            v-model="formData.time"
            type="time"
            required
            class="w-full p-2 border rounded"
          />
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showPopup = ref(false)
const activeService = ref(null)

const services = [
  { title: 'CRM Setup', description: 'We integrate CRMs to streamline operations.', icon: '⚙️' },
  { title: 'Automation', description: 'Automate workflows with modern tools.', icon: '⚡' },
  { title: 'Integration', description: 'Connect apps for smooth data flow.', icon: '🔗' },
  { title: 'Database Management', description: 'Clean and manage your data efficiently.', icon: '🗄️' },
  { title: 'Analytics', description: 'Track KPIs and performance insights.', icon: '📊' },
  { title: 'Lead Targeting', description: 'Smart targeting for better conversions.', icon: '🎯' },
  { title: 'Growth Strategy', description: 'Proven frameworks for scaling.', icon: '📈' },
  { title: 'Consulting', description: 'Tailored advice for revenue ops.', icon: '📖' }
]

const pricing = [
  { name: 'Starter', price: '$499/mo', features: ['CRM Setup', 'Basic Automation', 'Email Support'] },
  { name: 'Growth', price: '$999/mo', features: ['Advanced Automation', 'Integrations', 'Priority Support'] },
  { name: 'Enterprise', price: '$1999/mo', features: ['Custom Solutions', 'Dedicated Manager', '24/7 Support'] }
]

const formData = ref({
  name: '',
  position: '',
  company: '',
  date: '',
  time: ''
})

function toggleService(index) {
  activeService.value = activeService.value === index ? null : index
}

function closePopup() {
  showPopup.value = false
}

function sendWhatsApp() {
  const { name, position, company, date, time } = formData.value
  const message = `Hello, my name is ${name}, ${position} at ${company}. I would like to schedule a call on ${date} at ${time}.`
  const url = `https://wa.me/919991183530?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
  formData.value = { name: '', position: '', company: '', date: '', time: '' }
  showPopup.value = false
}
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
