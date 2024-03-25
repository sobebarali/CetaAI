import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("user login success", async () => {
  const email = "sobebar@test.com";
  const password = "password1234";

  const response = await request(app).post("/api/auth/login").send({
    email,
    password,
  });


  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    data: {
      code: "LOGIN_SUCCESS",
      message: "User logged in successfully",
      access_token: expect.any(String),
    },
    error: null,
  });

  expect(response.body.data).toBeDefined();
  expect(response.body.data.code).toBe("LOGIN_SUCCESS");
  expect(response.body.data.message).toBe("User logged in successfully");
  expect(response.body.data.access_token).toBeDefined();
  expect(response.body.error).toBeNull();
});
