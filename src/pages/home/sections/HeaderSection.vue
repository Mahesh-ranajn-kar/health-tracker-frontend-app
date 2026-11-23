<template>
  <header class="welcome-nav">
    <div class="nav-inner">
      <BrandLogo />

      <button class="mobile-toggle" type="button" aria-label="Toggle navigation" @click="menuOpen = !menuOpen">
        <i :class="menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'" />
      </button>

      <nav :class="{ 'nav-open': menuOpen }">
        <a v-for="link in links" :key="link.id" @click="go(link.id)">{{ link.label }}</a>
        <div class="nav-actions">
          <RouterLink to="/login" class="login-link" @click="menuOpen = false">Sign In</RouterLink>
          <a-button type="primary" @click="onRegister">Get Started</a-button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import BrandLogo from './BrandLogo.vue'

const props = defineProps({
  scrollTo: { type: Function, required: true },
  onRegister: { type: Function, required: true }
})

const menuOpen = ref(false)

const links = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact' }
]

function go(id) {
  props.scrollTo(id)
  menuOpen.value = false
}
</script>

<style scoped>
.welcome-nav { position: sticky; top: 0; z-index: 100; background: var(--pt-surface); border-bottom: 1px solid var(--pt-border); }
.nav-inner { max-width: 1440px; min-height: 76px; margin: auto; padding: 0 6%; display: flex; align-items: center; justify-content: space-between; }
nav { display: flex; align-items: center; gap: 28px; }
nav > a, .login-link { color: var(--pt-muted); font-size: 13px; font-weight: 600; cursor: pointer; }
nav > a:hover, .login-link:hover { color: var(--pt-primary); }
.nav-actions { display: flex; align-items: center; gap: 20px; }
.mobile-toggle { display: none; border: 0; background: transparent; color: var(--pt-text); font-size: 20px; }

@media (max-width: 900px) {
  .nav-inner { min-height: 70px; flex-wrap: wrap; padding: 14px 5%; }
  .mobile-toggle { display: block; }
  nav { display: none; width: 100%; padding: 18px 0 8px; flex-direction: column; align-items: flex-start; gap: 18px; }
  nav.nav-open { display: flex; }
  .nav-actions { width: 100%; }
}
</style>