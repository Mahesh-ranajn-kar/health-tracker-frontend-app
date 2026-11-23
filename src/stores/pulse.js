import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { DEFAULT_BRAND_COLOR, normalizeHex, applyBrandTheme, generateBrandPalette } from '../utils/themeUtils.js'

export const usePulseStore = defineStore('pulse', () => {

    const read = (key, fallback) => {
        try {
            const value = localStorage.getItem(key)
            return value ? JSON.parse(value) : fallback
        } catch { return fallback }
    }

    const readString = (key, fallback) => {
        try {
            const value = localStorage.getItem(key)
            if (!value) return fallback
            // Handle both JSON-encoded strings and raw hex strings
            const parsed = value.startsWith('"') ? JSON.parse(value) : value
            return parsed || fallback
        } catch { return fallback }
    }

    const darkMode = ref(read('pulsetrack_dark', false)), globalSearch = ref('')

    const brandColor = ref(normalizeHex(readString('pulsetrack_brand_color', DEFAULT_BRAND_COLOR)))

    const activeBrandColor = computed(() => {
        const { hexMap } = generateBrandPalette(brandColor.value)
        return darkMode.value ? hexMap[400] : hexMap[600]
    })

    watch([darkMode, brandColor], ([isDark, color]) => {
        document.documentElement.classList.toggle('dark', isDark)
        localStorage.setItem('pulsetrack_dark', JSON.stringify(isDark))
        applyBrandTheme(color, isDark)
    }, { immediate: true })




    return {
        darkMode,
        brandColor,
        activeBrandColor,
    }
})
