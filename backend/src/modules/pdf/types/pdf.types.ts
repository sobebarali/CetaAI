export type typePayload = {};

export type typeResultData = {
  userId: string;
  pdfId: string;
  name: string;
};

export type typeResultError = {
  code: string;
  message: string;
};

export type typeResult = {
  data: null | typeResultData;
  error: null | typeResultError;
};
