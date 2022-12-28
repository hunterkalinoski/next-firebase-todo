import { getFirestore } from "firebase/firestore";
import firebaseApp from "@lib/firebase";

// Initialize Cloud Firestore
const db = getFirestore(firebaseApp);

export default db;
