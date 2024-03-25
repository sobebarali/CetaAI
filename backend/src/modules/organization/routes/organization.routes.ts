import express from "express";
import endpointCreateOrganisation from "../api/create.controller";

const organisationRouter = express.Router();

organisationRouter.post(
  "/organisation/add",
  endpointCreateOrganisation
);

export default organisationRouter;
