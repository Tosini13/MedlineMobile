import { Firestore, doc, getDoc } from "firebase/firestore/lite";

export async function getEvent(db: Firestore, lineId: string, eventId: string) {
  const eventRef = doc(db, "lines", lineId, "events", eventId);
  const eventSnapshot = await getDoc(eventRef);
  const data = eventSnapshot.data();
  return eventSnapshot.exists() && data
    ? {
        ...data,
        date: new Date(data.date.seconds * 1000).toISOString(),
        id: eventSnapshot.id,
      }
    : null;
}
