import { EventType } from "@/types";
import { DocumentPickerAsset } from "expo-document-picker";
import { addDoc, collection, Firestore } from "firebase/firestore/lite";

export async function addEvent(
  db: Firestore,
  lineId: string,
  event: Omit<EventType, "id" | "documents"> & {
    files?: DocumentPickerAsset[];
  },
) {
  const docRef = await addDoc(collection(db, "lines", lineId, "events"), event);

  return {
    ...event,
    id: docRef.id,
  };
}
