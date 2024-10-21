import { deleteObject, FirebaseStorage, ref } from "firebase/storage";

export const deleteDocument = async (
  storage: FirebaseStorage,
  fullPath: string,
) => {
  const storageRef = ref(storage, fullPath);
  await deleteObject(storageRef);

  return storageRef;
};
