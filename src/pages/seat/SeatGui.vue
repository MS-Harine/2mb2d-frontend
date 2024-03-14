<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    users: {
      type: Array<string>,
      required: true,
    }
  });
  const emits = defineEmits<{
    drop: [param: { event: DragEvent, index: number }]
    maxSeatIdx: [num: number]
  }>();
  
  const seatSetting = [
    [0, 1, null, null, 12, 13, 14],
    [2, 3, null, null, 15, null, 16],
    [4, 5, null, null, 17, null, 18],
    [6, 7, null, null, 19, null, 20],
    [8, 9, null, null, 21, 22, 23],
    [10, 11, null, null, 24, null, 25]
  ];
  emits('maxSeatIdx', Math.max.apply(null, 
      seatSetting.map(arr => Math.max.apply(null, arr.filter(e => e !== null) as Array<number>))))
  const colorSetting = [
    [0, 0, 0, 0, 3, 3, 3],
    [0, 0, 0, 0, 3, 3, 3],
    [1, 1, 1, 1, 4, 4, 4],
    [1, 1, 1, 1, 4, 4, 4],
    [2, 2, 2, 2, 5, 5, 5],
    [2, 2, 2, 2, 5, 5, 5]
  ];
  const colors = ['red', '#FF7444', '#63BAAB', 'green', 'blue', '#724F00', 'purple'];

  const usersAsGrid = (users: Array<string>): Array<Array<{name: string, option: number}>> => {
    const grid = new Array<Array<{name: string, option: number}>>(6);
    for (let i = 0; i < 6; i++)
      grid[i] = new Array<{name: string, option: number}>(7).fill({name: "", option: -1});

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (seatSetting[i][j] != null)
          grid[i][j] = {name: users[seatSetting[i][j]!], option: seatSetting[i][j]!};
      }
    }

    return grid;
  }
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
      v-for="(userRow, row) in usersAsGrid(props.users)"
      :key="row">
      <v-col
        v-for="(userCol, col) in userRow"
        :key="col">
        <v-card v-if="userCol.option >= 0"
          class="d-flex flex-column pt-1 pb-1 pl-2 pr-2"
          :color="colors[colorSetting[row][col]]"
          variant="outlined"
          @drop="(event) => $emit('drop', {event: event, index: userCol.option})"
          @dragover.prevent
          @dragenter.prevent>
          <span class="text-caption text-grey">{{ userCol.option }}</span>
          <span>{{ userCol.name }}</span>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>