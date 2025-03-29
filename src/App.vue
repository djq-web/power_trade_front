<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
onMounted(() => {
  console.log('App.vue onMounted');
});
</script>

<style></style>
