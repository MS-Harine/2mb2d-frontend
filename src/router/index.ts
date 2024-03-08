import SeatPage from "@/pages/seat/SeatPage.vue";
import DevelopmentPage from "@/pages/DevelopmentPage.vue";
import UtilPage from "@/pages/UtilPage.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/development',
      name: "development",
      component: DevelopmentPage
    },
    {
      path: '/seat',
      name: "seat",
      component: SeatPage
    },
    {
      path: '/util',
      name: "util",
      component: UtilPage
    }
  ],
});

export default router;