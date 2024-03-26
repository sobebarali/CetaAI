import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import db from "../../../database/firebase.database";
import { CustomError } from "../../../utils/customError";

export default async function organizationUpdate({
  userId,
  orgId,
  updateData,
}: {
  userId: string;
  orgId: string;
  updateData: Partial<{
    name: string;
    description: string;
    updatedAt: any;
  }>;
}) {
  try {
    updateData.updatedAt = serverTimestamp();
    const docRef = doc(db, "users", userId, "organizations", orgId);
    await updateDoc(docRef, updateData);
  } catch (error: any) {
    console.error("#4678321580 Error updating organization", error);
    throw new CustomError("DB_ERROR", "Error updating organization");
  }
}
