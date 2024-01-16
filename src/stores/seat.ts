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
    usersAsGrid: (state): Array<Array<{name: string, option: number}>> => {
      const users = state.users;
      const grid = new Array<Array<{name: string, option: number}>>(6);
      for (let i = 0; i < 6; i++)
        grid[i] = new Array<{name: string, option: number}>(7).fill({name: "", option: -1});

      for (let i = 0; i < users.length; i++) {
        if (i < 12)
          grid[Math.floor(i / 2)][i % 2] = {name: users[i], option: i};
        else if (i < 21)
          grid[Math.floor((i - 12) / 3)][(i - 12) % 3 + 4] = {name: users[i], option: i};
        else
          grid[Math.floor((i - 21) / 2) + 3][(i - 21) % 2 * 2 + 4] = {name: users[i], option: i};
      }
      
      return grid;
    },
    lastUpdatedLocale: (state): string | null => {
      return state.lastUpdated ?
             moment(state.lastUpdated).format("YYYY.M.D H:m:s")
             :
             null;
    }
  },
  actions: {
    async fetchData() {
      const newUsers = await fetchUsers();
      this.users = newUsers;
      this.lastUpdated = new Date();

      const seatInfo = {
        users: this.users,
        lastUpdated: this.lastUpdated
      } as SeatInfo;
      localStorage.setItem('seatInfo', JSON.stringify(seatInfo));

      return newUsers;
    }
  }
})