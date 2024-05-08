export type EventType = {
  id: string;
  title: string;
  date: string;
  description: string;
};

export type LineType = {
  id: string;
  name: string;
  color: string;
  events: EventType[];
};
