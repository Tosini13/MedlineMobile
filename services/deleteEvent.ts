import { Firestore, deleteDoc, doc } from "firebase/firestore/lite";
import { FirebaseStorage } from "firebase/storage";
import { deleteDocument } from "./deleteDocument";
import { getEvent } from "./getEvent";

export async function deleteEvent(
  db: Firestore,
  storage: FirebaseStorage,
  lineId: string,
  eventId: string,
) {
  const event = await getEvent(db, lineId, eventId);

  if (event) {
    event.documents
      ? await Promise.all(
          event.documents.map((doc) => deleteDocument(storage, doc.path)),
        )
      : [];
  }

  await deleteDoc(doc(db, "lines", lineId, "events", eventId));

  return eventId;
}
