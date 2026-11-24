<template>
  <a-layout-sider :width="248" :breakpoint="'lg'" :collapsed-width="0" class="app-sider">
    <div class="brand-lockup">
      <div class="brand-mark"><i class="fa-solid fa-bolt" /></div>
      <span>PulseTrack</span>
    </div>

    <a-menu mode="inline" :selected-keys="[activeKey]" @click="({ key }) => switchTab(key)">
      <a-menu-item key="dashboard"><i class="fa-solid fa-chart-pie menu-icon" />Dashboard</a-menu-item>
      <!-- <a-menu-item key="tweets"><i class="fa-solid fa-comment menu-icon" />Community Tweets</a-menu-item> -->
      <!-- <a-menu-item key="chatbot"><i class="fa-solid fa-robot menu-icon" />AI Assistant</a-menu-item> -->
      <a-menu-item v-if="isAdmin" key="users"><i class="fa-solid fa-users menu-icon" />User Management</a-menu-item>
      <!-- <a-menu-item key="activities"><i class="fa-solid fa-list-check menu-icon" />Activity Feed</a-menu-item> -->
      <a-menu-item key="manage-activities"><i class="fa-solid fa-screwdriver-wrench menu-icon" />Manage Activities</a-menu-item>
      <a-menu-item key="profile"><i class="fa-solid fa-user-pen menu-icon" />My Profile &amp; Info</a-menu-item>
      <!-- <a-menu-item key="analytics"><i class="fa-solid fa-chart-line menu-icon" />Deep Analytics</a-menu-item> -->
      <!-- <a-menu-item key="settings"><i class="fa-solid fa-gear menu-icon" />Settings</a-menu-item> -->
    </a-menu>

    <div class="sider-user">
      <a-avatar :src="currentUser?.avatar" :size="40">{{
        currentUser?.name?.charAt(0)
        }}</a-avatar>
      <div class="sider-user-copy">
        <strong>{{ currentUser?.name }}</strong>
        <span>{{ currentUser?.email }}</span>
      </div>
      <a-tooltip title="Logout">
        <a-button type="text" danger aria-label="Logout" @click="handleLogout">
          <i class="fa-solid fa-right-from-bracket" /></a-button>
      </a-tooltip>
    </div>
  </a-layout-sider>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePulseStore } from "../../stores/pulse.js";
import "./styles.css"

const route = useRoute();
const router = useRouter();
const { currentUser } = storeToRefs(usePulseStore());

const roleName = currentUser.value?.role?.name || ""
const isAdmin = computed(() => String(roleName).toLowerCase() === "admin");
const activeKey = computed(() => String(route.name || "dashboard"));
function switchTab(key) {
  router.push({ name: key });
}
function handleLogout() {
  localStorage.removeItem("authenticated");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push({ name: "login" });
}
</script>

