import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import db from "../../../database/firebase.database";
import { CustomError } from "../../../utils/customError";

export default async function organizationList({
  userId,
  pageSize = 10,
  startAt = null,
  sortBy = "name",
  sortOrder = "asc",
}: {
  userId: string;
  pageSize?: number;
  startAt?: any;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  try {
    const collectionRef = collection(db, "users", userId, "organizations");
    let q = query(collectionRef, orderBy(sortBy, sortOrder), limit(pageSize));

    if (startAt) {
      q = query(q, startAfter(startAt));
    }

    const querySnapshot = await getDocs(q);
    const organizations = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const nextStartAt = lastVisible ? lastVisible : null;

    return {
      organizations,
      nextStartAt,
      hasMore: querySnapshot.size === pageSize,
    };
  } catch (error: any) {
    console.error("#4678321581 Error listing organizations", error);
    throw new CustomError("DB_ERROR", "Error listing organizations");
  }
}
