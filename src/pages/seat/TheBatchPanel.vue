<script setup lang="ts">
  import SeatGui from './SeatGui.vue';
  import { useSeatStore } from '@/stores/seat';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';

  const userStore = useSeatStore();
  const { lastUpdatedLocale, userList } = storeToRefs(userStore);
  const disabled = ref(false);
  const alert = ref(false);
  const alertContent = ref();
  const isLoading = ref(false);

  const timeDiff = new Date().getTime() - new Date(userStore.lastUpdated ?? 0).getTime();
  if (timeDiff < 60 * 1000) {
    disabled.value = true;
    setTimeout(() => {
      disabled.value = false;
    }, timeDiff);
  }

  const fetchData = async () => {
    disabled.value = true;
    isLoading.value = true;

    try {
      await userStore.fetchData();
      alertContent.value = 'success';
      setTimeout(() => {
        disabled.value = false;
      }, 60 * 1000);
    }
    catch {
      alertContent.value = 'error';
      disabled.value = false;
    }
    finally {
      alert.value = true;
      setTimeout(() => {
        alert.value = false;
      }, 2000);
      isLoading.value = false;
    }
  }

</script>

<template>
  <v-expansion-panel
      bg-color="surface">
      <v-expansion-panel-title>
        <template v-slot:default="{ expanded }">
          <v-row no-gutters>
            <v-col cols="4" class="d-flex justify-start">
              자리 배치표
            </v-col>
            <v-col
              cols="8"
              class="text-grey">
              <v-fade-transition leave-absolute>
                <span v-if="!expanded">
                  {{ lastUpdatedLocale ? lastUpdatedLocale + " 기준" : "데이터 갱신 필요" }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="d-flex align-end mt-3 mb-3">
          <v-btn 
            color="primary"
            class="mr-5 "
            :disabled="disabled"
            @click="fetchData">데이터 갱신</v-btn>
          <p class="text-caption text-grey flex-grow-1">
            최근 갱신일: {{ lastUpdatedLocale }}
            <v-progress-circular 
              indeterminate
              size="20"
              width="3"
              color="primary"
              v-if="isLoading"></v-progress-circular>
          </p>
          <v-alert
            class="ml-3"
            :type="alertContent"
            :title="alertContent"
            variant="tonal"
            v-model="alert"
            density="compact"></v-alert>
        </div>
        <seat-gui 
          :users="userList"
          key="batch"></seat-gui>
      </v-expansion-panel-text>
    </v-expansion-panel>
</template>