import { getAuth } from "firebase/auth";

const auth = getAuth();
export const signOut = () => auth.signOut();
