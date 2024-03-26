import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("Update user failed due to invalid email", async () => {
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
      email: "sobebar", // invalid email
      phoneNumber: "",
      emailVerified: true,
      password: "",
      displayName: "",
      photoURL: "",
      disabled: false,
    });


  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    data: null,
    error: {
      code: "VALIDATION_ERROR",
      message: '"email" must be a valid email',
    },
  });
});

test("Update user failed due to invalid phoneNumber", async () => {
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
      email: "",
      phoneNumber: "+9167823",
      emailVerified: true,
      password: "",
      displayName: "",
      photoURL: "",
      disabled: false,
    });


  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    data: null,
    error: {
        code: 'VALIDATION_ERROR',
        message: '"phoneNumber" with value "+9167823" fails to match the required pattern: /^[0-9]{10}$/'
      },
  });
});

test("Update user failed due to invalid emailVerified type", async () => {
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
      email: "",
      phoneNumber: "",
      emailVerified: "true", // invalid emailVerified
      password: "",
      displayName: "",
      photoURL: "",
      disabled: false,
    });

  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    data: null,
    error: {
      code: "VALIDATION_ERROR",
      message: '"emailVerified" must be a boolean',
    },
  });
});

test("Update user failed due to short password", async () => {
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
      email: "",
      phoneNumber: "",
      emailVerified: true, 
      password: "fadsf",
      displayName: "",
      photoURL: "",
      disabled: false,
    });


  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    data: null,
    error: {
      code: "VALIDATION_ERROR",
      message: '"password" length must be at least 6 characters long',
    },
  });
});

test("Update user failed due to short displayName and long displayName", async () => {
  const email = "sobebar@test.com";
  const password = "password1234";

  const login = await request(app).post("/api/auth/login").send({
    email,
    password,
  });

  const access_token = login.body.data.access_token;

  const shortResponse = await request(app)
    .put("/api/auth/user")
    .set("Authorization", `Bearer ${access_token}`)
    .send({
      email: "",
      phoneNumber: "",
      emailVerified: true,
      password: "",
      displayName: "dj",
      photoURL: "",
      disabled: false,
    });
  

  expect(shortResponse.status).toBe(400);
  expect(shortResponse.body).toEqual({
    data: null,
    error: {
      code: "VALIDATION_ERROR",
      message: '"displayName" length must be at least 3 characters long',
    },
  });


  const longResponse = await request(app)
    .put("/api/auth/user")
    .set("Authorization", `Bearer ${access_token}`)
    .send({
      email: "",
      phoneNumber: "",
      emailVerified: true,
      password: "",
      displayName: "djhfjklsahlejrheqlkrhkwlqhklsfdahlfhsalfhbnvm,cxbmn,fbasfhjalshjlrwehljkhlgsgjhldfsfgsdgfds",
      photoURL: "",
      disabled: false,
    });
  

  expect(longResponse.status).toBe(400);
  expect(longResponse.body).toEqual({
    data: null,
    error: {
      code: "VALIDATION_ERROR",
      message:
        '"displayName" length must be less than or equal to 30 characters long',
    },
  });
});

