import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "./configs";
import connectDB from "./database/mongo.database";
import limiter from "./libs/rate-limiter";
import pdfRouter from "./modules/pdf/entry-point/routes/pdf.routes";
import supertokens from "supertokens-node";
import { middleware } from "supertokens-node/framework/express";
import { errorHandler } from "supertokens-node/framework/express";
import Dashboard from "supertokens-node/recipe/dashboard";
import Session from "supertokens-node/recipe/session";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import EmailVerification from "supertokens-node/recipe/emailverification";

const app: Application = express();
const port = config.PORT;

const env = config.NODE_ENV;
const isDevelopment = !env || env === "development";
const prodCorsOrigin = config.PROD_CORS_ORIGIN;

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI:
      "https://st-dev-f6378210-e3b6-11ee-9ef8-9355384ffd39.aws.supertokens.io",
    apiKey: "K38BYdbE3aL4R4wPzZ6Z1jhoRu",
  },
  appInfo: {
    appName: "CetaAI",
    apiDomain: "http://localhost:8080",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    Dashboard.init(),
    EmailVerification.init({
      mode: "REQUIRED", // or "OPTIONAL"
    }),
    ThirdPartyEmailPassword.init({
      providers: [
        {
          config: {
            thirdPartyId: "google",
            clients: [
              {
                clientId:
                  "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                clientSecret: "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",
              },
            ],
          },
        },
        {
          config: {
            thirdPartyId: "github",
            clients: [
              {
                clientId: "467101b197249757c71f",
                clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
              },
            ],
          },
        },
        {
          config: {
            thirdPartyId: "apple",
            clients: [
              {
                clientId: "4398792-io.supertokens.example.service",
                additionalConfig: {
                  keyId: "7M48Y4RYDL",
                  privateKey:
                    "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                  teamId: "YWQCXGJRJL",
                },
              },
            ],
          },
        },
      ],
    }),
    Session.init(), // initializes session features
  ],
});

if (isDevelopment) {
  console.warn("Running in development mode - allowing CORS for all origins");
  app.use(
    cors({
      origin: "http://localhost:3000",
      allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
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
    credentials: true,
  };
  app.use(cors(corsOptions));
} else {
  console.warn("Production CORS origin not set, defaulting to no CORS.");
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

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
});

export default app;
