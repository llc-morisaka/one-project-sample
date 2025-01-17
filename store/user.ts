import type { User } from "@/interfaces"
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),
  actions: {
    setUser(user: User, token: string) {
      console.log("setUser called with:", user.name, token);
      this.user = user;
      this.token = token;
    },
    clearUser() {
      this.user = null;
      this.token = null;
    },
  },
});

