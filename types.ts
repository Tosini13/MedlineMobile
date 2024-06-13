import { eventType } from "./constants";

export type EventType = {
  id: string;
  title: string;
  date: string;
  description: string;
  lineId: string;
  type: (typeof eventType)[keyof typeof eventType];
};

export type LineType = {
  id: string;
  title: string;
  description?: string;
  color: string;
  ownerId: string;
};
