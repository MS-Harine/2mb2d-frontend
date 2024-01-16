import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import 'vuetify/styles';
import { createVuetify, type ThemeDefinition } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#6200EE',
    "primary-variant": '#3700B3',
    secondary: '#03DAC6',
    "secondary-variant": '#018786',
    error: '#B00020',
    "on-primary": '#FFFFFF',
    "on-secondary": '#000000',
    "on-background": '#000000',
    "on-surface": '#000000',
    "on-error": '#FFFFFF'
  },
};

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#292929',
    surface: '#121212',
    primary: '#BB86FC',
    "primary-variant": '#3700B3',
    secondary: '#03DAC6',
    "secondary-variant": '#03DAC6',
    error: '#CF6679',
    "on-primary": '#000000',
    "on-secondary": '#000000',
    "on-background": '#FFFFFF',
    "on-surface": '#FFFFFF',
    "on-error": '#000000'
  },
};

const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: lightTheme,
      dark: darkTheme
    }
  }
});

createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app');