import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("user login error", async () => {
  const email = "sobebar@test.com";
  const password = "password123467745";

  const response = await request(app).post("/api/auth/login").send({
    email,
    password,
  });

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    data: null ,
    error: {
      code: "auth/invalid-credential",
      message: "Firebase: Error (auth/invalid-credential).",
    },
  });

  expect(response.body.data).toBeNull();
  expect(response.body.error).toBeDefined();
  expect(response.body.error.code).toBe("auth/invalid-credential");
  expect(response.body.error.message).toBe("Firebase: Error (auth/invalid-credential).");
});
