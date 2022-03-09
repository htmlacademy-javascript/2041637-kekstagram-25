import {getImageDescriptions} from './data.js';
import {openBigImageForm} from './image-viewer.js';

const imageFormTemplate = document.querySelector('#picture').content;
const imageForm = imageFormTemplate.querySelector('a');
const picturesForm = document.querySelector('.pictures');
const imageDescriptions = getImageDescriptions();
const imagesFragment = document.createDocumentFragment();

function generateImagesFromData() {
  imageDescriptions.forEach((imageDescription) => {
    const imageFormCopy = imageForm.cloneNode(true);
    const imageUrl = imageFormCopy.querySelector('.picture__img');
    imageUrl.src = imageDescription.url;
    const imageComments = imageFormCopy.querySelector('.picture__comments');
    imageComments.textContent = imageDescription.comments.length;
    const imageLikes = imageFormCopy.querySelector('.picture__likes');
    imageLikes.textContent = imageDescription.likes;
    imagesFragment.append(imageFormCopy);
    imageFormCopy.addEventListener('click', () => {
      openBigImageForm(imageDescription);
    });
  });
  picturesForm.appendChild(imagesFragment);
}

export {generateImagesFromData};
