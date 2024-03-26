import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("organisation update success", async () => {
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

  const createResponse = JSON.parse(createOrg.text);

  expect(createResponse).toStrictEqual({
    data: {
      orgId: expect.any(String),
      name: "Test Organisation",
    },
    error: null,
  });

  const updateOrg = await request(app)
    .put("/api/organisation")
    .set("Authorization", `Bearer ${access_token}`)
    .send({
      orgId: createResponse.data.orgId,
      name: "Test Organisation Updated",
      description: "",
    });
  const updateResponse = JSON.parse(updateOrg.text);

  expect(updateResponse).toStrictEqual({
    data: {
      code: "ORGANIZATION_UPDATED",
      message: "Organization updated successfully",
    },
    error: null,
  });

  const getOrg = await request(app)
    .get("/api/organisation")
    .set("Authorization", `Bearer ${access_token}`)
    .send({
      orgId: createResponse.data.orgId,
    });

    const getResponse = JSON.parse(getOrg.text);

  expect(getResponse).toStrictEqual({
    data: {
      userId: expect.any(String),
      orgId: createResponse.data.orgId,
      name: "Test Organisation Updated",
      description: "Test Organisation Description",
      createdAt: expect.any(Object),
      updatedAt: expect.any(Object),
    },
    error: null,
  });
});
