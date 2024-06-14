import { LineType } from "@/types";
import { Firestore, doc, updateDoc } from "firebase/firestore/lite";

export async function updateLine(
  db: Firestore,
  lineId: string,
  line: Omit<LineType, "id">,
) {
  await updateDoc(doc(db, "lines", lineId), line);
  return line;
}
