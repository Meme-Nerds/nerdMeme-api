// take old image urls upload to s3 and update urls in db
const Content = require('../lib/models/content');
const ImageService = require('../lib/services/image-service');

const updateImages = async() => {
  const images = await Content.getContent('images');

  images.map(image => {
    ImageService.uploadImage(image.content)
      .then(img => {
        Content.updateContent(
          'images', 
          image.id, 
          { ...image, content: img } 
        );
      });
  });
};

updateImages();
