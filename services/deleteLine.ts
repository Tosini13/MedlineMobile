import { Firestore, deleteDoc, doc } from "firebase/firestore/lite";
import { FirebaseStorage } from "firebase/storage";
import { deleteDocument } from "./deleteDocument";
import { getEvents } from "./getEvents";

export async function deleteLine(
  db: Firestore,
  storage: FirebaseStorage,
  lineId: string,
) {
  /**
   * @description deleting subcollections is not recommended to be done on client side
   */
  const events = await getEvents(db, lineId);

  await Promise.all(
    events.map(async (event) => {
      if (event.documents) {
        await Promise.all(
          event.documents.map((doc) => deleteDocument(storage, doc.path)),
        );
      }
      deleteDoc(doc(db, "lines", lineId, "events", event.id));
    }),
  );
  await deleteDoc(doc(db, "lines", lineId));
  return lineId;
}
