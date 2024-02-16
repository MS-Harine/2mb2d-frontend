import { fetchUsers } from "@/service/seatService";
import { defineStore } from "pinia";
import moment from 'moment';

interface SeatInfo {
  users: Array<string>,
  lastUpdated: Date | null,
}

const seatSetting = [
  [0, 1, null, null, 12, 13, 14],
  [2, 3, null, null, 15, null, 16],
  [4, 5, null, null, 17, null, 18],
  [6, 7, null, null, 19, null, 20],
  [8, 9, null, null, 21, 22, 23],
  [10, 11, null, null, 24, null, 25]
];

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

      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
          if (seatSetting[i][j] != null)
            grid[i][j] = {name: users[seatSetting[i][j]!], option: seatSetting[i][j]!};
        }
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