import { Account } from "../models";

const SESSION_KEY = "session";

export const storeUserAccount = (user: Account) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export const getUserAccount = (): Account => {
  return JSON.parse(localStorage.getItem(SESSION_KEY)!) as Account;
};

export const removeUserAccount = () => {
  localStorage.removeItem(SESSION_KEY);
};
