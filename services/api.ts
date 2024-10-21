import { db, storage } from "@/firebaseConfig";
import { EventType, LineType } from "@/types";
import { DocumentPickerAsset } from "expo-document-picker";
import { UploadTaskSnapshot } from "firebase/storage";
import { addEvent } from "./addEvent";
import { addLine } from "./addLine";
import { deleteDocument } from "./deleteDocument";
import { deleteEvent } from "./deleteEvent";
import { deleteLine } from "./deleteLine";
import { DocumentReferenceType, getDocuments } from "./getDocuments";
import { getEvent } from "./getEvent";
import { getEvents } from "./getEvents";
import { getLine } from "./getLine";
import { getLines } from "./getLines";
import { signIn } from "./signIn";
import { signOut } from "./signOut";
import { signUp } from "./signUp";
import { updateEvent, updateEventRemoveDocuments } from "./updateEvent";
import { updateLine } from "./updateLine";
import { uploadDocument } from "./uploadDocument";

export const API = {
  auth: {
    signIn,
    signOut,
    signUp,
  },
  files: {
    uploadDocument: (
      file: DocumentPickerAsset,
      path: string,
      onStateChanged: (snapshot: UploadTaskSnapshot) => void,
    ) => uploadDocument(storage, file, path, onStateChanged),
    deleteDocument: (fullPath: string) => deleteDocument(storage, fullPath),
  },
  lines: {
    get: () => getLines(db) as Promise<LineType[]>,
    getById: (lineId: string) =>
      getLine(db, lineId) as Promise<LineType | null>,
    add: (line: Omit<LineType, "id" | "ownerId">) =>
      addLine(db, line) as Promise<LineType>,
    update: (lineId: string, line: Omit<LineType, "id">) =>
      updateLine(db, lineId, line) as Promise<LineType>,
    delete: (lineId: string) => deleteLine(db, storage, lineId),
  },
  events: {
    get: (lineId: string) => getEvents(db, lineId),
    getById: (lineId: string, eventId: string) => getEvent(db, lineId, eventId),
    add: (
      lineId: string,
      event: Omit<EventType, "id">,
      newDocuments: DocumentPickerAsset[],
      onStateChanged: (snapshot: UploadTaskSnapshot) => void,
    ) =>
      addEvent(
        db,
        storage,
        lineId,
        event,
        newDocuments,
        onStateChanged,
      ) as Promise<EventType>,
    update: (
      lineId: string,
      eventId: string,
      event: Omit<EventType, "id">,
      documentsToDelete: DocumentReferenceType[],
      newDocuments: DocumentPickerAsset[],
      onStateChanged: (snapshot: UploadTaskSnapshot) => void,
    ) =>
      updateEvent(
        db,
        storage,
        lineId,
        eventId,
        event,
        documentsToDelete,
        newDocuments,
        onStateChanged,
      ) as Promise<EventType>,
    updateDocuments: (lineId: string, eventId: string, documents: string[]) =>
      updateEventRemoveDocuments(db, lineId, eventId, documents),
    delete: (lineId: string, eventId: string) =>
      deleteEvent(db, storage, lineId, eventId),
    getDocuments: (lineId: string, eventId: string) =>
      getDocuments(storage, lineId, eventId),
  },
};
