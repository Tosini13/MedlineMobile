import { EventType } from "@/types";
import { getEventDocumentPath } from "@/utils/utils";
import { DocumentPickerAsset } from "expo-document-picker";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  updateDoc,
} from "firebase/firestore/lite";
import { FirebaseStorage, UploadTaskSnapshot } from "firebase/storage";
import { uploadDocument } from "./uploadDocument";

export async function addEvent(
  db: Firestore,
  storage: FirebaseStorage,
  lineId: string,
  event: Omit<EventType, "id" | "documents">,
  files: DocumentPickerAsset[],
  onStateChanged: (snapshot: UploadTaskSnapshot) => void,
) {
  const docRef = await addDoc(collection(db, "lines", lineId, "events"), event);

  if (files.length === 0) {
    return {
      ...event,
      id: docRef.id,
    };
  }

  const documents = await Promise.all(
    files.map((file) =>
      uploadDocument(
        storage,
        file,
        getEventDocumentPath(lineId, docRef.id),
        onStateChanged,
      ),
    ),
  );

  await updateDoc(doc(db, "lines", lineId, "events", docRef.id), {
    ...event,
    documents,
  });

  return {
    ...event,
    documents,
    id: docRef.id,
  };
}
