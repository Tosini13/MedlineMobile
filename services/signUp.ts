import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth();

export const signUp = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);
