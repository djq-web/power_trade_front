<template>
  <div class="long-term-view">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
router.push({ name: 'LongTermAnalysis' });
</script>
