<template>
  <div class="section-heading" :class="[align, { dark }]">
    <a-tag color="purple">{{ tag }}</a-tag>
    <h2>{{ title }} <span>{{ highlight }}</span></h2>
    <p v-if="description">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  tag: { type: String, required: true },
  title: { type: String, required: true },
  highlight: { type: String, default: '' },
  description: { type: String, default: '' },
  align: { type: String, default: 'left', validator: v => ['left', 'center'].includes(v) },
  dark: { type: Boolean, default: false }
})
</script>

<style scoped>
.section-heading h2 { margin: 16px 0; color: var(--pt-text); font-size: clamp(29px,3.5vw,42px); line-height: 1.25; font-weight: 750; }
.section-heading h2 span { color: var(--pt-primary); }
.section-heading p { max-width: 560px; color: var(--pt-muted); font-size: 15px; line-height: 1.9; }

.section-heading.center { max-width: 680px; margin: 0 auto 45px; text-align: center; }
.section-heading.center p { margin-left: auto; margin-right: auto; }

.section-heading.dark h2 { margin: 18px 0 12px; color: white; font-size: clamp(30px,4vw,43px); }
.section-heading.dark h2 span { color: #c4b5fd; }
.section-heading.dark p { color: #cbd5e1; line-height: 1.8; }
</style>