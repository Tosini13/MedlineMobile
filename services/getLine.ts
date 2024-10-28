import { Firestore, doc, getDoc } from "firebase/firestore/lite";
import { getEventsNumber } from "./getEvents";

export async function getLine(db: Firestore, lineId: string) {
  const lineRef = doc(db, "lines", lineId);
  const lineSnapshot = await getDoc(lineRef);
  const data = lineSnapshot.data();
  const size = await getEventsNumber(db, lineId);
  return lineSnapshot.exists() && data
    ? {
        ...data,
        eventsNumber: size,
        id: lineSnapshot.id,
      }
    : null;
}
