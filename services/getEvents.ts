import { Firestore, collection, getDocs } from "firebase/firestore/lite";

export async function getEvents(db: Firestore, lineId: string) {
  const eventsRef = collection(db, "lines", lineId, "events");
  const eventsSnapshot = await getDocs(eventsRef);
  return eventsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      date: new Date(data.date.seconds * 1000).toISOString(),
      id: doc.id,
    };
  });
}
