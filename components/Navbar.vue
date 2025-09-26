<script setup>
const menuitems = [
  {
    title: "Download Service Deck",
    url: "https://cdn2.f-cdn.com/files/download/257089198/afterresult.pdf",
  },
  {
    title: "Call",
    url: "tel:+919050983530",
  },
];
</script>
<template>
  <Container>
    <header class="flex flex-row flex-wrap items-center justify-between my-4 gap-x-6 gap-y-4">
      <div class="flex items-center justify-between">
        <a href="/" class="text-2xl font-bold text-zinc-800">
          <span class="text-green-500">&#10070;</span> AR Solutions
        </a>
      </div>
      <nav class="flex w-auto">
        <ul class="flex flex-row gap-3 text-sm">
          <li v-for="item of menuitems">
            <a :href="item.url" class="flex px-3 py-2 text-gray-600 border rounded-sm hover:text-gray-800">
              {{ item.title }}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  </Container>
</template>
