<template>
  <section id="about" class="pt-section about-section">
    <a-row :gutter="[48, 36]" align="middle">
      <a-col :xs="24" :lg="12">
        <div class="about-art">
          <div class="about-orbit orbit-one" />
          <div class="about-orbit orbit-two" />
          <div class="about-logo"><strong>PT</strong><span>CONNECTING PEOPLE</span></div>
        </div>
      </a-col>
      <a-col :xs="24" :lg="12">
        <div class="about-copy">
          <SectionHeading
            tag="ABOUT PULSETRACK"
            title="More than a platform."
            highlight="A community."
            :description="paragraphs[0]"
          />
          <p>{{ paragraphs[1] }}</p>
          <a-button type="primary" size="large" @click="onRegister">
            Become a Member <i class="fa-solid fa-arrow-right" />
          </a-button>
        </div>
      </a-col>
    </a-row>
  </section>
</template>

<script setup>
import SectionHeading from './SectionHeading.vue'

defineProps({
  onRegister: { type: Function, required: true },
  paragraphs: {
    type: Array,
    default: () => [
      'PulseTrack is designed to make sharing and connecting easier. We provide a welcoming environment where users can express themselves, interact with others and stay informed.',
      'Our goal is to bring people together through conversations, shared experiences and meaningful digital connections.'
    ]
  }
})
</script>

<style scoped>
.about-section { padding-left: 10%; padding-right: 10%; background: var(--pt-page); }
.about-art { min-height: 310px; position: relative; display: grid; place-items: center; overflow: hidden; border-radius: 20px; background: linear-gradient(135deg,#eef2ff,#f5f3ff); }
.about-orbit { position: absolute; border: 1px solid rgb(79 70 229 / 16%); border-radius: 50%; }
.orbit-one { width: 260px; height: 260px; }
.orbit-two { width: 330px; height: 330px; }
.about-logo { width: 185px; height: 185px; position: relative; display: flex; flex-direction: column; justify-content: center; align-items: center; border: 10px solid rgb(255 255 255 / 55%); border-radius: 50%; color: white; background: linear-gradient(135deg,#4f46e5,#8b5cf6); box-shadow: 0 15px 40px rgb(79 70 229 / 25%); }
.about-logo strong { font-size: 52px; }
.about-logo span { font-size: 9px; letter-spacing: 2px; }
.about-copy > p { max-width: 560px; margin-bottom: 15px; color: var(--pt-muted); font-size: 15px; line-height: 1.9; }
.about-copy :deep(.ant-btn) { height: 44px; border-radius: 9px; }

@media (max-width: 560px) {
  .about-section { padding-left: 6%; padding-right: 6%; }
}
</style>