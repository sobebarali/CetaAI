import s3 from "..";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export default async function getObject({
    bucket,
    key,
    }: {
    bucket: string;
    key: string;
}) {
  const params = {
    Bucket: bucket,
    Key: key,
  };
  try {
    const data = await s3.send(new GetObjectCommand(params));
    return data;
  } catch (err) {
    throw err;
  }
}