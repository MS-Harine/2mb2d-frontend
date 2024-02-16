<script setup lang="ts">
  import TheBatchPanel from './TheBatchPanel.vue';
  import TheAdminPanel from './TheAdminPanel.vue';
  import { ref } from 'vue';

  const panel = ref([0]);

</script>

<template>
  <v-expansion-panels 
    class="pa-10"
    style="min-width: 742px;"
    v-model="panel"
    multiple>
    <the-batch-panel></the-batch-panel>
    <the-admin-panel></the-admin-panel>
  </v-expansion-panels>
</template>
