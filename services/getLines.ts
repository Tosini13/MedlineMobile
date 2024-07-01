import { getAuth } from "firebase/auth";
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";

export async function getLines(db: Firestore) {
  const linesRef = collection(db, "lines");
  const q = query(linesRef, where("ownerId", "==", getAuth().currentUser?.uid));
  const linesSnapshot = await getDocs(q);
  const linesList = linesSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return linesList;
}
