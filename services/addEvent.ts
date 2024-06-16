import { EventType } from "@/types";
import { Firestore, addDoc, collection } from "firebase/firestore/lite";

export async function addEvent(
  db: Firestore,
  lineId: string,
  event: Omit<EventType, "id">,
) {
  const docRef = await addDoc(collection(db, "lines", lineId, "events"), event);

  return {
    ...event,
    id: docRef.id,
  };
}
