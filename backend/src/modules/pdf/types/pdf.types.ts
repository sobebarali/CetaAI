export type typePayload = {};

export type typeResultData = {
  userId: string;
  pdfId: string;
  name: string;
};

export type typeResultError = {
  code: string;
  message: string;
  details?: Object;
};

export type typeResult = {
  data: null | typeResultData;
  error: null | typeResultError;
  meta?: null | Object;
};
