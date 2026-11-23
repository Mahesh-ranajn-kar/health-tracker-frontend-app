<template>
  <div class="welcome-page">
    <HeaderSection :scroll-to="scrollToSection" :on-register="goToRegister" />

    <main>
      <HeroSection :on-register="goToRegister" :on-login="goToLogin" />
      <FeaturesSection :features="features" />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import HeaderSection from './sections/HeaderSection.vue'
import HeroSection from './sections/HeroSection.vue'
import FeaturesSection from './sections/FeaturesSection.vue'

import { features } from './data/features'
import './styles/home-common.css'

const router = useRouter()

// shared helpers – passed down to children as props
function goToLogin() {
  router.push('/login')
}

function goToRegister() {
  router.push('/login?mode=signup')
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>