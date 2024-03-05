import express from "express";
import s3PdfUpload from "../../services/file-upload-s3";
import endpointAddPdf from "../../pdf/controllers/api/add";

const pdfRouter = express.Router();

pdfRouter.post("/pdf/add", s3PdfUpload.array("files"),endpointAddPdf);

export default pdfRouter;
