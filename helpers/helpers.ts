export const invokeAsyncWithDelay = async <T>(
  getData: () => T | false,
  delay: number = 1000,
): Promise<T> => {
  const response = getData();
  return await new Promise<T>((resolve, reject) =>
    setTimeout(() => (response ? resolve(response) : reject(null)), delay),
  );
};
