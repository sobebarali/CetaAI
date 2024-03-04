import express from "express";
import endpointAddPdf from "../../endpoints/pdfEndpoints/add";
import s3PdfUpload from "../../services/file-upload";

const pdfRouter = express.Router();

pdfRouter.post("/pdf/add", s3PdfUpload.array("files"),endpointAddPdf);

export default pdfRouter;
