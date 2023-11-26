export const setToLocalStorage = (key: string, data: any) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, data);
};

export const getFromLocalStorage = (key: string): any => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};
