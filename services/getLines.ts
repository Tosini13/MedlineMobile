import { Firestore, collection, getDocs } from "firebase/firestore/lite";

export async function getLines(db: Firestore) {
  const linesCol = collection(db, "lines");
  const linesSnapshot = await getDocs(linesCol);
  const linesList = linesSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return linesList;
}
