<template>
  <a-layout-header class="topbar">
    <div class="topbar-title">
      <strong>{{ pageTitle }}</strong>
      <span>Monitor your users, activities, and platform metrics.</span>
    </div>
    <div class="topbar-actions">
      <a-input v-model:value="globalSearch" placeholder="Search users, activities..." allow-clear class="global-search">
        <template #prefix><i class="fa-solid fa-magnifying-glass" /></template>
      </a-input>
      <a-tooltip :title="darkMode ? 'Switch to light mode' : 'Switch to dark mode'">
        <a-button shape="circle" size="large" @click="toggleTheme">
          <i :class="darkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" />
        </a-button>
      </a-tooltip>
      <a-popover trigger="click" placement="bottomRight" @open-change="loadNotifications">
        <template #content>
          <div class="notification-popover">
            <div class="notification-heading">
              <strong>Notifications</strong><a-button size="small" type="link" @click="markAllRead">Mark all
                read</a-button>
            </div>
            <a-list size="small" :data-source="notifications" :locale="{ emptyText: 'No notifications' }">
              <template #renderItem="{ item }">
                <a-list-item @click="markRead(item)">
                  <div>
                    <a-badge :status="item.read ? 'default' : 'processing'" /><strong>{{ item.message
                      }}</strong><small>{{ formatDate(item.createdAt) }}</small>
                  </div>
                </a-list-item>
              </template>
            </a-list>
          </div>
        </template>
        <a-badge :count="unreadCount" :offset="[-3, 3]"><a-button shape="circle" size="large"><i
              class="fa-regular fa-bell" /></a-button></a-badge>
      </a-popover>
    </div>
  </a-layout-header>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import api from "../../services/api";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { usePulseStore } from "../../stores/pulse.js";
const route = useRoute();
const { darkMode, globalSearch } = storeToRefs(usePulseStore());
const { toggleTheme } = usePulseStore();

const titles = {
  dashboard: "Dashboard",
  users: "User Management",
  activities: "Activity Feed",
  "manage-activities": "Manage Activities",
  profile: "My Profile",
  analytics: "Deep Analytics",
  settings: "Settings",
  tweets: "Community Tweets",
  chatbot: "AI Assistant",
};
const pageTitle = computed(() => titles[route.name] || "PulseTrack");
const notifications = ref([]);
const unreadCount = computed(
  () => notifications.value.filter((n) => !n.read).length,
);
async function loadNotifications() {
  try {
    const r = await api.get("/notifications");
    notifications.value = r.data || [];
  } catch { }
}
async function markRead(item) {
  if (item.read) return;
  await api.put(`/notifications/${item.id}/read`);
  item.read = true;
}
async function markAllRead() {
  await api.put("/notifications/read-all");
  notifications.value.forEach((n) => (n.read = true));
}
function formatDate(value) {
  return value ? new Date(value).toLocaleString() : "";
}
// let notificationTimer;
// onMounted(() => {
//   loadNotifications();
//   notificationTimer = window.setInterval(loadNotifications, 30000);
// });
// onBeforeUnmount(() => window.clearInterval(notificationTimer));
</script>

<style scoped src="./styles.css"></style>

