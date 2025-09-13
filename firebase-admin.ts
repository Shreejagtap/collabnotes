import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

var serviceAccount = require("path/to/serviceAccountKey.json");

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceAccount),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
