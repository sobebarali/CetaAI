import { Datastore } from "@google-cloud/datastore";


const datastore = new Datastore({
  projectId: process.env.GCP_PROJECT_ID,
});

export default datastore;

