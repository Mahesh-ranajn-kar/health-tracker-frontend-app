<template>
  <a-config-provider :theme="antdTheme">
    <RouterView v-if="route.name === 'welcome' || route.name === 'login'" />
    <a-layout v-else class="app-shell">
      <Sidebar />
      <a-layout class="app-main">
        <Header />
        <a-layout-content class="app-content"><RouterView /></a-layout-content>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePulseStore } from './stores/pulse.js'
import { storeToRefs } from 'pinia'
import { theme } from 'ant-design-vue'
import Sidebar from './components/sidebar/SideBar.vue'
import Header from './components/header/Header.vue'

const route = useRoute()
const { darkMode, activeBrandColor } = storeToRefs(usePulseStore())
const antdTheme = computed(() => ({
  algorithm: darkMode.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: activeBrandColor.value,
    colorInfo: activeBrandColor.value,
    borderRadius: 10,
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
  }
}))
</script>

<style scoped></style>
