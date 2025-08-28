import { create } from "zustand";

const useUsernameStore = create((set) => ({
  username: localStorage.getItem("user"),
  userFullName: localStorage.getItem("userFullName"),
  userPhone: localStorage.getItem("userPhone"),

  setUsername: (newUser) => {
    localStorage.setItem("user", newUser);
    set({ username: newUser });
  },

  clearUsername: () => {
    localStorage.removeItem("user");
    set({ username: "" });
  },

  setUserFullName: (userFullN) => {
    localStorage.setItem("userFullName", userFullN);
    set({ userFullName: userFullN });
  },

  setUserPhone: (userPh) => {
    localStorage.setItem("userPhone", userPh);
    set({ userPhone: userPh });
  },

}));

export default useUsernameStore;
