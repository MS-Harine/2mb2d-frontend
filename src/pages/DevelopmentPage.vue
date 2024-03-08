<script setup>
  const frontFrameworkList = [{
    name: 'Vue3',
    category: 'Web Framework'
  }, {
    name: 'vue-router',
    category: 'Router Framework'
  }, {
    name: 'Vuetify',
    category: 'Design Framework'
  }, {
    name: 'Tailwind CSS',
    category: 'Design Framework'
  }, {
    name: 'Pinia',
    category: 'State Management Library'
  }, {
    name: 'Axios',
    category: 'Asynchronous Ajax Networking'
  }, {
    name: 'Cheerio',
    category: 'HTML Parser'
  }, {
    name: 'crypto',
    category: 'Encrypt/Decrypt Framework'
  }];
  const backFrameworkList = [{
    name: 'Spring Boot',
    category: 'Web Server Framework'
  }, {
    name: 'Thymeleaf',
    category: 'Java Template Engine'
  }, {
    name: 'Project Lombok',
    category: 'Java Automation Library'
  }];
</script>

<template>
  <v-card class="ma-10 pa-10">
    <v-card-title class="text-h6 text-md-h5 text-lg-h4 d-flex justify-center align-center">
      <v-icon icon="mdi-github" class="mr-3" />
      <span>GITHUB 기여하기</span>
    </v-card-title>
    <v-card-text>
      <div class="d-flex justify-center">
        <v-btn 
          variant="text"
          href="https://github.com/MS-Harine/2mb2d-frontend"
          target="_blank"
        >Frontend 바로가기</v-btn>
        <v-btn 
          variant="text"
          href="https://github.com/ssongone/2mb2d"
          target="_blank">Backend 바로가기</v-btn>
      </div>
      <p class="pa-2 text-h5">Front-end 프레임워크</p>
      <v-divider></v-divider>
      <v-list lines="one">
        <v-list-item
          v-for="(item, idx) in frontFrameworkList"
          :key="idx"
          :title="item.name"
          :subtitle="item.category"></v-list-item>
      </v-list>
      <p class="pa-2 text-h5">Back-end 프레임워크</p>
      <v-divider></v-divider>
      <v-list lines="one">
        <v-list-item
          v-for="(item, idx) in backFrameworkList"
          :key="idx"
          :title="item.name"
          :subtitle="item.category"></v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
