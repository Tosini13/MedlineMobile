import { LineType } from "@/types";

export const getLinesMockData = (): LineType[] => [
  {
    id: "aa",
    name: "Knee",
    color: "#f00",
    events: [],
  },
  {
    id: "ab",
    name: "Ankle",
    color: "#ff0",
    events: [],
  },
  {
    id: "ac",
    name: "Hip",
    color: "#0f0",
    events: [],
  },
  {
    id: "ad",
    name: "Shoulder",
    color: "#0ff",
    events: [],
  },
];

export const addLineMockData = (line: Omit<LineType, "events" | "id">) => {
  const newLine = {
    ...line,
    id: Math.random().toString(36).substr(2, 9),
    events: [],
  };
  return newLine;
};
