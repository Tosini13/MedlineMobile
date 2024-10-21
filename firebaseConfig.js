import { initializeApp } from "firebase/app";
import { envs } from "./utils/utils.ts";

import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: envs.apiKey,
  authDomain: envs.authDomain,
  databaseURL: envs.databaseURL,
  projectId: envs.projectId,
  storageBucket: envs.storageBucket,
  messagingSenderId: envs.messagingSenderId,
  appId: envs.appId,
  measurementId: envs.measurementId,
};
const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const db = getFirestore(app);
export const storage = getStorage(app);
