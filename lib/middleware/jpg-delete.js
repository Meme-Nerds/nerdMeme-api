const ImageService = require('../services/image-service');

module.exports = (req, res, next) => {
  console.log('req-body', req.body);
  const oldImageUrl = `${req.params.oldImageKey}.jpg`;
  if(
    req.params.contentType === 'images' && 
    oldImageUrl !== req.body.content
  ) {
    ImageService.deleteImage(oldImageUrl)
      .then(res => {
        console.log('S3 response => ', res);
        req.s3Response = res;
        next();
      });
  } else {
    next();
  }
};
