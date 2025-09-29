<script setup>
const menuitems = [
  {
    title: "AI Chatbot",
    url: "https://afterresult.solutions/ai/",
  },
];
</script>
<template>
  <Container>
    <header class="flex flex-row flex-wrap items-center justify-between my-4 gap-x-6 gap-y-4">
      <div class="flex items-center justify-between">
        <a href="/" class="text-2xl font-bold text--800">
          <span class="text--500">&#10070;</span> AR Solutions
        </a>
      </div>
      <nav class="flex w-auto">
        <ul class="flex flex-row gap-3 text-sm">
          <li v-for="item of menuitems">
            <a :href="item.url" class="flex px-4 py-1 text-white bg-orange-500 rounded-full text-sm hover:bg-orange-600">
              {{ item.title }}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  </Container>
</template>
