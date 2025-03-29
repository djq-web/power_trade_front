// src/utils/messageManager.ts
import { createApp, h } from 'vue';
import Message from '../components/global/Message.vue';

let messageInstance: any = null;

const createMessage = (options: any) => {
  const { message, type, duration } = options;

  if (messageInstance) {
    messageInstance.unmount();
  }

  const container = document.createElement('div');
  document.body.appendChild(container);

  const app = createApp({
    render() {
      return h(Message, {
        message,
        type,
        duration,
        onClose: () => {
          app.unmount();
          container.remove();
        },
      });
    },
  });

  messageInstance = app.mount(container);
};

export const ElMessage = {
  success(options: string | { message: string; duration?: number }) {
    const config = typeof options === 'string' ? { message: options } : options;
    createMessage({ ...config, type: 'success' });
  },
  warning(options: string | { message: string; duration?: number }) {
    const config = typeof options === 'string' ? { message: options } : options;
    createMessage({ ...config, type: 'warning' });
  },
  error(options: string | { message: string; duration?: number }) {
    const config = typeof options === 'string' ? { message: options } : options;
    createMessage({ ...config, type: 'error' });
  },
  info(options: string | { message: string; duration?: number }) {
    const config = typeof options === 'string' ? { message: options } : options;
    createMessage({ ...config, type: 'info' });
  },
};