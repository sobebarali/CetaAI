import datastore from "../../../database/google.database";
import { CustomError } from "../../../utils/customError";

export default async function deleteOrganization({
  userId,
  orgId,
}: {
  userId: string;
  orgId: string;
}) {
  try {
    const key = datastore.key({
      namespace: "Organization",
      path: [userId, orgId],
    });

    const [entity] = await datastore.get(key);

    if (!entity) {
      throw new CustomError(404, "ORG_NOT_FOUND", "Organization not found");
    }

    await datastore.delete(key);
  } catch (error) {
    console.error("#21342314 Error deleting organization", error);
    throw new CustomError(500, "DB_ERROR", "Error deleting organization");
  }
}
