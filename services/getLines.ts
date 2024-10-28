import { getAuth } from "@/firebaseConfig";
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { getEventsNumber } from "./getEvents";

export async function getLines(db: Firestore) {
  const linesRef = collection(db, "lines");
  const q = query(linesRef, where("ownerId", "==", getAuth().currentUser?.uid));
  const linesSnapshot = await getDocs(q);
  const linesList = await Promise.all(
    linesSnapshot.docs.map(async (doc) => {
      const size = await getEventsNumber(db, doc.id);
      return {
        ...doc.data(),
        id: doc.id,
        eventsNumber: size,
      };
    }),
  );
  return linesList;
}
