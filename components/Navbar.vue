<script setup>
const menuitems = [
  {
    title: "Service Deck",
    url: "https://cdn2.f-cdn.com/files/download/257089198/afterresult.pdf",
  },
  {
    title: "WhatsApp",
    url: "https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0",
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
            <a :href="item.url" class="flex px-4 py-1 text-white bg-green-500 rounded-full text-sm hover:bg-green-600">
              {{ item.title }}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  </Container>
</template>
