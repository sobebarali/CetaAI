import express from "express";
import endpointRegisterUser from "../api/register.controller";
import endpointLoginUser from "../api/login.controller";
import endpointGetUser from "../api/get.controller";
import validateToken from "../../../middleware/auth.middleware";

const authRouter = express.Router();

authRouter.post("/auth/register", endpointRegisterUser);
authRouter.post("/auth/login", endpointLoginUser);
authRouter.get("/auth/user", validateToken, endpointGetUser);
// authRouter.post("/auth/logout", endpointLoginUser);

export default authRouter;