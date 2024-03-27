import express from "express";
import endpointCreateOrganisation from "../api/create.controller";
import validateToken from "../../../middleware/auth.middleware";
import endpointGetOrganisation from "../api/get.controller";
import endpointUpdateOrganisation from "../api/update.controller";
import endpointDeleteOrganisation from "../api/delete.controller";

const organisationRouter = express.Router();

organisationRouter.post(
  "/organisation",
  endpointCreateOrganisation
);

organisationRouter.get("/organisation", endpointGetOrganisation);
organisationRouter.put("/organisation", endpointUpdateOrganisation);
organisationRouter.delete("/organisation", endpointDeleteOrganisation);

export default organisationRouter;
