import { Request, Response } from "express";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../types/login.types";
import firebaseAPP from "../../../libs/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default async function loginWithEmailAndPassword({
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
    const auth =  await getAuth(firebaseAPP);

    let loginResult = await signInWithEmailAndPassword(auth, email, password);

    data = {
      code: "LOGIN_SUCCESS",
      message: "User logged in successfully",
      access_token: await loginResult.user.getIdToken()
    };
  } catch (err: any) {
    console.error(`886993 login error: `, error);
    error = {
      code: err.code || "SOMETHING_WENT_WRONG",
      message: err.message || "Something went wrong",
    };
  }

  return { data, error };
}
