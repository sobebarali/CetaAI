import express from "express";
import s3PdfUpload from "../../../../services/file-upload-s3";
import endpointAddPdf from "../api/add.controller";
import { verifySession } from "supertokens-node/recipe/session/framework/express";


const pdfRouter = express.Router();

pdfRouter.post("/pdf/add",verifySession(), s3PdfUpload.array("files"), endpointAddPdf);

export default pdfRouter;
