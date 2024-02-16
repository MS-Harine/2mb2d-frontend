import SeatPage from "@/pages/seat/SeatPage.vue";
import AccountPage from "@/pages/AccountPage.vue";
import LaunchPage from "@/pages/LaunchPage.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/account',
      name: "account",
      component: AccountPage
    },
    {
      path: '/seat',
      name: "seat",
      component: SeatPage
    },
    {
      path: '/lunch',
      name: "lunch",
      component: LaunchPage
    },
  ],
});

export default router;