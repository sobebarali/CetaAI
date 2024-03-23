import { randomUUID } from "crypto";
import datastore from "../../../database/google.database";
import { CustomError } from "../../../utils/customError";
export default async function createOrganization({
  userId,
  name,
  description,
}: {
  userId: string;
  name: string;
  description: string;
}) {
  try {
    let orgId = `org-${randomUUID()}`;

    const key = datastore.key({
      namespace: "Organization",
      path: [userId, orgId],
    });

    const currentTime = new Date().toISOString();

    const entity = {
      key,
      data: {
        orgId,
        userId,
        name,
        description,
        createdAt: currentTime,
        updatedAt: currentTime,
      },
    };

    await datastore.insert(entity);

    return entity;
  } catch (error) {
    console.error("#6473812538 Error creating organization", error);
    throw new CustomError(500, "DB_ERROR","Error creating organization"); 
  }
}
