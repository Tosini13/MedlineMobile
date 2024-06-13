import { db } from "@/firebaseConfig";
import { EventType, LineType } from "@/types";
import { getEvent } from "./getEvent";
import { getEvents } from "./getEvents";
import { getLine } from "./getLine";
import { getLines } from "./getLines";

export const API = {
  lines: {
    get: () => getLines(db) as Promise<LineType[]>,
    getById: (lineId: string) =>
      getLine(db, lineId) as Promise<LineType | null>,
  },
  events: {
    get: (lineId: string) => getEvents(db, lineId) as Promise<EventType[]>,
    getById: (lineId: string, eventId: string) =>
      getEvent(db, lineId, eventId) as Promise<EventType | null>,
  },
};
