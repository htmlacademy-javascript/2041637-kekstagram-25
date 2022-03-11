import {openBigImageForm} from './image-viewer.js';

const imageTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');

const generateImagesFromData = (imageDescriptions) => {
  const imagesFragment = document.createDocumentFragment();
  imageDescriptions.forEach((imageDescription) => {
    const imageTemplateCopy = imageTemplate.cloneNode(true);
    const imageUrl = imageTemplateCopy.querySelector('.picture__img');
    const imageComments = imageTemplateCopy.querySelector('.picture__comments');
    const imageLikes = imageTemplateCopy.querySelector('.picture__likes');
    const imageNode = imageTemplateCopy.querySelector('a');
    imageUrl.src = imageDescription.url;
    imageComments.textContent = imageDescription.comments.length;
    imageLikes.textContent = imageDescription.likes;
    imagesFragment.append(imageTemplateCopy);
    imageNode.addEventListener('click', () => {
      openBigImageForm(imageDescription);
    });
  });
  picturesContainer.appendChild(imagesFragment);
  /*picturesContainer.addEventListener('click', (evt) => {
    const reg = /.*\/photos\/(.*)\.jpg/;
    const imageId = +evt.target.src.match(reg)[1];
    const result = imageDescriptions.filter((description) => description.id === imageId);
    openBigImageForm(result[0]);
  });*/
};

export {generateImagesFromData};
