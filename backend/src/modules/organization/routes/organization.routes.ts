import express from "express";
import endpointCreateOrganisation from "../api/create.controller";
import validateToken from "../../../middleware/auth.middleware";
import endpointGetOrganisation from "../api/get.controller";
import endpointUpdateOrganisation from "../api/update.controller";

const organisationRouter = express.Router();

organisationRouter.post(
  "/organisation",
  validateToken,
  endpointCreateOrganisation
);

organisationRouter.get("/organisation", validateToken, endpointGetOrganisation);
organisationRouter.put("/organisation", validateToken, endpointUpdateOrganisation);

export default organisationRouter;
