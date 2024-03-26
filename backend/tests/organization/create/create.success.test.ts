import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";


test("organisation create success", async () => {
  const email = "sobebar@test.com";
  const password = "password1234";

  const login = await request(app).post("/api/auth/login").send({
    email,
    password,
  });

  let access_token = login.body.data.access_token;

  const createOrg = await request(app)
    .post("/api/organisation")
    .set("Authorization", `Bearer ${access_token}`)
    .send({
      name: "Test Organisation",
      description: "Test Organisation Description",
    });
  const responseBody = JSON.parse(createOrg.text);

  expect(responseBody).toStrictEqual({
    data: {
      orgId: expect.any(String),
      name: "Test Organisation",
    },
    error: null,
  });
});
