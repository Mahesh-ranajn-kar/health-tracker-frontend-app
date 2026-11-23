<template>
  <footer class="welcome-footer">
    <div class="footer-top">
      <div>
        <BrandLogo light />
        <p>Connect. Share. Discover.</p>
      </div>
      <div class="footer-links">
        <a v-for="link in links" :key="link.id" @click="scrollTo(link.id)">{{ link.label }}</a>
        <RouterLink to="/login">Login</RouterLink>
      </div>
    </div>
    <div class="copyright">© {{ currentYear }} PulseTrack. All rights reserved.</div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import BrandLogo from './BrandLogo.vue'

defineProps({
  scrollTo: { type: Function, required: true }
})

const currentYear = computed(() => new Date().getFullYear())

const links = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact' }
]
</script>

<style scoped>
.welcome-footer { padding: 42px 9% 18px; color: white; background: #0f172a; }
.footer-top { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 24px; padding-bottom: 25px; }
.footer-top p { margin: 8px 0 0; color: #94a3b8; font-size: 12px; }
.footer-links { display: flex; flex-wrap: wrap; gap: 20px; }
.footer-links a { color: #cbd5e1; font-size: 12px; cursor: pointer; }
.footer-links a:hover { color: white; }
.copyright { padding-top: 18px; border-top: 1px solid rgb(255 255 255 / 12%); color: #94a3b8; text-align: center; font-size: 11px; }

@media (max-width: 560px) {
  .footer-top { align-items: flex-start; flex-direction: column; }
}
</style>