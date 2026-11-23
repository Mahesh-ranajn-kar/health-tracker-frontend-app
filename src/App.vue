<template>
  <a-config-provider :theme="antdTheme">
    <RouterView v-if="route.name === 'welcome' || route.name === 'login'" />
    <a-layout v-else class="app-shell">
    </a-layout>
  </a-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePulseStore } from './stores/pulse.js'
import { storeToRefs } from 'pinia'
import { theme } from 'ant-design-vue'

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
