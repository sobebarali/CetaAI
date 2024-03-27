import { Request, Response } from "express";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../types/delete.types";
import organizationDelete from "../repository/delete.repository";

export default async function deleteOrganisation({
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

    await organizationDelete({
      userId,
      orgId,
    });

    data = {
      code: "ORGANIZATION_DELETED",
      message: "Organization deleted successfully",
    };
  } catch (err: any) {
    error = {
      code: err.errorCode || "SOMETHING_WENT_WRONG",
      message: err.message || "Something went wrong",
    };
  }

  return { data, error };
}
