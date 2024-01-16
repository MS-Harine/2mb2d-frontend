<script setup lang="ts">
  import { defineProps } from 'vue';

  defineProps({
    users: {
      type: Array<Array<{name: string, option: number}>>,
      required: true,
    },
  });

  const colors = [
    'red',
    '#FF7444',
    '#63BAAB',
    'green',
    'blue',
    '#724F00',
    'purple'
  ];
</script>

<template>
  <v-container
    class="border"
    style="min-width: 614px;">
    <v-row>
      <v-col class="text-left">
        <v-card 
          variant="tonal"
          class="pl-3">문</v-card>
      </v-col>
      <v-col class="text-center">
        <v-card 
          variant="tonal">칠판</v-card>
      </v-col>
      <v-col class="text-right">
        <v-card 
          variant="tonal"
          class="pr-3">교탁</v-card>
      </v-col>
    </v-row>
    <v-row 
      v-for="(userRow, row) in users"
      :key="row">
      <v-col
        v-for="(userCol, col) in userRow"
        :key="col">
        <v-sheet>
          <v-card v-if="userCol.option >= 0"
            class="d-flex flex-column pt-1 pb-1 pl-2 pr-2"
            :color="userCol.option < 12 ? 
                    colors[Math.floor(userCol.option / 4)] :
                    colors[Math.floor((userCol.option - 11) / 4) + 3]"
            variant="outlined">
            <span class="text-caption text-grey">{{ userCol.option }}</span>
            <span>{{ userCol.name }}</span>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>