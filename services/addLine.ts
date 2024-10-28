import { getAuth } from "@/firebaseConfig";
import { LineType } from "@/types";
import { Firestore, addDoc, collection } from "firebase/firestore/lite";

export async function addLine(
  db: Firestore,
  line: Omit<LineType, "id" | "ownerId">,
) {
  const docRef = await addDoc(collection(db, "lines"), {
    ...line,
    ownerId: getAuth().currentUser?.uid,
  });

  return {
    ...line,
    id: docRef.id,
  };
}
