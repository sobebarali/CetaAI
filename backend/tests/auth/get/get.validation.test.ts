import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("Get user by email failed due to email validation", async () => {
  const email = "sobebar@test.com";
  const password = "password1234";

  const login = await request(app).post("/api/auth/login").send({
    email,
    password,
  });

  const access_token = login.body.data.access_token;

  const response = await request(app)
    .get("/api/auth/user")
    .set("Authorization", `Bearer ${access_token}`)
    .send({
      email: "sobebar", // invalid email
    });

    console.log(response.body);

  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    data: null,
    error: {
      code: "VALIDATION_ERROR",
      message: '"email" must be a valid email',
    },
  });
});
