import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("Get user success", async () => {
  const email = "sobebar@test.com";
  const password = "password1234";

  const login = await request(app).post("/api/auth/login").send({
    email,
    password,
  });

  const access_token = login.body.data.access_token;

  const response = await request(app)
    .get("/api/auth/user")
    .set("Authorization", `Bearer ${access_token}`);

   expect(response.status).toBe(200);
   expect(response.body).toEqual({
     data: {
       code: "USER_FETCHED",
       message: "User fetched successfully",
       user: expect.any(Object),
     },
     error: null,
   });
});
