export type typePayload = {
  orgId: string;
  name?: string | undefined;
  description?: string | undefined;
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
