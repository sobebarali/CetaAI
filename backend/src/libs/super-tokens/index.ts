import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import config from "../../configs";

export const SuperTokensConfig: TypeInput = {
    supertokens: {
        connectionURI: config.SUPER_TOKENS_CONNECTOR_URL,
        apiKey: config.SUPER_TOKENS_API_KEY,
      },
      appInfo: {
        appName: "CetaAI",
        apiDomain: "http://localhost:8080",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
      },
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
        ThirdPartyEmailPassword.init({
            providers: [
                // We have provided you with development keys which you can use for testing.
                // IMPORTANT: Please replace them with your own OAuth keys for production use.
                {
                    config: {
                        thirdPartyId: "google",
                        clients: [
                            {
                              clientId: config.GOOGLE_CLIENT_ID,
                              clientSecret: config.GOOGLE_CLIENT_SECRET,
                            },
                          ],
                    },
                },
                {
                    config: {
                        thirdPartyId: "github",
                        clients: [
                            {
                                clientId: config.GITHUB_CLIENT_ID,
                                clientSecret: config.GITHUB_CLIENT_SECRET,
                            },
                        ],
                    },
                },
                {
                    config: {
                        thirdPartyId: "apple",
                        clients: [
                            {
                                clientId: config.APPLE_CLIENT_ID,
                                additionalConfig: {
                                  keyId: config.APPLE_KEY_ID,
                                  privateKey: config.APPLE_PRIVATE_KEY,
                                  teamId: config.APPLE_TEAM_ID,
                                },
                              },
                        ],
                    },
                },
                {
                    config: {
                        thirdPartyId: "twitter",
                        clients: [
                            {
                                clientId: config.TWITTER_CLIENT_ID,
                                clientSecret: config.TWITTER_CLIENT_SECRET,
                            },
                        ],
                    },
                },
            ],
        }),
        Session.init(),
        Dashboard.init(),
        UserRoles.init(),
    ],
};