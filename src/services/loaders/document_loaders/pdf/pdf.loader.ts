import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { Document } from "../types/document_loader.type";

export const loadPdfDocumentFromPath = async ({
  path,
}: {
  path: string;
}): Promise<Document[]> => {
  const loader = new PDFLoader(path);
  const document = await loader.load();
  return document;
};

export const loadPdfDocumentFromBlob = async ({
  blob,
}: {
  blob: Blob;
}): Promise<Document[]> => {
  const loader = new PDFLoader(blob);
  const document = await loader.load();
  return document;
};

export const loadWebPdfDocument = async ({
  blob,
}: {
  blob: Blob;
}): Promise<Document[]> => {
  const loader = new WebPDFLoader(blob);
  const document = await loader.load();
  return document;
};
