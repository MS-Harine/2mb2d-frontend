<script setup lang="ts">
  import { ref } from 'vue';
  import ExamplePanel from '@/pages/panels/ExamplePanel.vue';
  
  const panel = ref([0]);
</script>

<template>
  <v-card 
    class="ma-10 pa-10"
    style="min-width: 500px;">
    <v-card-title>프로젝트를 연습해보세요!</v-card-title>
    <v-card-text>
      <p>여러 기능들을 개발해 주실 분들을 찾습니다</p>
      <p>Pull Request를 날려주시면 Code review 이후 Accept 해드립니다!</p>
      <v-divider class="mt-3 mb-3"></v-divider>
      <p class="text-h5">Instruction</p>
      <ol>
        <li>panels 폴더에 ExamplePanel을 복사한다.</li>
        <li>본인이 원하는 기능을 만든다.</li>
        <li>PR을 날린다!</li>
      </ol>
    </v-card-text>
  </v-card>
  <v-expansion-panels 
    class="pa-10"
    style="min-width: 700px;"
    v-model="panel"
    multiple>
    <example-panel></example-panel>
  </v-expansion-panels>
</template>
