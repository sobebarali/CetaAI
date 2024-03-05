export type typePayload = {};

export type typeResultData = {
  isAdded: boolean;
  pdfId: string;
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
