import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("2nd user registration success", async () => {
  const email = "sobebar2@test.com";
  const password = "password1234";

  const response = await request(app).post("/api/auth/register").send({
    email,
    password,
  });
    

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    data: null,
    error: {
      code: "auth/email-already-in-use",
      message: "Firebase: Error (auth/email-already-in-use).",
    },
  });
});
