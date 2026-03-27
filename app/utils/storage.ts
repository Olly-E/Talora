import Cookies from "js-cookie";

const STORAGE_PREFIX = "RMTT_";

export const tokenStorage = {
  getToken: () => {
    return Cookies.get(`${STORAGE_PREFIX}TOKEN`) as string;
  },

  setToken: (token: string) => {
    Cookies.set(`${STORAGE_PREFIX}TOKEN`, token);
  },

  clearToken: () => {
    Cookies.remove(`${STORAGE_PREFIX}TOKEN`);
  },
};

export const userIDStorage = {
  getUserID: () => {
    return Cookies.get(`${STORAGE_PREFIX}USER_ID`) as string;
  },

  setUserID: (userID: string) => {
    Cookies.set(`${STORAGE_PREFIX}USER_ID`, userID);
  },

  clearUserID: () => {
    Cookies.remove(`${STORAGE_PREFIX}USER_ID`);
  },
};

export const roleStorage = {
  getRole: () => {
    return Cookies.get(`${STORAGE_PREFIX}ROLE`) as string;
  },

  setRole: (role: string) => {
    Cookies.set(`${STORAGE_PREFIX}ROLE`, role.toUpperCase());
  },

  clearRole: () => {
    Cookies.remove(`${STORAGE_PREFIX}ROLE`);
  },
};

export const storage = {
  clear: () => {
    tokenStorage.clearToken();
    userIDStorage.clearUserID();
    roleStorage.clearRole();
  },
};
