import { EventType, LineType, MockEventType } from "@/types";
import { MOCK_EVENTS } from "./mockEvents";
import { MOCK_LINES } from "./mockLines";

export const getLinesMockData = (linedId?: string): LineType[] => {
  if (linedId) {
    const line = MOCK_LINES.find((line) => line.id === linedId);
    return line ? [line] : [];
  }
  return MOCK_LINES;
};

export const addLineMockData = (line: Omit<LineType, "events" | "id">) => {
  const newLine = {
    ...line,
    id: Math.random().toString(36).substr(2, 9),
    events: [],
  };
  return newLine;
};

export const getLineEventsMockData = (
  lineId: string,
  eventId?: string,
): MockEventType[] => {
  const line = MOCK_LINES.find((line) => line.id === lineId);

  if (!line) return [];

  if (eventId) {
    return MOCK_EVENTS.filter(
      (event) => event.lineId === lineId && event.id === eventId,
    );
  }

  return MOCK_EVENTS.filter((event) => event.lineId === lineId);
};

export const createEventMockData = (event: Omit<EventType, "id">) => ({
  ...event,
  id: Math.random().toString(36).substr(2, 9),
});
