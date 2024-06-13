import { eventType } from "@/constants";
import { MockEventType } from "@/types";

export const MOCK_EVENTS: MockEventType[] = [
  {
    id: "aa1",
    title: "Knee pain",
    date: "2024-05-10",
    description: "Knee pain after running",
    lineId: "aa",
    type: eventType.appointment,
  },
  {
    id: "aa2",
    title: "Injection",
    date: "2024-05-10",
    description: "Injection with hialuronic acid",
    lineId: "aa",
    type: eventType.test,
  },
  {
    id: "ab",
    title: "Ankle",
    date: "2024-10-10",
    description: "Ankle pain",
    lineId: "ab",
    type: eventType.surgery,
  },
  {
    id: "ac",
    title: "Hip",
    date: "2024-05-12",
    description: "Hip pain",
    lineId: "ac",
    type: eventType.occurrence,
  },
  {
    id: "ad",
    title: "Shoulder",
    date: "2024-05-13",
    description: "Shoulder pain",
    lineId: "ad",
    type: eventType.other,
  },
];
