<script setup></script>

<template>
  <div>
    <RouterLink to="/user">User</RouterLink>
    <p> | </p>
    <RouterLink to="/activity">Activity</RouterLink>
  </div>
  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
