import { fetchUsers } from "@/service/seatService";
import { defineStore } from "pinia";
import moment from 'moment';

interface SeatInfo {
  users: Array<string>,
  lastUpdated: Date | null,
}

export const useSeatStore = defineStore('seat', {
  state: (): SeatInfo => {
    const data = localStorage.getItem('seatInfo');

    return data ? JSON.parse(data) : {
      users: [],
      lastUpdated: null
    };
  },
  getters: {
    lastUpdatedLocale: (state): string | null => {
      return state.lastUpdated ? moment(state.lastUpdated).format("YYYY.M.D H:m:s") : null;
    }
  },
  actions: {
    async fetchData() {
      const newUsers = await fetchUsers({ });
      this.users = newUsers;
      this.lastUpdated = new Date();

      const seatInfo = {
        users: this.users,
        lastUpdated: this.lastUpdated
      } as SeatInfo;
      localStorage.setItem('seatInfo', JSON.stringify(seatInfo));

      return newUsers;
    },
    async confirmData() {
      
    }
  }
})