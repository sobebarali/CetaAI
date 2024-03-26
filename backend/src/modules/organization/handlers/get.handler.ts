import { Request, Response } from "express";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../types/get.types";
import organizationGet from "../repository/get.repository";

export default async function getOrganisation({
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

    const { orgId } = req.body as typePayload;

    let getOrg = await organizationGet({
      userId,
      orgId,
    });

    data = {
      userId,
      orgId,
      name: getOrg.name,
      description: getOrg.description,
      createdAt: getOrg.createdAt,
      updatedAt: getOrg.updatedAt,
    };
  } catch (err: any) {
    error = {
      code: err.errorCode || "SOMETHING_WENT_WRONG",
      message: err.message || "Something went wrong",
    };
  }

  return { data, error };
}
