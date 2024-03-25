import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../../../database/firebase.database";
import { CustomError } from "../../../utils/customError";
export default async function organizationCreate({
  userId,
  name,
  description,
}: {
  userId: string;
  name: string;
  description: string;
}) {
  try {
    let createResult = await addDoc(
      collection(db, "users", userId, "organizations"),
      {
        userId,
        name,
        description,
        createdAt: serverTimestamp(),
      }
    );
    return createResult;
  } catch (error) {
    console.error("#6473812538 Error creating organization", error);
    throw new CustomError( "DB_ERROR", "Error creating organization");
  }
}
