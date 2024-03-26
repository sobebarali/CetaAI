import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("user registration success", async () => {
  const email = `sobebar${Date.now()}@test.com`
  const password = "password1234";

  const response = await request(app).post("/api/auth/register").send({
    email,
    password,
  });

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    data: {
      status: 200,
      code: "USER_CREATED",
      message: "User created successfully",
    },
    error: null,
  });


  expect(response.body.data).toBeDefined();
  expect(response.body.data.status).toBe(200);
  expect(response.body.data.code).toBe("USER_CREATED");
  expect(response.body.data.message).toBe("User created successfully");
  expect(response.body.error).toBeNull();
});

