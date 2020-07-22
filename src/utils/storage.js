export const getFromLocalStorage = (key, isJson = true) => {
  const item = localStorage.getItem(key);
  if (isJson) return JSON.parse(item);

  return item;
};

export const setToLocalStorage = (key, item, isJson = true) => {
  localStorage.setItem(key, isJson ? JSON.stringify(item) : item);
};
