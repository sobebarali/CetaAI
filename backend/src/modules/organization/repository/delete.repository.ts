import { doc, deleteDoc } from "firebase/firestore";
import db from "../../../database/firebase.database";
import { CustomError } from "../../../utils/customError";

export default async function organizationDelete({
  userId,
  orgId,
}: {
  userId: string;
  orgId: string;
}) {
  try {
    const docRef = doc(db, "users", userId, "organizations", orgId);
    await deleteDoc(docRef);
  } catch (error: any) {
    console.error("#4678321579 Error deleting organization", error);
    throw new CustomError("DB_ERROR", "Error deleting organization");
  }
}
