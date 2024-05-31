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
