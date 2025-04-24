<template>
  <transition name="message-fade">
    <div
      v-if="visible"
      class="custom-message"
      :class="[`custom-message--${type}`]"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <img :src="imgs[type]" width="16px" height="16px" class="typeIcon" />
      <span class="custom-message__content">{{ message }}</span>
      <span v-if="showClose" class="custom-message__close" @click="close">
        &times;
      </span>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ErrorIcon from '@/assets/img/toastMessage/error.svg';
import InfoIcon from '@/assets/img/toastMessage/info.svg';
import SuccessIcon from '@/assets/img/toastMessage/success.svg';
import WaringIcon from '@/assets/img/toastMessage/warning.svg';

const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) =>
      ['success', 'warning', 'info', 'error'].includes(value),
  },
  duration: {
    type: Number,
    default: 3000,
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  onClose: {
    type: Function,
    default: () => {},
  },
});
const imgs = {
  success: SuccessIcon,
  warning: WaringIcon,
  info: InfoIcon,
  error: ErrorIcon,
};

const visible = ref(false);
let timer = null;

onMounted(() => {
  visible.value = true;
  startTimer();
});

const close = () => {
  visible.value = false;
  props.onClose();
};

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

const startTimer = () => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close();
    }, props.duration);
  }
};
</script>

<style scoped>
.custom-message {
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  padding: 12px 16px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  display: flex;
  align-items: center;
  z-index: 9999;
  transition: all 0.3s;
}
.typeIcon {
  margin-right: 10px;
}
.custom-message--success {
  background-color: #f0f9eb;
  color: #67c23a;
}

.custom-message--warning {
  background-color: #fdf6ec;
  color: #e6a23c;
}

.custom-message--info {
  background-color: #f4f4f5;
  color: #909399;
}

.custom-message--error {
  background-color: #fef0f0;
  color: #f56c6c;
}

.custom-message__content {
  padding: 0;
  margin: 0;
}

.custom-message__close {
  margin-left: 16px;
  cursor: pointer;
}

.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>