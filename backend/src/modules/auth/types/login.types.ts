
export type typePayload = {
  email: string;
  password: string;
};

export type typeResultData = {
  code: string;
  message: string;
  access_token: string;
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
  