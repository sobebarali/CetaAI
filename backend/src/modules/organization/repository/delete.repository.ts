import datastore from "../../../database/google.database";
import { CustomError } from "../../../utils/customError";

export default async function deleteOrganization({
  orgId,
}: {
  orgId: string;
}) {
  try {
    const key = datastore.key({
      namespace: "Organization",
      path: [orgId],
    });


    const [entity] = await datastore.get(key);

    if (!entity) {
      throw new CustomError( "ORG_NOT_FOUND", "Organization not found");
    }

    await datastore.delete(key);
  } catch (error) {
    console.error("#21342314 Error deleting organization", error);
    throw new CustomError( "DB_ERROR", "Error deleting organization");
  }
}
