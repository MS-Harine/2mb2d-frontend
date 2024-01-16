import SeatPage from "@/pages/SeatPage.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/account',
      name: "account",
      component: SeatPage
    },
    {
      path: '/seat',
      name: "seat",
      component: SeatPage
    },
    {
      path: '/lunch',
      name: "lunch",
      component: SeatPage
    },
  ],
});

export default router;