import { Request, Response } from "express";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../types/update.types";
import { admin } from "../../../libs/firebase-admin";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

export default async function updateUser({
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
  let phoneNumber = req.body.phoneNumber as typePayload["phoneNumber"];
  let emailVerified = req.body.emailVerified as typePayload["emailVerified"];
  let password = req.body.password as typePayload["password"];
  let displayName = req.body.displayName as typePayload["displayName"];
  let photoURL = req.body.photoURL as typePayload["photoURL"];
  let disabled = req.body.disabled as typePayload["disabled"];

  try {
    let updatedUser = {} as UserRecord;

    const updateFields: Partial<typePayload> = {};

    if (email !== undefined) updateFields.email = email;
    if (phoneNumber !== undefined) updateFields.phoneNumber = phoneNumber;
    if (emailVerified !== undefined) updateFields.emailVerified = emailVerified;
    if (password !== undefined) updateFields.password = password;
    if (displayName !== undefined) updateFields.displayName = displayName;
    if (photoURL !== undefined) updateFields.photoURL = photoURL;
    if (disabled !== undefined) updateFields.disabled = disabled;

    updatedUser = await admin.auth().updateUser(userId, updateFields);

    data = {
      code: "USER_UPDATED",
      message: "User updated successfully",
      user: updatedUser.toJSON(),
    };
  } catch (err: any) {
    console.error(`6428987 UPDATE USER -> error: `, err);
    error = {
      code: err.code || "SOMETHING_WENT_WRONG",
      message: err.message || "Something went wrong",
    };
  }

  return { data, error };
}
