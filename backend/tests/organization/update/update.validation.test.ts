import { describe, beforeAll, expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

describe("PUT /api/organisation : UPDATE ORGANISATION VALIDATION", () => {
  let accessToken: string;
  let orgId: string;

  beforeAll(async () => {
    const email = "sobebar@test.com";
    const password = "password1234";
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email, password });
    accessToken = loginResponse.body.data.access_token;

    const createOrgResponse = await request(app)
      .post("/api/organisation")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Test Organisation",
        description: "Test Organisation Description",
      });
    orgId = JSON.parse(createOrgResponse.text).data.orgId;
  });

  test("should return validation error when invalid name", async () => {
    const updateOrgResponse = await request(app)
      .put("/api/organisation")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        orgId,
        name: "cd", // invalid name
        description: "Test Organisation Description Updated",
      });

    expect(updateOrgResponse.status).toBe(400);
    expect(updateOrgResponse.body).toEqual({
      data: null,
      error: {
        code: "VALIDATION_ERROR",
        message: '"name" length must be at least 3 characters long',
      },
    });
  });

  test("should return validation error when invalid description ", async () => {
    const updateOrgResponse = await request(app)
      .put("/api/organisation")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        orgId,
        name: "Test Organisation Updated",
        description: "gh", // invalid description
      });

    expect(updateOrgResponse.status).toBe(400);
    expect(updateOrgResponse.body).toEqual({
      data: null,
      error: {
        code: "VALIDATION_ERROR",
        message: '"description" length must be at least 3 characters long',
      },
    });
  });
});
