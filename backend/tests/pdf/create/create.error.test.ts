import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("should return the correct result when no files are provided", async () => {
  const files = {};
  const response = await request(app).post("/api/pdf/add").send(files);

  const responseBody = JSON.parse(response.text);

  expect(responseBody).toStrictEqual({
    data: null,
    error: {
      code: "FILE_REQUIRED",
      message: "File is required",
    },
  });
});
