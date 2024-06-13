import { Firestore, collection, getDocs, query } from "firebase/firestore/lite";

export async function getLines(db: Firestore) {
  const linesRef = collection(db, "lines");
  const q = query(linesRef);
  const linesSnapshot = await getDocs(q);
  const linesList = linesSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return linesList;
}
