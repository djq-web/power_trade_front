<!-- src/components/Message.vue -->
<template>
  <v-alert
  v-if="visible"
  closable
  @close="close"
  :color="type"
  :icon="`${type}`"
  :text="message"
></v-alert>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'info',
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  setup(props, { emit }) {
    const visible = ref(true);
    const close = () => {
      visible.value = false;
      emit('close');
    };

    onMounted(() => {
      setTimeout(() => {
        close();
      }, props.duration);
    });

    return {
      visible,
      close,
    };
  },
});
</script>

<style scoped>
.message {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  color: white;
  background-color: #333;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-success {
  background-color: #67c23a;
}

.message-warning {
  background-color: #e6a23c;
}

.message-error {
  background-color: #f56c6c;
}

.message-info {
  background-color: #909399;
}
</style>