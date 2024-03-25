import {Request,Response } from "express";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../types/register.types";
import firebaseAPP from "../../../libs/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default async function registerWithEmailAndPassword({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  const { email, password } = req.body as typePayload;

  try {
    const auth =  getAuth(firebaseAPP);

    createUserWithEmailAndPassword(auth, email, password);

    data = {
      code: "USER_CREATED",
      message: "User created successfully",
    };
  } catch (err: any) {
        console.error(`886993 register error: `, error);
    error = {
      code: err.code || "SOMETHING_WENT_WRONG",
      message: err.message || "Something went wrong",
    };
  }

  return { data, error };
}
