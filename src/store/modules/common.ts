// src/stores/counter.ts
import { defineStore } from 'pinia';

interface CommonState {
  pageText: string;
}

export const useCommonStore = defineStore('common', {
  state: (): CommonState => ({
    pageText: '首页',
  }),
  actions: {
    setPageText(val: string) {
      this.pageText = val;
    },
  },
});
