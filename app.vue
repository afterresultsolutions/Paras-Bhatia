<script setup>
useHead({
  htmlAttrs: { lang: "en-US" },
  title: "AR Solutions",
  meta: [
    {
      name: "description",
      content:
        "Helping You Scale Smarter While Maximizing ROI.",
    },
  ],
  bodyAttrs: {
    class: 'font-display'
  }
});
</script>
<script setup>
useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
