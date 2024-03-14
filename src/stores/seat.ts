import { batchCurrent } from "@/service/seatService";
import { defineStore } from "pinia";
import moment from 'moment';

interface SeatInfo {
  users: Array<string>,
  temporalUsers: Array<string>,
  lastUpdated: Date | null,
}

export const useSeatStore = defineStore('seat', {
  state: (): SeatInfo => {
    const data = localStorage.getItem('seatInfo');

    return data ? JSON.parse(data) : {
      users: [],
      temporalUsers: [],
      lastUpdated: null
    };
  },
  getters: {
    lastUpdatedLocale: (state): string | null => {
      return state.lastUpdated ? moment(state.lastUpdated).format("YYYY.M.D H:m:s") : null;
    },
    userList: (state): Array<string> => {
      return state.users ? state.users : [];
    },
    temporalUserList: (state): Array<string> => {
      return state.temporalUsers ? state.temporalUsers : [];
    },
    numberOfUsers: (state): number => {
      return state.users.length;
    }
  },
  actions: {
    async fetchData() {
      const newUsers = await batchCurrent({ });
      this.users = newUsers;
      this.lastUpdated = new Date();

      const seatInfo = {
        users: this.users,
        temporalUsers: this.temporalUsers,
        lastUpdated: this.lastUpdated
      } as SeatInfo;
      localStorage.setItem('seatInfo', JSON.stringify(seatInfo));

      return newUsers;
    },
    async updateTemporalUsers(users: Array<string>) {
      this.temporalUsers = users;
    }
  }
})