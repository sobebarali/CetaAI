import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";
import { randomUUID } from "crypto";

test("should return the correct result when user registration is successfull", async () => {
  const response = await request(app)
    .post("/auth/signup")
    .send({
      formFields: [
        {
          id: "email",
          value: `${randomUUID()}@test.com`,
        },
        {
          id: "password",
          value: "testPass123",
        },
      ],
    });

  const responseBody = JSON.parse(response.text);

  console.log(responseBody);
});
