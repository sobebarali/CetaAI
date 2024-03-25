import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("Get user failed Unauthorized", async () => {
  const response = await request(app).get("/api/auth/user");

  expect(response.status).toBe(401);
  expect(response.body).toStrictEqual({
    data: null,
    error: {
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    },
  });
});
