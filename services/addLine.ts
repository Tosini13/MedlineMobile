import { LineType } from "@/types";
import { Firestore, addDoc, collection } from "firebase/firestore/lite";

export async function addLine(db: Firestore, line: Omit<LineType, "id">) {
  const docRef = await addDoc(collection(db, "lines"), line);

  return {
    ...line,
    id: docRef.id,
  };
}
