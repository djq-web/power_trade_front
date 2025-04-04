<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card :text="contentText" :title="title">
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn @click="handelAction(0)"> 取消 </v-btn>
          <v-btn
            color="blue"
            text="确定"
            class="text-uppercase"
            variant="text"
            @click="handelAction(1)"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue';
const emit = defineEmits(['handleDialog']);
const props = defineProps({
  title: {
    type: String,
    default: '提示',
  },
  contentText: { type: String, default: '确认删除吗？' },
});
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};
const handelAction = (type: number) => {
  dialog.value = false;
  if (type === 1) {
    emit('handleDialog');
  }
};

defineExpose({ openDialog });
</script>
