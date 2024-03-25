import * as admin from "firebase-admin";
import config from "../../configs";

admin.initializeApp({
  credential: admin.credential.cert(
    config.GCP_KEYFILE_PATH
  ),
});

export { admin };
