import { Request, Response } from "express";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../types/create.types";
import organizationCreate from "../repository/create.repository";

export default async function createOrganisation({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
    let userId = req?.user?.user_id;
    
    const { name, description } = req.body as typePayload;
    
    let createdOrg = await organizationCreate({
      userId,
      name,
      description,
    });

    data = {
      orgId: createdOrg.id,
      name,
    };
  } catch (err: any) {
    error = {
      code: err.errorCode || "SOMETHING_WENT_WRONG",
      message: err.message || "Something went wrong",
    };
  }

  return { data, error };
}
