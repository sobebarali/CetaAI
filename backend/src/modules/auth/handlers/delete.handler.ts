import { Request, Response } from "express";
import {
  typeResult,
  typeResultData,
  typeResultError,
} from "../types/delete.types";
import { admin } from "../../../libs/firebase-admin";

export default async function deleteUser({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  let userId = req.user.user_id;

  try {
    await admin.auth().deleteUser(userId);

    data = {
      code: "USER_DELETED",
      message: "User deleted successfully",
    };
  } catch (err: any) {
    console.error(`5647821 DELETE USER -> error: `, err);
    error = {
      code: err.code || "SOMETHING_WENT_WRONG",
      message: err.message || "Something went wrong",
    };
  }

  return { data, error };
}
