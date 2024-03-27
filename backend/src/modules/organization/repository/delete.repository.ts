import { doc, getDoc, deleteDoc } from "firebase/firestore";
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

    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new CustomError("NOT_FOUND", "Organization not found");
    } else {
      await deleteDoc(docRef);
    }
  } catch (error: any) {
    console.error("#4678321579 Error deleting organization", error);
    if (error.errorCode === "NOT_FOUND") {
      throw new CustomError(error.errorCode, error.message);
    } else {
      throw new CustomError("DB_ERROR", "Error deleting organization");
    }
  }
}
