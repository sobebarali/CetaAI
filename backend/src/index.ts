import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import supertokens from "supertokens-node";
import {
  SessionRequest,
  errorHandler,
  middleware,
} from "supertokens-node/framework/express";
import Multitenancy from "supertokens-node/recipe/multitenancy";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import config from "./configs";
import connectDB from "./database/google.database";
import limiter from "./libs/rate-limiter";
import { SuperTokensConfig } from "./libs/super-tokens";
import pdfRouter from "./modules/pdf/routes/pdf.routes";

const app: Application = express();
const port = config.PORT;

const env = config.NODE_ENV;
const isDevelopment = !env || env === "development";
const prodCorsOrigin = config.PROD_CORS_ORIGIN;

supertokens.init(SuperTokensConfig);

if (process.env.NODE_ENV !== "test") {
  if (isDevelopment) {
    console.warn("Running in development mode - allowing CORS for all origins");
    app.use(
      cors({
        origin: "http://localhost:3000",
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
        credentials: true,
      })
    );
  } else if (prodCorsOrigin) {
    console.log(
      `Running in production mode - allowing CORS for domain: ${prodCorsOrigin}`
    );
    const corsOptions = {
      origin: prodCorsOrigin, // Restrict to production domain
      allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
      methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
      credentials: true,
    };
    app.use(cors(corsOptions));
  } else {
    console.warn("Production CORS origin not set, defaulting to no CORS.");
  }
}

app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(limiter);
app.use(morgan("dev"));
app.use(middleware());

//api routes
app.use("/api", pdfRouter);

// An example API that requires session verification
app.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
  let session = req.session;
  res.send({
    sessionHandle: session!.getHandle(),
    userId: session!.getUserId(),
    accessTokenPayload: session!.getAccessTokenPayload(),
  });
});

// This API is used by the frontend to create the tenants drop down when the app loads.
// Depending on your UX, you can remove this API.
app.get("/tenants", async (req, res) => {
  let tenants = await Multitenancy.listAllTenants();
  res.send(tenants);
});

// AFTER all your routes
app.use(errorHandler());

// Handle undefined routes
app.use((req, res) => {
  res.status(404).send({
    data: null,
    error: {
      code: "NOT_FOUND",
      message: "The requested resource does not exist",
    },
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

export default app;
