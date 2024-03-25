import datastore from "../../../database/google.database";
import { CustomError } from "../../../utils/customError";

export default async function listOrganizations({
  page = 1,
  limit = 10,
  sort = "asc",
}: {
  page: number;
  limit: number;
  sort: string;
  }) {
  try {
     const query = datastore
       .createQuery("Organization")
       .limit(limit)
       .offset((page - 1) * limit)
       .order("createdAt", {
         descending: sort === "desc",
       });

     const [entities] = await datastore.runQuery(query);

     return entities;
  } catch (error) {
     console.error("#4362178764 Error listing organizations", error);
     throw new CustomError( "DB_ERROR", "Error listing organizations"); 
  }
}
