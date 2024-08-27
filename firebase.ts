import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCG07QZSyEL4UgofhpCsLAenLJxLtLdmuw",
  authDomain: "collabnote-eacdb.firebaseapp.com",
  projectId: "collabnote-eacdb",
  storageBucket: "collabnote-eacdb.appspot.com",
  messagingSenderId: "606443450486",
  appId: "1:606443450486:web:c817d0c5e1b64e7b82ef57",
};

const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
