<template>
  <section id="contact" class="pt-section pt-container">
    <a-row :gutter="[48, 36]">
      <a-col :xs="24" :lg="11">
        <SectionHeading
          tag="GET IN TOUCH"
          title="We'd love to"
          highlight="hear from you."
          description="Have a question, suggestion or need help? Get in touch with the PulseTrack team."
        />
        <div class="contact-email">
          <a-avatar style="background:#eef2ff;color:#4f46e5"><i class="fa-regular fa-envelope" /></a-avatar>
          <div><strong>Email us</strong><a :href="`mailto:${email}`">{{ email }}</a></div>
        </div>
      </a-col>
      <a-col :xs="24" :lg="13">
        <a-card class="contact-card" :bordered="false">
          <h3>Send us a message</h3>
          <a-form layout="vertical" :model="contact" @finish="sendMessage">
            <a-form-item label="Your name" name="name" :rules="[{ required: true, message: 'Please enter your name' }]">
              <a-input v-model:value="contact.name" placeholder="Enter your name" size="large" />
            </a-form-item>
            <a-form-item label="Email address" name="email" :rules="[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Enter a valid email' }]">
              <a-input v-model:value="contact.email" placeholder="Enter your email" size="large" />
            </a-form-item>
            <a-form-item label="Message" name="message" :rules="[{ required: true, message: 'Please enter a message' }]">
              <a-textarea v-model:value="contact.message" placeholder="How can we help?" :rows="4" />
            </a-form-item>
            <a-button type="primary" html-type="submit" block size="large">
              Send Message <i class="fa-solid fa-paper-plane" />
            </a-button>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { message } from 'ant-design-vue'
import SectionHeading from './SectionHeading.vue'

const props = defineProps({
  email: { type: String, default: 'support@pulsetrack.com' }
})

const contact = reactive({ name: '', email: '', message: '' })

function sendMessage() {
  const subject = encodeURIComponent('PulseTrack website enquiry')
  const body = encodeURIComponent(
    `Name: ${contact.name}\nEmail: ${contact.email}\n\nMessage:\n${contact.message}`
  )
  window.location.href = `mailto:${props.email}?subject=${subject}&body=${body}`
  message.success('Opening your email application.')
}
</script>

<style scoped>
.contact-email { display: flex; align-items: center; gap: 13px; margin-top: 28px; }
.contact-email strong, .contact-email a { display: block; }
.contact-email a { margin-top: 4px; color: var(--pt-primary); font-size: 13px; }
.contact-card { border: 1px solid var(--pt-border); border-radius: 14px; box-shadow: 0 12px 32px rgb(15 23 42 / 5%); }
.contact-card h3 { margin-top: 0; color: var(--pt-text); font-size: 19px; }
.contact-card :deep(.ant-btn) { height: 44px; border-radius: 9px; }
</style>