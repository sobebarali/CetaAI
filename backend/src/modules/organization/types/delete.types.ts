export type typePayload = {
  orgId: string;
};

export type typeResultData = {
  code: string;
  message: string;
};

export type typeResultError = {
  code: string;
  message: string;
};

export type typeResult = {
  data: null | typeResultData;
  error: null | typeResultError;
};
