<script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  import { useSeatStore } from '@/stores/seat';

  const emits = defineEmits<{
    drag: [param: { event: DragEvent, name: string }],
    leaderChanged: [users: Array<string>]
  }>();
  const selectedUsers = ref([] as string[]);
  const seatStore = useSeatStore();
  let userList = seatStore.userList.slice();
  userList.sort();
  
  const users = [] as Array<Array<string>>;
  let numInRow = 7;
  while (userList.length) {
    if (userList.length >= numInRow)
      users.push(userList.splice(0, numInRow));
    else {
      let empty = Array(numInRow - userList.length).fill("");
      userList.push(...empty);
      users.push(userList.splice(0, numInRow));
    }
  }
</script>

<template>
  <v-item-group multiple
    v-model:model-value="selectedUsers">
    <v-container
      class="border"
      style="min-width: 614px;">
      <v-row
        v-for="(userRow, row) in users"
        :key="row">
        <v-col
          v-for="(user, col) in userRow"
          :key="col">
          <v-item 
            v-slot="{ isSelected, toggle }"
            :value="user">
            <v-card
              class="d-flex flex-column pt-1 pb-1 pl-2 pr-2"
              :class="!!user ? '' : 'border-none'"
              :color="isSelected ? 'primary' : 'on-surface'"
              variant="outlined"
              @click="(arg) => {
                toggle && toggle();
                $emit('leaderChanged', selectedUsers);
              }"
              draggable="true"
              @dragstart="(event) => $emit('drag', {event: event, name: user})"
              @drop="(e) => console.log(e)"
              @dragover.prevent
              @dragenter.prevent>
              <span :class="isSelected ? 'font-bold' : ''">{{ user }}</span>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>