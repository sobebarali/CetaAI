import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("organisation delete success", async () => {
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

  const deleteOrg = await request(app)
    .delete("/api/organisation")
    .set("Authorization", `Bearer ${access_token}`)
    .send({
      orgId: createResponse.data.orgId,
    });

  const deleteResponse = JSON.parse(deleteOrg.text);

  expect(deleteResponse).toStrictEqual({
    data: {
      code: "ORGANIZATION_DELETED",
      message: "Organization deleted successfully",
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
    data: null,
    error: { code: "NOT_FOUND", message: "Organization not found" },
  });
});
