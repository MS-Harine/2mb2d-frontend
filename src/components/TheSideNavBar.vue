<script setup lang="ts">
  import router from '../router';
  import { ref } from 'vue';
  import { useTheme } from 'vuetify';

  const theme = useTheme();
  const handleItem = (idx: number) => {
    router.replace({ name: linkList[idx].value });
  }

  const isLight = ref('light');
  const changeTheme = () => {
    theme.global.name.value = isLight.value;
  }

  const linkList = [
    {
      icon: 'mdi-account',
      title: '내 정보 확인',
      value: 'account',
    },
    {
      icon: 'mdi-seat',
      title: '자리 배치',
      value: 'seat',
    },
    {
      icon: 'mdi-food-turkey',
      title: '랜덤 점심조',
      value: 'lunch',
    },
  ];
</script>

<template>
  <v-navigation-drawer
    color="surface"
    permanent
    location="left"
    elevation="5">
    <v-list-item 
      title="2MB2D" 
      subtitle="SSAFY 11th Class-22 Embedded"></v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <template v-slot="">
        <div class="d-flex justify-center align-center">
          <v-icon
          color="on-surface"
          icon="mdi-moon-waning-crescent"></v-icon>
          <v-switch
            class="flex-grow-0 ml-5 mr-5"
            v-model="isLight"
            true-value="light"
            false-value="dark"
            label=""
            @change="changeTheme"
            hide-details
            color="primary"></v-switch>
          <v-icon
            color="on-surface"
            icon="mdi-weather-sunny"></v-icon>
        </div>
      </template>
    </v-list-item>
    <v-divider></v-divider>
    <v-list nav>
      <v-list-item v-for="(item, idx) in linkList" 
        color="on-surface"
        :key="idx" 
        :title="item.title"
        :prepend-icon="item.icon"
        :value="item.value"
        @click="handleItem(idx)" ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>