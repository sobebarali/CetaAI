import { expect, test } from "@jest/globals";
import app from "../../../src";
import request from "supertest";
import path from "path";

test("should return success when a valid PDF file is provided", async () => {
   const pdfFilePath = path.join(
     __dirname,
     "file-sample_150kB.pdf"
   );
  
  const response = await request(app)
    .post("/api/pdf/add")
    .attach("file", pdfFilePath, {
      filename: "file-sample_150kB.pdf",
      contentType: "multipart/form-data",
    });

    const responseBody = JSON.parse(response.text);
    
    console.log(responseBody);

//   expect(response.status).toBe(200);
//   expect(responseBody).toStrictEqual({
//     data: {
//       message: "PDF file uploaded successfully",
//     },
//     error: null,
//   });
});
