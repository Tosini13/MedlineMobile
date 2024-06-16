import { eventType } from "./constants";

export type EventType = {
  id: string;
  title: string;
  date: string;
  description: string;
  type: (typeof eventType)[keyof typeof eventType];
};

export type MockEventType = {
  lineId: string;
  id: string;
  title: string;
  date: string;
  description: string;
  type: (typeof eventType)[keyof typeof eventType];
};

export type LineType = {
  id: string;
  title: string;
  description?: string;
  color: string;
  ownerId: string;
};
