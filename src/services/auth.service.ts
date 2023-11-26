import { getFromLocalStorage } from "@/utils/local-storage";

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage("auth");
  return !!authToken?.accessToken;
};
