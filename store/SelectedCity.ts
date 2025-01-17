import type { City } from "@/interfaces"
import { defineStore } from 'pinia';

export const useSelectedCityStore = defineStore('city', {
  state: () => ({
    city: null as City | null,
  }),
  actions: {
    setSelectedCity(city: City) {
      this.city = city;
    },
    clearSelectedCity() {
      this.city = null;
    },
  },
});

