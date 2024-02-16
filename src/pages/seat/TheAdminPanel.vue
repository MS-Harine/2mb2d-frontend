<script setup lang="ts">
  import * as service from '@/service/seatService';
  import { useSeatStore } from '@/stores/seat';
  import UserList from '@/components/UserList.vue';
  import SeatGui from './SeatGui.vue';
  import { ref } from 'vue';

  const seatStore = useSeatStore();
  const tempUserList = ref(seatStore.users);
  const selectedLeaders = ref([] as Array<string>);
  const disabled = ref(false);

  const batchRandom = async () => {
    const users = await service.batchRandom({ apiver: 0 });
    tempUserList.value = users;
  }

  const batchLeader = async () => {
    const users = await service.batchLeader({
      apiver: 0,
      leaders: selectedLeaders.value
    });
    tempUserList.value = users;
  }

  const confirmSeat = async () => {
    console.log("Check")
    // const users = await service.confirmSeat({ 
    //   users: tempUserList.value,
    //   password: "",
    //   apiver: 0 
    // });
  }
</script>

<template>
  <v-expansion-panel
    bg-color="surface"
    title="관리자 전용">
    <v-expansion-panel-text>
      <div class="d-flex align-end mt-3 mb-3">
        <v-btn 
          color="primary"
          class="mr-5 "
          :disabled="disabled"
          @click="batchRandom">랜덤 배치</v-btn>
        <v-btn 
          color="secondary"
          class="mr-5 "
          :disabled="disabled"
          @click="batchLeader">리더 배치</v-btn>
        <v-dialog width="300">
          <template v-slot:activator="{ props }">
            <v-btn 
              v-bind="props"
              color="error"
              class="mr-5 "
              :disabled="disabled">배치 확정</v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card title="Dialog">
              <v-card-text>
                비밀번호를 입력하세요
              </v-card-text>
              <v-text-field label="Password" class="w-75 align-self-center"></v-text-field>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close"
                  @click="isActive.value = false"
                ></v-btn>
                <v-btn
                  text="Confirm"
                  @click="confirmSeat"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>
      <p>리더 설정</p>
      <user-list @leader-changed="(leaders) => selectedLeaders = leaders"></user-list>
      <p class="mt-5">임시 배치</p>
      <seat-gui :users="tempUserList"></seat-gui>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>