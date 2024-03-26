import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("organisation create failed name missing", async () => {
   const email = "sobebar@test.com";
   const password = "password1234";

   const login = await request(app).post("/api/auth/login").send({
     email,
     password,
   });

   const access_token = login.body.data.access_token;
  
  const createOrg = await request(app)
    .post("/api/organisation")
    .set("Authorization", `Bearer ${access_token}`)
    .send({
      name: "",
      description: "Test Organisation Description",
    });
    const responseBody = JSON.parse(createOrg.text);
    
    
  expect(responseBody).toStrictEqual({
    data: null,
    error: {
      code: "VALIDATION_ERROR",
      message: '"name" is not allowed to be empty',
    },
  });
});


test("organisation create failed description missing", async () => {
   const email = "sobebar@test.com";
   const password = "password1234";

   const login = await request(app).post("/api/auth/login").send({
     email,
     password,
   });

   const access_token = login.body.data.access_token;

  const createOrg = await request(app)
    .post("/api/organisation")
    .set("Authorization", `Bearer ${access_token}`)
    .send({
      name: "Test Organisation",
      description: "",
    });
  const responseBody = JSON.parse(createOrg.text);

  expect(responseBody).toStrictEqual({
    data: null,
    error: {
      code: "VALIDATION_ERROR",
      message: '"description" is not allowed to be empty',
    },
  });
});
