import {debounce, getRandomOnInterval} from './util.js';

const RANDOM_IMAGES_NUMBER = 10;

const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const buttonIdToFilterType = {
  'filter-default': FilterType.DEFAULT,
  'filter-random': FilterType.RANDOM,
  'filter-discussed': FilterType.DISCUSSED,
};

let currentFilter;
const filtersForm = document.querySelector('.img-filters__form');
const filters = document.querySelector('.img-filters');

const showFilterMenu = () => {
  filters.classList.remove('img-filters--inactive');
};

const filterOnRandom = (imageDescriptions) => {
  const filteredDescriptions = [];
  while (filteredDescriptions.length < RANDOM_IMAGES_NUMBER) {
    const randomId = getRandomOnInterval(0, imageDescriptions.length - 1);
    if (!filteredDescriptions.includes(imageDescriptions[randomId])) {
      filteredDescriptions.push(imageDescriptions[randomId]);
    }
  }
  return filteredDescriptions;
};

const filterOnDiscussed = (imageDescriptions) => {
  const filteredDescriptions = imageDescriptions.slice();
  filteredDescriptions.sort((descriptionA, descriptionB) => descriptionB.comments.length - descriptionA.comments.length);
  return filteredDescriptions;
};

const applyFilter = (filterType, imageDescriptions, onFilterComplete) => {
  if (filterType === currentFilter) {
    return;
  }
  currentFilter = filterType;
  let filteredImages;
  switch (filterType) {
    case FilterType.RANDOM:
      filteredImages = filterOnRandom(imageDescriptions);
      break;
    case FilterType.DISCUSSED:
      filteredImages = filterOnDiscussed(imageDescriptions);
      break;
    case FilterType.DEFAULT:
      filteredImages = imageDescriptions;
      break;
  }
  onFilterComplete(filteredImages);
};

const onFilterChange = debounce(applyFilter);

const addFilterListeners = (imageDescriptions, onFilterComplete) => {
  filtersForm.addEventListener('click', (evt) => {
    const filterType = buttonIdToFilterType[evt.target.id];
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    onFilterChange(filterType, imageDescriptions, onFilterComplete);
  });
};

export {applyFilter, addFilterListeners, showFilterMenu, FilterType};
