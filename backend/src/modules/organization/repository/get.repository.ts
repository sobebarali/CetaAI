import datastore from "../../../database/google.database";
import { GetResponse } from "@google-cloud/datastore/build/src/request";
import { CustomError } from "../../../utils/customError";

export default async function getOrganization({
  userId,
  orgId,
}: {
  userId: string;
  orgId: string;
  }): Promise<GetResponse> {
  try {
    const key = datastore.key({
      namespace: "Organization",
      path: [userId, orgId],
    });

    const [entity] = await datastore.get(key);

    if (!entity) {
      throw new CustomError(404, "ORG_NOT_FOUND", "Organization not found");
    }

    return entity;
  } catch (error) {
     console.error("#4678321578 Error fetching organization", error);
     throw new CustomError(500, "DB_ERROR", "Error fetching organization"); 
  }
}
