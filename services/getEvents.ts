import { EventType } from "@/types";
import { Firestore, collection, getDocs } from "firebase/firestore/lite";
import { getEventDate } from "./helpers";

export async function getEvents(db: Firestore, lineId: string) {
  const eventsRef = collection(db, "lines", lineId, "events");
  const eventsSnapshot = await getDocs(eventsRef);
  return eventsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      date: getEventDate(data.date),
      id: doc.id,
    } as EventType;
  });
}
