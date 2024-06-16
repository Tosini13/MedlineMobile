import { db } from "@/firebaseConfig";
import { EventType, LineType } from "@/types";
import { addEvent } from "./addEvent";
import { addLine } from "./addLine";
import { deleteEvent } from "./deleteEvent";
import { deleteLine } from "./deleteLine";
import { getEvent } from "./getEvent";
import { getEvents } from "./getEvents";
import { getLine } from "./getLine";
import { getLines } from "./getLines";
import { updateEvent } from "./updateEvent";
import { updateLine } from "./updateLine";

export const API = {
  lines: {
    get: () => getLines(db) as Promise<LineType[]>,
    getById: (lineId: string) =>
      getLine(db, lineId) as Promise<LineType | null>,
    add: (line: Omit<LineType, "id">) => addLine(db, line) as Promise<LineType>,
    update: (lineId: string, line: Omit<LineType, "id">) =>
      updateLine(db, lineId, line) as Promise<LineType>,
    delete: (lineId: string) => deleteLine(db, lineId) as Promise<string>,
  },
  events: {
    get: (lineId: string) => getEvents(db, lineId) as Promise<EventType[]>,
    getById: (lineId: string, eventId: string) =>
      getEvent(db, lineId, eventId) as Promise<EventType | null>,
    add: (lineId: string, event: Omit<EventType, "id">) =>
      addEvent(db, lineId, event) as Promise<EventType>,
    update: (lineId: string, eventId: string, event: Omit<EventType, "id">) =>
      updateEvent(db, lineId, eventId, event) as Promise<EventType>,
    delete: (lineId: string, eventId: string) =>
      deleteEvent(db, lineId, eventId) as Promise<string>,
  },
};
