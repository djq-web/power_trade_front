<template>
  <div class="not-found">
    <span>404</span>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive } from 'vue'
  onMounted(()=>{
    console.log('404 page onMounted!')
  })
</script>

<style lang="scss">
.not-found {
  text-align: center;
  padding-top: 100px;
  text-align: center;
  font-size: 96px;
  color: #ccc;
}
</style>
