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
    console.error("#4678321578 Error fetching organization", error);
    throw new CustomError("DB_ERROR", "Error fetching organization");
  }
}
