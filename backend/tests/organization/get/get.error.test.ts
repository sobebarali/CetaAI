import { describe, beforeAll, expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

describe("GET /api/organisation", () => {
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

  test("should return unauthorized error when no access token is provided", async () => {
    const getOrgResponse = await request(app)
      .get("/api/organisation")
      .send({ orgId });
    expect(getOrgResponse.status).toBe(401);
    expect(getOrgResponse.body).toEqual({
      data: null,
      error: {
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      },
    });
  });

  test("should return organization not found error for invalid orgId", async () => {
    const getOrgResponse = await request(app)
      .get("/api/organisation")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ orgId: "invalid-org-id" });

    expect(getOrgResponse.body).toEqual({
      data: null,
      error: {
        code: "NOT_FOUND",
        message: "Organization not found",
      },
    });
  });
});
