<template>
  <section id="home" class="hero-section">
    <a-row :gutter="[40, 40]" align="middle">
      <a-col :xs="24" :lg="13">
        <div class="hero-copy">
          <a-tag color="purple">CONNECT · SHARE · DISCOVER</a-tag>
          <h1>Your world.<br />Your people.<br /><span>Your Pulse.</span></h1>
          <p>
            Welcome to PulseTrack — a place where ideas come alive,
            conversations matter, and connections grow. Share your
            thoughts and stay connected with the people who matter.
          </p>
          <div class="hero-actions">
            <a-button type="primary" size="large" @click="onRegister">
              Join PulseTrack <i class="fa-solid fa-arrow-right" />
            </a-button>
            <a-button size="large" @click="onLogin">Login to your account</a-button>
          </div>
          <div class="hero-note">
            <i class="fa-solid fa-circle-check" />
            Your community is waiting for you.
          </div>
        </div>
      </a-col>

      <a-col :xs="24" :lg="11">
        <div class="hero-art">
          <div class="art-glow" />
          <a-card class="post-preview" :bordered="false">
            <div class="post-author">
              <a-avatar :size="44" style="background:#4f46e5">A</a-avatar>
              <div><strong>Alex Morgan</strong><span>Just now · Public post</span></div>
            </div>
            <p class="post-copy">Great things happen when people connect, share ideas and support each other!</p>
            <div class="post-art">
              <i class="fa-solid fa-sparkles" />
              <strong>Share your moment.</strong>
            </div>
            <div class="post-meta">
              <span><i class="fa-regular fa-heart" /> 128 Likes</span>
              <span><i class="fa-regular fa-comment" /> 24 Comments</span>
            </div>
          </a-card>
          <a-card class="float-card float-notification" :bordered="false">
            <a-avatar style="background:#eef2ff;color:#4f46e5"><i class="fa-solid fa-heart" /></a-avatar>
            <div><strong>New interaction</strong><span>Someone liked your post</span></div>
          </a-card>
          <a-card class="float-card float-community" :bordered="false">
            <a-avatar style="background:#ecfdf5;color:#059669"><i class="fa-solid fa-users" /></a-avatar>
            <div><strong>Stay connected</strong><span>Discover your community</span></div>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </section>
</template>

<script setup>
defineProps({
  onRegister: { type: Function, required: true },
  onLogin: { type: Function, required: true }
})
</script>

<style scoped>
.hero-section { padding: 90px 9%; background: radial-gradient(circle at 85% 25%,#eef2ff 0,transparent 35%),linear-gradient(120deg,#fff 45%,#f8fafc); }
.hero-copy h1 { margin: 20px 0; color: var(--pt-text); font-size: clamp(44px,5.5vw,68px); line-height: 1.1; font-weight: 800; letter-spacing: -2px; }
.hero-copy h1 span { color: var(--pt-primary); }
.hero-copy > p { max-width: 560px; color: var(--pt-muted); font-size: 15px; line-height: 1.9; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.hero-actions :deep(.ant-btn) { height: 44px; border-radius: 9px; }
.hero-note { display: flex; align-items: center; gap: 9px; margin-top: 25px; color: var(--pt-muted); font-size: 12px; }
.hero-note i { color: #10b981; }
.hero-art { min-height: 390px; position: relative; display: grid; place-items: center; }
.art-glow { position: absolute; width: 320px; height: 320px; border-radius: 50%; background: linear-gradient(135deg,#e0e7ff,#f5f3ff); }
.post-preview { position: relative; z-index: 1; width: min(100%,390px); border-radius: 15px; box-shadow: 0 24px 60px rgb(15 23 42 / 12%); }
.post-author { display: flex; align-items: center; gap: 12px; }
.post-author strong, .post-author span { display: block; }
.post-author span, .float-card span { margin-top: 4px; color: var(--pt-muted); font-size: 11px; }
.post-copy { margin: 18px 0; color: #475569; font-size: 13px; line-height: 1.7; }
.post-art { min-height: 145px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 10px; border-radius: 11px; color: white; background: linear-gradient(135deg,#4f46e5,#8b5cf6,#c4b5fd); }
.post-art i { font-size: 30px; }
.post-meta { display: flex; justify-content: space-between; margin-top: 16px; color: var(--pt-muted); font-size: 11px; }
.post-meta i { margin-right: 4px; }
.float-card { position: absolute; z-index: 2; display: flex; align-items: center; gap: 10px; border-radius: 12px; box-shadow: 0 10px 30px rgb(15 23 42 / 12%); }
.float-card strong, .float-card span { display: block; }
.float-notification { top: 18px; right: -8px; }
.float-community { bottom: 12px; left: -12px; }

@media (max-width: 900px) {
  .hero-section { padding: 65px 7%; }
}
@media (max-width: 560px) {
  .hero-section { padding: 58px 6%; }
  .hero-copy h1 { font-size: 44px; }
  .hero-actions { flex-direction: column; }
  .hero-actions :deep(.ant-btn) { width: 100%; }
  .hero-art { min-height: 350px; }
  .float-notification { top: 0; right: 0; }
  .float-community { bottom: 0; left: 0; }
}
</style>