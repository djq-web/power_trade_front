<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <div class="page-title">{{ currentText }}</div>

    <div class="right-menu">
      <div class="text-center-box">
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <div class="avatar-wrapper">
              <div class="user-avatar">
                <v-img
                  v-bind="props"
                  :src="AccountIcon"
                  width="24"
                  height="24"
                />
              </div>
              <v-img
                v-bind="props"
                :src="ArrowDownIcon"
                width="16"
                height="16"
              />
            </div>
          </template>
          <v-list class="settingContainer">
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :value="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import Hamburger from '@/components/Hamburger.vue';
import { useCommonStore } from '@/store/modules/common';
import AccountIcon from '@/assets/img/account-icon.svg';
import ArrowDownIcon from '@/assets/img/arrow-down.svg';
const commonStore = useCommonStore();
const emit = defineEmits(['toggleClick']);
const props = defineProps({
  opened: {
    type: Boolean,
    default: false,
  },
});
const currentText = computed(() => commonStore.pageText);
const items = [{ value: 0, title: '退出登录' }];
const toggleSideBar = () => {
  console.log(9999, props.opened);
  emit('toggleClick');
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .page-title {
    font-size: 14px;
    color: #44566c;
    display: flex;
    align-items: center;
    height: 100%;
    float: left;
    margin-left: 6px;
  }

  .right-menu {
    float: right;
    height: 100%;
    margin-right: 10px;
    &:focus {
      outline: none;
    }
    .text-center-box {
      height: 100%;
      .avatar-wrapper {
        display: flex;
        align-items: center;
        gap: 4px;
        height: 100%;
        .user-avatar {
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 32px;
          border: solid 1px rgba(108, 124, 144, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>