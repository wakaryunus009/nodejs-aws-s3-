require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "production",
  PORT: process.env.PORT || 3000,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || 
  '',
  AWS_SECRET_KEY:
    process.env.AWS_SECRET_KEY || "",
  AWS_SECRET_ACCESS_KEY:
    process.env.AWS_SECRET_ACCESS_KEY ||
    "",
  AWS_REGION: process.env.AWS_REGION || "",
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || "",
};
