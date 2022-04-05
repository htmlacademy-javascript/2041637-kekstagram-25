import {openBigImageForm} from './image-viewer.js';

const imageTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');

const renderImagesFromData = (imageDescriptions) => {
  const imagesFragment = document.createDocumentFragment();
  imageDescriptions.forEach((imageDescription) => {
    const imageTemplateCopy = imageTemplate.cloneNode(true);
    const imageUrl = imageTemplateCopy.querySelector('.picture__img');
    const imageComments = imageTemplateCopy.querySelector('.picture__comments');
    const imageLikes = imageTemplateCopy.querySelector('.picture__likes');
    imageUrl.dataset.imageId = imageDescription.id;
    imageUrl.src = imageDescription.url;
    imageComments.textContent = imageDescription.comments.length;
    imageLikes.textContent = imageDescription.likes;
    imagesFragment.append(imageTemplateCopy);
  });
  picturesContainer.appendChild(imagesFragment);
  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture__img')) {
      const imageId = +evt.target.dataset.imageId;
      const desiredImage = imageDescriptions.find((description) => description.id === imageId);
      openBigImageForm(desiredImage);
    }
  });
};

const clearRenderedImages = () => {
  const images = picturesContainer.querySelectorAll('.picture');
  images.forEach((image) => image.remove());
};

export {renderImagesFromData, clearRenderedImages};
