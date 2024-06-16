import { EventType } from "@/types";
import { Firestore, doc, updateDoc } from "firebase/firestore/lite";

export async function updateEvent(
  db: Firestore,
  lineId: string,
  eventId: string,
  event: Omit<EventType, "id">,
) {
  await updateDoc(doc(db, "lines", lineId, "events", eventId), event);
  return event;
}
