import { doc, getDoc } from "firebase/firestore";
import db from "../../../database/firebase.database";
import { CustomError } from "../../../utils/customError";

export default async function organizationGet({
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
      return docSnap.data();
    }
  } catch (error: any) {
    console.error("#5468712498 Error fetching organization", error);
    if (error.errorCode === "NOT_FOUND") {
      throw new CustomError(error.errorCode, error.message);
    } else {
      throw new CustomError("DB_ERROR", "Error fetching organization");
    }
  }
}
