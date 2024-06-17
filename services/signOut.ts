import firebaseAuth, { getAuth } from "firebase/auth";

const auth = getAuth();
export const signOut = () => firebaseAuth.signOut(auth);
