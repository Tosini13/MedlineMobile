export const invokeAsyncWithDelay = async <T>(
  getData: () => T,
  delay: number = 1000,
): Promise<T> => {
  await new Promise((resolve) => setTimeout(() => resolve(null), delay));
  return getData();
};
