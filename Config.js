require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "production",
  PORT: process.env.PORT || 3000,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || 
  'AKIA2RXPHIJLTT6NT6ME',
  AWS_SECRET_KEY:
    process.env.AWS_SECRET_KEY || "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",
  AWS_SECRET_ACCESS_KEY:
    process.env.AWS_SECRET_ACCESS_KEY ||
    "xzJqgjmpu3t/ltbfKN1240Id+8u7+f9oYvc2xA2e",
  AWS_REGION: process.env.AWS_REGION || "ap-south-1",
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || "cmpressvideo",
};
