import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("user login email validation fail", async () => {
  const email = "sobebar"; // invalid email
  const password = "password123467745";

  const response = await request(app).post("/api/auth/login").send({
    email,
    password,
  });

  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    data: null,
    error: {
      code: "VALIDATION_ERROR",
      message: '"email" must be a valid email',
    },
  });

  expect(response.body.data).toBeNull();
  expect(response.body.error).toBeDefined();
  expect(response.body.error.code).toBe("VALIDATION_ERROR");
  expect(response.body.error.message).toBe('"email" must be a valid email');
});


test("user login password validation fail", async () => {
  const email = "sobebar@test.com"; 
  const password = "pass"; // invalid password

  const response = await request(app).post("/api/auth/login").send({
    email,
    password,
  });
    
  console.log(response.body);

  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    data: null,
    error: {
      code: "VALIDATION_ERROR",
      message: '"password" length must be at least 8 characters long',
    },
  });

  expect(response.body.data).toBeNull();
  expect(response.body.error).toBeDefined();
  expect(response.body.error.code).toBe("VALIDATION_ERROR");
 expect(response.body.error.message).toBe('"password" length must be at least 8 characters long');
});
