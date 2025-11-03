const storage = typeof window === "undefined" ? null : localStorage;

export const getLocalStorage = (key: string) => {
  // JSON.parse(storage?.getItem(key) || "{}");
  const value = storage?.getItem(key);
  return value ?? null;
};

export const setLocalStorage = (key: string, value: string) =>
  // storage?.setItem(key, JSON.stringify(value));
  storage?.setItem(key, value);

export const removeLocalStorage = (key: string) => storage?.removeItem(key);
