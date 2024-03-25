import { getFirestore } from "firebase/firestore";
import firebaseAPP from "../libs/firebase";

const db = getFirestore(firebaseAPP);

export default db;

