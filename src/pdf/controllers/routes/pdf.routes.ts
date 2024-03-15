import express from "express";
import s3PdfUpload from "../../../services/file-upload-s3";
import endpointAddPdf from "../api/add.controller";

const pdfRouter = express.Router();

pdfRouter.post("/pdf/add", s3PdfUpload.array("files"), endpointAddPdf);

export default pdfRouter;
