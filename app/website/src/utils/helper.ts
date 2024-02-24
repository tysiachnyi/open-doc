import { ProfileLocalType } from "../types/Profile.types";

export const getUserData = (): ProfileLocalType | null => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const isUserLoggedIn = (): boolean => {
  const user = getUserData();
  if (user) {
    return true;
  }
  return false;
}