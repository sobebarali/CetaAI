import datastore from "../../../database/google.database";
import { CustomError } from "../../../utils/customError";

export default async function updateOrganization({
  userId,
  orgId,
  name,
  description,
}: {
  userId: string;
  orgId: string;
  name?: string;
  description?: string;
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
     
    await datastore.update({
      key,
      data: {
        ...entity,
        name: name || entity.name,
        description: description || entity.description,
        updatedAt: new Date().toISOString(),
      },
    });

    return entity;
  } catch (error) {
    console.error("#675892376 Error updating organization", error);
    throw new CustomError(500, "DB_ERROR", "Error updating organization");
  }
}
