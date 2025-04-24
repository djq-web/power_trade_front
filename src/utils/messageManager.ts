//@ts-nocheck
import { createApp, h } from 'vue';
import Message from '../components/Message.vue';
const createMessage = ({ message, type, duration, showClose }) => {
  const messageApp = createApp({
    render() {
      return h(Message, {
        message,
        type,
        duration,
        showClose,
        onClose: () => {
          messageApp.unmount();
          document.body.removeChild(div);
        },
      });
    },
  });

  const div = document.createElement('div');
  document.body.appendChild(div);
  messageApp.mount(div);
};

const types = ['success', 'warning', 'info', 'error'];
const ElMessage: any = {};
types.forEach((type) => {
  ElMessage[type] = (options) => {
    if (typeof options === 'string') {
      options = {
        message: options,
      };
    }
    return createMessage({ ...options, type });
  };
});

export default ElMessage;
