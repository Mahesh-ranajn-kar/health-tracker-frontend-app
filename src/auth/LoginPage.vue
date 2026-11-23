<template>
  <div class="auth-page">
    <div class="auth-shell">
      <!-- LEFT: exercise images. Swap each <svg> for <img src="/your-photo.jpg" class="bubble-img" alt="..."> to use real photos. -->
      <aside class="auth-visual" aria-hidden="true">
        <span class="blob blob-a" /><span class="blob blob-b" />
        <div class="bubble bubble-1"><svg viewBox="0 0 200 200" class="bubble-svg" aria-hidden="true">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#a5b4fc" />
                <stop offset="1" stop-color="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect width="200" height="200" fill="url(#g1)" />
            <g fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="48" cy="92" r="11" fill="#fff" />
              <path d="M62 100 L150 128 L172 150 M80 106 L78 150 M150 128 L168 128" />
            </g>
          </svg></div>
        <div class="bubble bubble-2"><svg viewBox="0 0 200 200" class="bubble-svg" aria-hidden="true">
            <defs>
              <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#c7d2fe" />
                <stop offset="1" stop-color="#6366f1" />
              </linearGradient>
            </defs>
            <rect width="200" height="200" fill="url(#g2)" />
            <g fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="100" cy="58" r="12" fill="#fff" />
              <path d="M100 74 V120 L84 168 M100 120 L116 168 M100 86 L76 62 V44 M100 86 L118 104" />
              <circle cx="76" cy="32" r="11" />
            </g>
          </svg></div>
        <div class="bubble bubble-3"><svg viewBox="0 0 200 200" class="bubble-svg" aria-hidden="true">
            <defs>
              <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#818cf8" />
                <stop offset="1" stop-color="#4f46e5" />
              </linearGradient>
            </defs>
            <rect width="200" height="200" fill="url(#g3)" />
            <g fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="112" cy="52" r="12" fill="#fff" />
              <path
                d="M106 68 L96 114 L122 140 L112 172 M96 114 L74 140 L54 150 M104 80 L126 96 L142 84 M104 80 L84 96 L70 112" />
            </g>
          </svg></div>
      </aside>

      <!-- RIGHT: login form -->
      <main class="auth-panel">
        <div class="auth-brand">
          <div class="auth-logo"><i class="fa-solid fa-bolt" /></div>
          <div class="auth-brand-text">
            <h1>PulseTrack</h1>
            <p>Activity App</p>
          </div>
        </div>

        <template v-if="otpRequired">
          <h2 class="auth-title">Verify your email</h2>
          <a-alert type="info" show-icon message="Check your email for a verification code"
            :description="`A one-time code was sent to ${otpEmail}`" />
          <a-alert v-if="errorMessage" class="auth-alert" :message="errorMessage" type="error" show-icon />
          <a-form class="auth-form" @finish="verifyOtp">
            <a-form-item>
              <a-input 
                v-model:value="otpCode" 
                size="large" 
                maxlength="8" 
                inputmode="numeric"
                placeholder="Enter verification code" 
              />
            </a-form-item>

            <a-button 
              class="auth-submit" 
              type="primary" 
              block size="large" 
              html-type="submit"
              :loading="isLoading"
            >Verify and continue</a-button>

            <a-button type="link" block @click="otpRequired = false">Back to sign in</a-button>
          </a-form>
        </template>

        <template v-else>
          <h2 class="auth-title">{{ isSignup ? 'Create your account' : 'Login to your account' }}</h2>
          <a-segmented block :value="isSignup ? 'signup' : 'login'"
            :options="[{ label: 'Sign In', value: 'login' }, { label: 'Create Account', value: 'signup' }]"
            @change="switchAuthTab" />
          <a-form class="auth-form" :model="form" @finish="handleAuthSubmit">
            <a-form-item v-if="isSignup">
              <a-input v-model:value="form.name" placeholder="Full name" required size="large">
                <template #prefix><i class="fa-regular fa-user" /></template>
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-input v-model:value="form.email" type="email" placeholder="Enter email address" required size="large">
                <template #prefix><i class="fa-solid fa-envelope" /></template>
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-input-password v-model:value="form.password" placeholder="Enter password" required size="large">
                <template #prefix><i class="fa-solid fa-key" /></template>
              </a-input-password>
            </a-form-item>

            <a-alert v-if="errorMessage" class="auth-alert" :message="errorMessage" type="error" show-icon />
            <a-button class="auth-submit" type="primary" html-type="submit" block size="large" :loading="isLoading">
              {{ isSignup ? 'Create Account' : 'Login' }}
            </a-button>
          </a-form>
        </template>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from './authService'
import "./styles.css"

const router = useRouter()

const isSignup = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const otpRequired = ref(false)
const otpCode = ref('')
const otpChallengeId = ref('')
const otpEmail = ref('')

const form = reactive({
  name: '',
  email: '',
  password: ''
})

function switchAuthTab(mode) {
  isSignup.value = mode === 'signup'
}

async function handleAuthSubmit() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    var data = null
    if (isSignup.value) {
      data = await authService.register({
        name: form.name,
        email: form.email,
        password: form.password
      })

      isSignup.value = false
      form.password = ''
    } else {
      data = await authService.login({
        email: form.email,
        password: form.password
      })
    }

    if (data?.otpRequired) {
      otpRequired.value = true
      otpChallengeId.value = data.challengeId
      otpEmail.value = data.email || form.email
      return
    }

    if(data != null) {
      completeLogin(data?.data)
    }

  } catch (error) {
    const msg = error.response?.data?.message || 'Authentication failed. Please try again.'
    errorMessage.value = msg
  } finally {
    isLoading.value = false
  }
}

function completeLogin(data) {
  localStorage.setItem('authenticated', 'true')
  localStorage.setItem('user', JSON.stringify(data.user))
  localStorage.setItem('token', data.token)
  router.push('/dashboard')
}

async function verifyOtp() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const data = await authService.verifyOtp({ challengeId: otpChallengeId.value, code: otpCode.value })
    completeLogin(data)
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message || 'OTP verification failed'
  } finally { isLoading.value = false }
}
</script>