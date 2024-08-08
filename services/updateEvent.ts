import { EventType } from "@/types";
import { getEventDocumentPath } from "@/utils/utils";
import { DocumentPickerAsset } from "expo-document-picker";
import { Firestore, doc, updateDoc } from "firebase/firestore/lite";
import { FirebaseStorage, UploadTaskSnapshot } from "firebase/storage";
import { deleteDocument } from "./deleteDocument";
import { DocumentReferenceType } from "./getDocuments";
import { uploadDocument } from "./uploadDocument";

export async function updateEvent(
  db: Firestore,
  storage: FirebaseStorage,
  lineId: string,
  eventId: string,
  event: Omit<EventType, "id">,
  documentsToDelete: DocumentReferenceType[],
  newDocuments: DocumentPickerAsset[],
  onStateChanged: (snapshot: UploadTaskSnapshot) => void,
): Promise<EventType> {
  const docsToDelete = event.documents?.filter(
    (doc) => !documentsToDelete?.find((f) => f.fullPath === doc.path),
  );
  const deletedDocs = docsToDelete
    ? await Promise.all(
        docsToDelete.map((doc) => deleteDocument(storage, doc.path)),
      )
    : [];

  const existingDocs =
    event.documents?.filter(
      (doc) => !deletedDocs?.find((d) => d.fullPath === doc.path),
    ) ?? [];

  const uploadedDocuments = newDocuments
    ? await Promise.all(
        newDocuments.map((file) =>
          uploadDocument(
            storage,
            file,
            getEventDocumentPath(lineId, eventId),
            onStateChanged,
          ),
        ),
      )
    : [];

  await updateDoc(doc(db, "lines", lineId, "events", eventId), {
    ...event,
    documents: [...existingDocs, ...uploadedDocuments],
  });
  return {
    ...event,
    documents: [...existingDocs, ...uploadedDocuments],
    id: eventId,
  };
}

export async function updateEventRemoveDocuments(
  db: Firestore,
  lineId: string,
  eventId: string,
  documents: string[],
) {
  await updateDoc(doc(db, "lines", lineId, "events", eventId), {
    documents,
  });
}
