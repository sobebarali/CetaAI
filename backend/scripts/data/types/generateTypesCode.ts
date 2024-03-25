export default function generateTypesCode() {
  const typesCode = `
export type typePayload = {
  // Define the typePayload here
};

export type typeResultData = {
  // Define the typeResultData here
};

export type typeResultError = {
  code: string;
  message: string;
};

export type typeResult = {
  data: null | typeResultData;
  error: null | typeResultError;
};
  `;
  return typesCode;
};




