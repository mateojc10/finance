export const storeData = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getData = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeData = (key: string) => {
  localStorage.removeItem(key);
};
