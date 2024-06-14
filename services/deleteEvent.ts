import { Firestore, deleteDoc, doc } from "firebase/firestore/lite";

export async function deleteEvent(
  db: Firestore,
  lineId: string,
  eventId: string,
) {
  await deleteDoc(doc(db, "lines", lineId, "events", eventId));
  return eventId;
}
