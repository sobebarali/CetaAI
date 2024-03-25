export type typePayload = {
  email: string;
};

export type typeResultData = {
  code: string;
  message: string;
  user: Object;
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
