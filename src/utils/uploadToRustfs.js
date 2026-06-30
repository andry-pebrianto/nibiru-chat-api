const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const {
  RUSTFS_ENDPOINT,
  RUSTFS_ACCESS_KEY,
  RUSTFS_SECRET_KEY,
  RUSTFS_REGION,
} = require("./env");

const BUCKET_NAME = "koleksi-resep";

const s3Client = new S3Client({
  endpoint: RUSTFS_ENDPOINT,
  region: RUSTFS_REGION ?? "ap-southeast-1",
  credentials: {
    accessKeyId: RUSTFS_ACCESS_KEY,
    secretAccessKey: RUSTFS_SECRET_KEY,
  },
  forcePathStyle: true,
});

module.exports = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const fileStream = fs.createReadStream(file.path);
      const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const objectKey = `${Date.now()}-${sanitizedName}`;

      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: objectKey,
        Body: fileStream,
        ContentType: file.mimetype,
        ContentLength: file.size,
      });

      s3Client
        .send(command)
        .then(() => {
          resolve({
            key: objectKey,
            bucket: BUCKET_NAME,
            url: `${RUSTFS_ENDPOINT}/${BUCKET_NAME}/${objectKey}`,
          });
        })
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};
