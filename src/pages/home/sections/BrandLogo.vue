<template>
  <RouterLink to="/" class="brand" :class="{ light }">
    <span class="brand-mark"><i class="fa-solid fa-bolt" /></span>
    <span>{{ name }}</span>
  </RouterLink>
</template>

<script setup>
defineProps({
  name: { type: String, default: 'PulseTrack' },
  light: { type: Boolean, default: false } // white text for dark backgrounds
})
</script>

<style scoped>
.brand { display: inline-flex; align-items: center; gap: 10px; color: var(--pt-text); font-size: 22px; font-weight: 800; }
.brand.light { color: white; }
.brand-mark { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 11px; color: white; background: linear-gradient(135deg,#4f46e5,#8b5cf6); }
</style>