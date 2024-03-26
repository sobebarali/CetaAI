import { Request, Response } from "express";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../types/update.types";
import organizationUpdate from "../repository/update.repository";

export default async function updateOrganisation({
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

    const { orgId, name, description } = req.body as typePayload;

    const updateData: Partial<typePayload> = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    await organizationUpdate({
      userId,
      orgId,
      updateData,
    });

    data = {
      code: "ORGANIZATION_UPDATED",
      message: "Organization updated successfully",
    };
  } catch (err: any) {
    error = {
      code: err.errorCode || "SOMETHING_WENT_WRONG",
      message: err.message || "Something went wrong",
    };
  }

  return { data, error };
}
