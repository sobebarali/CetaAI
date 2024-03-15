import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";

test("should return the correct result when files are provided", async () => {
  
    const response = await request(app)
      .post("/api/pdf/add")
      .attach("file", "tests/pdf/samples/file-example_PDF_1MB.pdf")


    // const responseBody = JSON.parse(response.text);
    
   console.log(response);
});
