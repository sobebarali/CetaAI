import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("organisation create failed Unauthorized", async () => {
  const createOrg = await request(app).post("/api/organisation/add").send({
    name: "Test Organisation",
    description: "Test Organisation Description",
  });
  const responseBody = JSON.parse(createOrg.text);

  expect(responseBody).toStrictEqual({
    data: null,
    error: {
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    },
  });
});
