import { DocumentType, EventType } from "@/types";
import { DocumentPickerAsset } from "expo-document-picker";
import { Firestore, addDoc, collection } from "firebase/firestore/lite";
import {
  FirebaseStorage,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { updateEvent } from "./updateEvent";

const getUploadFileToStorage =
  (lineId: string, eventId: string, storage: FirebaseStorage) =>
  async (file: DocumentPickerAsset): Promise<DocumentType> => {
    const response = await fetch(file.uri);

    const blob = await response.blob();

    const fileName = file.name.replace(/[^a-zA-Z0-9.]/g, "");

    const storageRef = ref(storage, `events/${lineId}/${eventId}/${fileName}`);

    const snapshot = await uploadBytes(storageRef, blob).catch((error) =>
      console.error("Error uploading file", error),
    );

    if (!snapshot) throw new Error("Error uploading file");

    return {
      name: file.name,
      path: snapshot?.metadata.fullPath ?? "",
      type: file.mimeType,
    };
  };

export async function addEvent(
  db: Firestore,
  lineId: string,
  event: Omit<EventType, "id" | "documents"> & {
    files?: DocumentPickerAsset[];
  },
) {
  const docRef = await addDoc(collection(db, "lines", lineId, "events"), event);

  const storage = getStorage(db.app);

  const uploadFileToStorage = getUploadFileToStorage(
    lineId,
    docRef.id,
    storage,
  );

  if (!event.files || (event.files?.length ?? 0) < 1) {
    return {
      ...event,
      id: docRef.id,
    };
  }

  let documents: DocumentType[] = [];
  for (const file of event.files) {
    documents.push(await uploadFileToStorage(file));
  }

  if (!documents) {
    return {
      ...event,
      id: docRef.id,
    };
  }

  const eventWithDocuments = await updateEvent(db, lineId, docRef.id, {
    ...event,
    documents: documents,
  });

  return {
    ...eventWithDocuments,
    id: docRef.id,
  };
}
