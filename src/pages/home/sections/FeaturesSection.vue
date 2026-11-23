<template>
  <section id="features" class="pt-section pt-container">
    <SectionHeading
      align="center"
      tag="WHAT WE OFFER"
      title="Everything you need to"
      highlight="stay connected"
      description="PulseTrack brings your social experience together in one simple and welcoming platform."
    />
    <a-row :gutter="[20, 20]">
      <a-col v-for="feature in features" :key="feature.title" :xs="24" :sm="12" :lg="8">
        <a-card class="feature-card" :bordered="false" hoverable>
          <div class="feature-icon" :style="{ background: feature.background, color: feature.color }">
            <i :class="feature.icon" />
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </a-card>
      </a-col>
    </a-row>
  </section>
</template>

<script setup>
import SectionHeading from './SectionHeading.vue'

defineProps({
  features: { type: Array, required: true } // [{ title, description, icon, color, background }]
})
</script>

<style scoped>
.feature-card { height: 100%; border: 1px solid var(--pt-border); border-radius: 13px; transition: .2s; }
.feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgb(15 23 42 / 8%); }
.feature-icon { width: 48px; height: 48px; display: grid; place-items: center; margin-bottom: 18px; border-radius: 12px; font-size: 21px; }
.feature-card h3 { margin-bottom: 8px; color: var(--pt-text); font-size: 16px; font-weight: 700; }
.feature-card p { margin: 0; color: var(--pt-muted); font-size: 13px; line-height: 1.8; }
</style>