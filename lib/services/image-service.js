const fetch = require('node-fetch');
const AWS = require('aws-sdk');
const crypto = require('crypto');

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

const getUUID = () => {
  return (String(1e7) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (Number(c) ^ (crypto.randomBytes(1)[0] & (15 >> (Number(c) / 4)))).toString(16),
  );
};

const getBlob = async(inputUrl) => {
  if(inputUrl.slice(0, 5) === 'data:') {
    const data = inputUrl.split(',')[1];
    const byteString = Buffer.from(data, 'base64');
    return byteString;
  } else {
    const response = await fetch(inputUrl);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  }
};

const uploadToS3 = async(blob, contentType = 'image/jpeg') => {
  const uploadedImage = await s3.upload({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${getUUID()}.jpg`,
    Body: blob,
    ContentType: contentType
  }).promise();
  return uploadedImage.Location;
};

const uploadImage = async(url) => {
  return await getBlob(url)
    .then(blob => {
      return uploadToS3(blob);
    });
};

const deleteImage = async(key) => {
  const deletedImage = await s3.deleteObject({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key
  }, (err, data) => {
    if(err) {
      throw new Error('tough luck kid');
    } else {
      return data;
    }
  });
  return deletedImage;
};

module.exports = {
  uploadImage,
  deleteImage
};
