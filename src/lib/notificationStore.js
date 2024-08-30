import { create } from "zustand";
import apiRequest from "./apiRequest";

export const useNotificationStore = create((set) => ({
  number: 0,
  fetch: async () => {
    const res = await apiRequest.get("/users/notification");
    set({ number: res.data });
  },
  decrease: () => {
    set((prev) => {
      return { number: prev.number - 1 };
    });
  },
  reset: () => {
    set({ number: 0 });
  },
}));