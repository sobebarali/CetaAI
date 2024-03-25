import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("Update user failed as email already exist", async () => {
  const email = "sobebar@test.com";
  const password = "password1234";

  const login = await request(app).post("/api/auth/login").send({
    email,
    password,
  });

  const access_token = login.body.data.access_token;

  const response = await request(app)
    .put("/api/auth/user")
    .set("Authorization", `Bearer ${access_token}`)
    .send({
      email: "sobebar2@test.com",
      phoneNumber: "",
      emailVerified: true,
      password: "",
      displayName: "",
      photoURL: "",
      disabled: false,
    });


  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    data: null,
    error: {
      code: "auth/email-already-exists",
      message: "The email address is already in use by another account.",
    },
  });
});
