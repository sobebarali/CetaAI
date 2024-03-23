import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import endpointCreateOrganisation from "../api/create.controller";

const organisationRouter = express.Router();

organisationRouter.post("/organisation/add", verifySession(), endpointCreateOrganisation);

export default organisationRouter;
