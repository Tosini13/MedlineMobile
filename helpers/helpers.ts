import { EventType, LineType } from "@/types";
import {
  getLineEventsMockData,
  getLinesMockData,
} from "./mockData/linesMockAPIs";

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

export type FetchLineAndEventType = {
  line: LineType[];
  events: EventType[];
};

export const fetchLineAndEvents = async (
  lineId: string,
): Promise<FetchLineAndEventType> => {
  const line = await invokeAsyncWithDelay(() =>
    Promise.all([getLinesMockData(lineId), getLineEventsMockData(lineId)]),
  );

  return {
    line: line[0],
    events: line[1],
  };
};
