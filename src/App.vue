<script setup lang="ts">
  import TheSideNavBar from '@/components/TheSideNavBar.vue';
</script>

<template>
  <v-card
    color="background">
    <v-layout>
      <the-side-nav-bar></the-side-nav-bar>
      <v-main
        class="h-screen overflow-y-auto">
        <router-view />
      </v-main>
    </v-layout>
  </v-card>
</template>