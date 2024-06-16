import { Firestore, doc, getDoc } from "firebase/firestore/lite";
import { getEventDate } from "./helpers";

export async function getEvent(db: Firestore, lineId: string, eventId: string) {
  const eventRef = doc(db, "lines", lineId, "events", eventId);
  const eventSnapshot = await getDoc(eventRef);
  const data = eventSnapshot.data();
  return eventSnapshot.exists() && data
    ? {
        ...data,
        date: getEventDate(data.date),
        id: eventSnapshot.id,
      }
    : null;
}
