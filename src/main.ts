import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import './assets/global.css';
const lightTheme = {
  dark: false,
  colors: {
    primary: '#6750A4',
    secondary: '#625B71',
    error: '#B3261E',
    success: '#146C2E',
    warning: '#FF8200',
    background: '#FFFBFE',
    surface: '#FFFBFE',
    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',
    'on-background': '#1C1B1F',
    'on-surface': '#1C1B1F',
    'on-error': '#FFFFFF',
    'on-success': '#FFFFFF',
    'on-warning': '#FFFFFF',
  },
};

const darkTheme = {
  dark: true,
  colors: {
    primary: '#D0BCFF',
    secondary: '#CCC2DC',
    error: '#F2B8B5',
    success: '#7CCEA7',
    warning: '#FFBD80',
    background: '#1C1B1F',
    surface: '#1C1B1F',
    'on-primary': '#371E73',
    'on-secondary': '#332D41',
    'on-background': '#E6E1E5',
    'on-surface': '#E6E1E5',
    'on-error': '#601410',
    'on-success': '#072816',
    'on-warning': '#431E00',
  },
};

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme,
    },
  },
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
