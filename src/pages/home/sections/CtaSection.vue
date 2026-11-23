<template>
  <section class="cta-section">
    <SectionHeading
      dark
      align="center"
      tag="YOUR COMMUNITY STARTS HERE"
      title="Ready to find your"
      highlight="Pulse?"
      description="Join PulseTrack and start sharing, connecting and discovering today."
    />
    <a-button size="large" @click="onRegister">
      Create Your Account <i class="fa-solid fa-arrow-right" />
    </a-button>
  </section>
</template>

<script setup>
import SectionHeading from './SectionHeading.vue'

defineProps({
  onRegister: { type: Function, required: true }
})
</script>

<style scoped>
.cta-section { padding: 75px 20px; text-align: center; color: white; background: linear-gradient(120deg,#17134b,#312e81 55%,#5b21b6); }
.cta-section :deep(.section-heading) { margin-bottom: 0; }
.cta-section :deep(.ant-btn) { height: 46px; margin-top: 14px; padding: 0 22px; color: var(--pt-primary); border: 0; border-radius: 9px; font-weight: 700; }
</style>