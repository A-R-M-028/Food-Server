import aws from "aws-sdk";
require ('dotenv').config();

// AWS S3 bucket config
const s3Bucket = new aws.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    SecretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: "ap-south-1",
  });

  export const s3Upload = (options) => {
    return new Promise((resolve, reject) => {
      s3Bucket.upload(options, (error, data) => {
        if (error) return reject(error);
        // No error
        return resolve(data);
      });
    });
  };