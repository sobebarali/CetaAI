import { Request, Response } from "express";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../types/get.types";
import { admin } from "../../../libs/firebase-admin";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

export default async function getUser({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  let userId = req.user.user_id;
  let email = req.body.email as typePayload["email"];

  try {
    let User = {} as UserRecord;

    if (email) {
      User = await admin.auth().getUserByEmail(email);
    } else {
      User = await admin.auth().getUser(userId);
    }

    data = {
      code: "USER_FETCHED",
      message: "User fetched successfully",
      user: User.toJSON(),
    };
  } catch (err: any) {
    console.error(`6428987 GET USER -> error: `, error);
    error = {
      code: err.code || "SOMETHING_WENT_WRONG",
      message: err.message || "Something went wrong",
    };
  }

  return { data, error };
}
