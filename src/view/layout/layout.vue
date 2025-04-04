<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        theme="blur"
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          :prepend-avatar="LogoPng"
          title="能源交易系统"
          nav
          class="system-item"
        >
        </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item
            v-for="(item, index) in navItems"
            :key="index"
            :value="item.value"
            :title="item.title"
            :size="24"
            :prepend-icon="getNavIcon(item.value)"
            @click="handleNavClick(item)"
            :class="currentNav === item.value ? 'active-nav-item' : ''"
          >
            <v-tooltip
              v-if="rail"
              activator="parent"
              location="right"
              :text="getNavLabel(item.value)"
            ></v-tooltip>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <navbar @toggleClick="toggleSideBar" :opened="rail"></navbar>
        <v-container fluid class="content-container">
          <router-view v-slot="{ Component }">
            <v-fade-transition mode="out-in">
              <component :is="Component" />
            </v-fade-transition>
          </router-view>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { NavKey, INavItem } from '@/types/layout';
import LogoPng from '@/assets/img/logo.png';
import Navbar from '@/components/Navbar.vue';
import { useCommonStore } from '@/store/modules/common';
const router = useRouter();
const commonStore = useCommonStore();
const navItems: INavItem[] = [
  {
    title: '总览',
    value: 'dashboard',
  },
  {
    title: '交易日历',
    value: 'trading-calendar',
    path: '/trading-calendar',
  },
  {
    title: '中长期交易模块',
    value: 'long-term',
    path: '/long-term',
  },
  {
    title: '现货交易模块',
    value: 'spot',
  },
  {
    title: '系统设置',
    value: 'settings',
  },
  {
    title: '用户管理',
    value: 'user',
    path: '/userManagement',
  },
];

// 获取导航图标
const getNavIcon = (key: NavKey): string => {
  const iconMap: Record<NavKey, string> = {
    dashboard: 'mdi-chart-areaspline',
    'trading-calendar': 'mdi-calendar',
    'long-term': 'mdi-polymer',
    spot: 'mdi-blur',
    settings: 'mdi-cog',
    user: 'mdi-account-wrench-outline',
  };
  return iconMap[key];
};
// 获取导航标签（简短文字）
const getNavLabel = (key: NavKey): string => {
  const labelMap: Record<NavKey, string> = {
    dashboard: '首页',
    'trading-calendar': '日历',
    'long-term': '中长期',
    spot: '现货',
    settings: '设置',
    user: '用户',
  };
  return labelMap[key];
};

const handleNavClick = (item: INavItem) => {
  commonStore.setPageText(getNavLabel(item.value));
  currentNav.value = item.value;
  if (item.path) {
    router.push(item.path);
    rail.value = true;
  } else {
    router.push('/');
  }
};

const drawer = ref(true);
const rail = ref(true);

// 当前选中的导航项
const currentNav = ref('dashboard');

const toggleSideBar = () => {
  rail.value = !rail.value;
};
</script>

<style>
.v-card {
  height: 100%;
}
.v-layout {
  height: 100%;
}
.v-navigation-drawer .v-list {
  margin-top: 24px;
}
.v-list .v-list-item--nav:not(:only-child) {
  margin-bottom: 10px;
}
.v-list-item--variant-text .v-list-item__overlay {
  background-color: transparent;
}
.active-nav-item {
  color: rgb(64, 158, 255) !important;
  background-color: rgb(48, 64, 86, 1) !important;
  position: relative;
}
.v-navigation-drawer__content {
  background-color: rgba(48, 65, 86, 0.9);
  color: #fff;
}
.system-item.v-list-item--nav {
  padding-top: 12px;
  padding-bottom: 12px;
}
.system-item .v-list-item-title {
  font-weight: bold;
  font-size: 14px;
}
.v-list .v-list-item .v-list-item-title {
  font-size: 12px;
}

.content-container {
  height: calc(100% - 50px);
}
</style>
