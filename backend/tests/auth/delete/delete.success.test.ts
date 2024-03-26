import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("Delete user success", async () => {
  const email = "sobebar3@test.com";
  const password = "password1234";

  const register = await request(app).post("/api/auth/register").send({
    email,
    password,
  });

  const login = await request(app).post("/api/auth/login").send({
    email,
    password,
  });

  const access_token = login.body.data.access_token;

  const deleteResponse = await request(app)
    .delete("/api/auth/user")
    .set("Authorization", `Bearer ${access_token}`);

  expect(deleteResponse.status).toBe(200);
  expect(deleteResponse.body).toEqual({
    data: {
      code: "USER_DELETED",
      message: "User deleted successfully",
    },
    error: null,
  });
});
