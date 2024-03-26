export type typePayload = {
  orgId: string;
};

export type typeResultData = {
  userId: string;
  orgId: string;
  name: string;
  description: string;
  createdAt: any;
  updatedAt: any;
};

export type typeResultError = {
  code: string;
  message: string;
};

export type typeResult = {
  data: null | typeResultData;
  error: null | typeResultError;
};
