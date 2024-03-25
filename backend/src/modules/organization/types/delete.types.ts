
export type typePayload = {
  // Define the typePayload here
};

export type typeResultData = {
  // Define the typeResultData here
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
  