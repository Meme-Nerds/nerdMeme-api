const fetch = require('node-fetch');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

const uploadToS3 = async(blob, contentType = 'image/jpeg') => {
  const uploadedImage = await s3.upload({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: 'chicken-50014.jpg',
    Body: blob,
    // ContentEncoding: 'base64',
    ContentType: contentType
  }).promise();
  return uploadedImage;
};

// const url = 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/12/2/3/QF0108H_Cajun-Brined-Turkey_s4x3.jpg.rend.hgtvcom.616.462.suffix/1433588462202.jpeg';

const getBlob = async(inputUrl) => {
  const response = await fetch(inputUrl);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
};

const uploadImage = (url) => {
  getBlob(url)
    .then(blob => {
      uploadToS3(blob);
    });
};


module.exports = {
  uploadImage
};
