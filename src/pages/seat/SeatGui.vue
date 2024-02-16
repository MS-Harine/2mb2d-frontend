<script setup lang="ts">
  import { ref } from 'vue';
  import { defineProps } from 'vue';

  const props = defineProps({
    users: {
      type: Array<string>,
      required: true,
    }
  });
  
  const seatSetting = [
    [0, 1, null, null, 12, 13, 14],
    [2, 3, null, null, 15, 16, 17],
    [4, 5, null, null, 18, null, 19],
    [6, 7, null, null, 20, null, 21],
    [8, 9, null, null, 22, null, 23],
    [10, 11, null, null, 24, null, 25]
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

  const userGrid = ref(usersAsGrid(props.users));
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
        v-for="(userRow, row) in userGrid"
        :key="row">
        <v-col
          v-for="(userCol, col) in userRow"
          :key="col">
          <v-card v-if="userCol.option >= 0"
            class="d-flex flex-column pt-1 pb-1 pl-2 pr-2"
            :color="userCol.option < 12 ? 
                    colors[Math.floor(userCol.option / 4)] :
                    colors[Math.floor((userCol.option - 11) / 4) + 3]"
            variant="outlined">
            <span class="text-caption text-grey">{{ userCol.option }}</span>
            <span>{{ userCol.name }}</span>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>