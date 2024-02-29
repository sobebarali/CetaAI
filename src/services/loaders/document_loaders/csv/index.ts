import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { Document } from "../../../types";

export const loadCsvDocumentFromPath = async (
  path: string
): Promise<Document[]> => {
  const loader = new CSVLoader(path);
  const document = await loader.load();
  return document;
};

export const loadCsvDocumentFromBlob = async (
  blob: Blob
): Promise<Document[]> => {
  const loader = new CSVLoader(blob);
  const document = await loader.load();
  return document;
};
