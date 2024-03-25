export type typePayload = {
  email?: string;
  phoneNumber?: string;
  emailVerified?: boolean;
  password?: string;
  displayName?: string;
  photoURL?: string;
  disabled?: boolean;
};

export type typeResultData = {
  code: string;
  message: string;
  user: Object;
};

export type typeResultError = {
  code: string;
  message: string;
};

export type typeResult = {
  data: null | typeResultData;
  error: null | typeResultError;
  meta?: null | Object;
};
