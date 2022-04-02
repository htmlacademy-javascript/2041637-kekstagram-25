import {openBigImageForm} from './image-viewer.js';
import {getRandomOnInterval} from './util.js';
import {debounce} from './util.js';

const RANDOM_IMAGES_NUMBER = 10;

const imageTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');
const filters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = filtersForm.querySelectorAll('.img-filters__button');
const defaultButton = filtersForm.querySelector('[id=filter-default]');
const randomButton = filtersForm.querySelector('[id=filter-random]');
const discussedButton = filtersForm.querySelector('[id=filter-discussed]');

const generateImagesFromData = (imageDescriptions) => {
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
  filters.classList.remove('img-filters--inactive');
};

const applyRandomFilter = (imageDescriptions) => {
  const filteredDescriptions = [];
  while (filteredDescriptions.length < RANDOM_IMAGES_NUMBER) {
    const randomId = getRandomOnInterval(0, imageDescriptions.length - 1);
    if (!filteredDescriptions.includes(imageDescriptions[randomId])) {
      filteredDescriptions.push(imageDescriptions[randomId]);
    }
  }
  return filteredDescriptions;
};

const applyDiscussedFilter = (imageDescriptions) => {
  const filteredDescriptions = imageDescriptions.slice();
  filteredDescriptions.sort((descriptionA, descriptionB) => descriptionB.comments.length - descriptionA.comments.length);
  return filteredDescriptions;
};

const addFilterListeners = (imageDescriptions) => {
  filtersForm.addEventListener('click', (evt) => {
    filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    const images = picturesContainer.querySelectorAll('a[class=picture]');
    images.forEach((image) => image.remove());
    debounce(() => {
      switch (evt.target) {
        case defaultButton:
          generateImagesFromData(imageDescriptions);
          break;
        case randomButton:
          generateImagesFromData(applyRandomFilter(imageDescriptions));
          break;
        case discussedButton:
          generateImagesFromData(applyDiscussedFilter(imageDescriptions));
          break;
      }
    })();
  });
};

export {generateImagesFromData, addFilterListeners};
