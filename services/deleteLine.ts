import { Firestore, deleteDoc, doc } from "firebase/firestore/lite";
import { getEvents } from "./getEvents";

export async function deleteLine(db: Firestore, lineId: string) {
  try {
    /**
     * @description deleting subcollections is not recommended to be done on client side
     */
    const events = await getEvents(db, lineId);
    console.log("events !log", events);
    await Promise.all(
      events.map((event) =>
        deleteDoc(doc(db, "lines", lineId, "events", event.id)),
      ),
    );
    await deleteDoc(doc(db, "lines", lineId));
    return lineId;
  } catch (e) {
    console.log("e !log", e);
  }
}
