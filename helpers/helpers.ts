export const invokeAsyncWithDelay = async <T>(
  getData: () => T | false,
  delay: number = 1000,
): Promise<T> => {
  const response = getData();
  return await new Promise<T>((resolve, reject) =>
    setTimeout(() => (response ? resolve(response) : reject(null)), delay),
  );
};

type TitleData = {
  lineName: string;
  incomingEvents: number;
};

export const setTitleData = (titleData: TitleData) => JSON.stringify(titleData);
export const getTitleData = (title: string) => {
  if (title) {
    try {
      return JSON.parse(title) as TitleData;
    } catch (e) {
      console.error("error !log", e);
    }
  }
};
