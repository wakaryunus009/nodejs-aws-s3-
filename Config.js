require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: process.env.PORT || 3000,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || 'AKIASFNTDWL6XMHUYEMS',
  AWS_SECRET_KEY:
    process.env.AWS_SECRET_KEY || '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',
  AWS_REGION: process.env.AWS_REGION || 'ap-southeast-1',
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || 'imgandvideodemo',
};
