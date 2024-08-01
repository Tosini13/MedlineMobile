import { eventType } from "./constants";

export type DocumentType = {
  name: string;
  path: string;
  type?: string;
};

export type EventType = {
  id: string;
  title: string;
  date: string;
  description: string;
  type: (typeof eventType)[keyof typeof eventType];
  documents?: DocumentType[];
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
