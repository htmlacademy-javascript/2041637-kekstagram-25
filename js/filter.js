import {debounce, getRandomOnInterval} from './util.js';
import {clearRenderedImages} from './image-render.js';

const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterType = {
  [FilterId.DEFAULT]: 'default',
  [FilterId.RANDOM]: 'random',
  [FilterId.DISCUSSED]: 'discussed'
};

let currentFilter;
let previousFilter;
const RANDOM_IMAGES_NUMBER = 10;

const filtersForm = document.querySelector('.img-filters__form');
const filters = document.querySelector('.img-filters');
/*const filterButtons = filtersForm.querySelectorAll('.img-filters__button');
const defaultButton = filtersForm.querySelector('#filter-default');
const randomButton = filtersForm.querySelector('#filter-random');
const discussedButton = filtersForm.querySelector('#filter-discussed');*/

const showFilterMenu = () => {
  filters.classList.remove('img-filters--inactive');
};

/*const addOnImageRenderListener = () => {
  const picturesNode = document.querySelector('.pictures');
  const observerOptions = {
    childList: true,
    attributes: false,
    subtree: false
  };
  const observer = new MutationObserver((mutations) => {
     mutations[0].
  });
  observer.observe(picturesNode, observerOptions);
};*/

const applyDefaultFilter = (imageDescriptions, cb) => {
  currentFilter = 'default';
  const filteredDescriptions = imageDescriptions.slice();
  filteredDescriptions.sort((descriptionA, descriptionB) => descriptionB.comments.length - descriptionA.comments.length);
  cb(filteredDescriptions);
};

const applyRandomFilter = (imageDescriptions, cb) => {
  currentFilter = 'random';
  const filteredDescriptions = [];
  while (filteredDescriptions.length < RANDOM_IMAGES_NUMBER) {
    const randomId = getRandomOnInterval(0, imageDescriptions.length - 1);
    if (!filteredDescriptions.includes(imageDescriptions[randomId])) {
      filteredDescriptions.push(imageDescriptions[randomId]);
    }
  }
  cb(filteredDescriptions);
};

const applyDiscussedFilter = (imageDescriptions, cb) => {
  currentFilter = 'discussed';
  const filteredDescriptions = imageDescriptions.slice();
  filteredDescriptions.sort((descriptionA, descriptionB) => descriptionB.comments.length - descriptionA.comments.length);
  cb(filteredDescriptions);
};

const addFilterListeners = (imageDescriptions, cb) => {
  filtersForm.addEventListener('click', (evt) => {
    debounce(() => {
      switch (filterType[evt.target.id]) {
        case 'default':
          if (currentFilter !== 'default') {
            evt.target.classList.add('img-filters__button--active');
            clearRenderedImages();
            previousFilter = currentFilter;
            applyDefaultFilter(imageDescriptions, cb);
            filtersForm.querySelector(`#filter-${previousFilter}`).classList.remove('img-filters__button--active');
          }
          break;
        case 'random':
          if (currentFilter !== 'random') {
            evt.target.classList.add('img-filters__button--active');
            clearRenderedImages();
            previousFilter = currentFilter;
            applyRandomFilter(imageDescriptions, cb);
            filtersForm.querySelector(`#filter-${previousFilter}`).classList.remove('img-filters__button--active');
          }
          break;
        case 'discussed':
          if (currentFilter !== 'discussed') {
            evt.target.classList.add('img-filters__button--active');
            clearRenderedImages();
            previousFilter = currentFilter;
            applyDiscussedFilter(imageDescriptions, cb);
            filtersForm.querySelector(`#filter-${previousFilter}`).classList.remove('img-filters__button--active');
          }
          break;
      }
    })();
  });
};

export {applyDefaultFilter, addFilterListeners, showFilterMenu};
