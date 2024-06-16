import { Firestore, doc, getDoc } from "firebase/firestore/lite";

export async function getLine(db: Firestore, lineId: string) {
  const lineRef = doc(db, "lines", lineId);
  const lineSnapshot = await getDoc(lineRef);
  const data = lineSnapshot.data();
  return lineSnapshot.exists() && data
    ? {
        ...data,
        id: lineSnapshot.id,
      }
    : null;
}
