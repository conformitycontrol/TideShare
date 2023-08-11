import { S3 } from "@aws-sdk/client-s3";
import { env } from "../../env.mjs";

export const s3 = new S3({
  region: env.REGION,
  credentials: {
    accessKeyId: env.AMAZON_ACCESS_KEY,
    secretAccessKey: env.AMAZON_SECRET_KEY,
  },
});