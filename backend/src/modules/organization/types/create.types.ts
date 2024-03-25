
export type typePayload = {
  name: string;
  description: string;
};

export type typeResultData = {
  orgId: string;
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
  