/**
 * 获取本地存储
 */
export const getLocalStorage = (itemName: string) => {
  const item = window.localStorage.getItem(itemName);
  if (item) {
    return JSON.parse(item);
  } else {
    return false;
  }
};

/**
 * 设置本地存储
 */
export const setLocalStorage = (itemName: string, value: any) => {
  window.localStorage.setItem(itemName, JSON.stringify(value));
};
