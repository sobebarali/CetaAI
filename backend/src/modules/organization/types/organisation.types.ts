export type typePayload = {
  userId: string;
  orgId: string;
  name: string;
};

export type typeResultData = {
  userId: string;
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
