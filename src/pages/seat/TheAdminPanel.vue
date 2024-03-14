<script setup lang="ts">
  import * as service from '@/service/seatService';
  import { useSeatStore } from '@/stores/seat';
  import UserList from '@/components/UserList.vue';
  import SeatGui from './SeatGui.vue';
  import { ref } from 'vue';
  import crypto from 'crypto';
  import { storeToRefs } from 'pinia';

  const seatStore = useSeatStore();
  const { temporalUserList } = storeToRefs(seatStore);
  const selectedLeaders = ref([] as Array<string>);
  const disabled = ref(false);
  const isValid = ref(true);
  const password = ref("");

  const batchRandom = async () => {
    const users = await service.batchRandom({ apiver: 0 });
    seatStore.updateTemporalUsers(users);
  }

  const batchLeader = async () => {
    const users = await service.batchLeader({
      apiver: 0,
      leaders: selectedLeaders.value
    });
    seatStore.updateTemporalUsers(users);
  }

  const HASH_PASSWORD = "PrBSGeI5882Ze5/mORN9FbALrLxPkjjPWYQKynNa2jeUVf9MSqOpx3JXXsB4C861ReVGQePpPbuOOA7dEv8D5Q==";
  const checkPassword = (password: string): boolean => {
    const hash= crypto.createHash("sha512").update(password).digest("base64");
    if (hash == HASH_PASSWORD)
      return true;
    return false;
  }

  const confirmSeat = async () => {
    const users = await service.confirmSeat({ 
      users: temporalUserList.value,
      password: "",
      apiver: 0 
    });
    if (users.length > 0)
      alert("배치가 완료되었습니다. 데이터를 갱신해서 확인해주세요.");
    else
      alert("오류가 발생했습니다.");
  }

  const onDrag = (param: {event: DragEvent, name: string}) => {
    if (param.event.dataTransfer) {
      param.event.dataTransfer.dropEffect = "move";
      param.event.dataTransfer.effectAllowed = "move";
      param.event.dataTransfer.setData('name', param.name);
    }
  }

  const onDrop = (param: {event: DragEvent, index: number}) => {
    if (param.event.dataTransfer) {
      const name = param.event.dataTransfer.getData('name');
      const newList = temporalUserList.value.slice();
      newList[param.index] = name;
      seatStore.updateTemporalUsers(newList);
    }
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
              <v-text-field 
                label="Password" 
                class="w-75 align-self-center"
                type="password"
                v-model:model-value="password">
              </v-text-field>
              <v-card-text 
                v-if="!isValid"
                class="text-red">
                비밀번호가 틀렸습니다
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text="Close"
                  @click="() => {
                    isActive.value = false;
                    password = '';
                  }"
                ></v-btn>
                <v-btn
                  text="Confirm"
                  @click="() => {
                    if (checkPassword(password)) {
                      isActive.value = false;
                      password = '';
                      isValid = true;
                      confirmSeat();
                    }
                    else {
                      isValid = false;
                    }
                  }"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>
      <p>리더 설정</p>
      <user-list 
        @drag="onDrag"
        @leader-changed="(leaders) => selectedLeaders = leaders">
      </user-list>
      <p class="mt-5">임시 배치</p>
      <seat-gui 
        :users="temporalUserList"
        @drop="onDrop"
        @maxSeatIdx="(num: number) => {
          if (temporalUserList.values.length == 0)
            seatStore.updateTemporalUsers(Array(num).fill(''));
        }"
        key="admin"></seat-gui>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>