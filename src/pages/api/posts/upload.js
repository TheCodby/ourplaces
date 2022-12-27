import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import prisma from "@/backend/utils/prisma";
import S3 from "aws-sdk/clients/s3";
const allowedMimes = ["image/jpeg", "image/png"];
const s3 = new S3({
  region: "us-east-1",
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  signatureVersion: "v4",
});
export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });
  }
  try {
    let { type } = JSON.parse(req.body);
    if (!allowedMimes.includes(type)) {
      res.status(400).json({
        message: "Invalid file type. Only jpg and png image files are allowed.",
      });
    }
    const date = Date.now();
    const imageKey = `photos/${date}.${type.split("/")[1]}`;
    const fileParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: imageKey,
      Expires: 600,
      ContentType: type,
      ACL: "public-read",
    };
    const image = await prisma.Uploads.create({
      data: {
        key: imageKey,
      },
    });
    const url = await s3.getSignedUrlPromise("putObject", fileParams);
    res.status(200).json({ url, image_id: image.id });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};
