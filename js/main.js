import {clearRenderedImages, renderImagesFromData} from './image-render.js';
import {getData} from './data.js';
import {showAlert} from './util.js';
import {applyFilter, addFilterListeners, FilterType, showFilterMenu} from './filter.js';
import './image-upload.js';

getData((imageDescriptions) => {
  showFilterMenu();
  applyFilter(FilterType.DEFAULT, imageDescriptions, renderImagesFromData);
  addFilterListeners(imageDescriptions, (filteredImageDescriptions) => {
    clearRenderedImages();
    renderImagesFromData(filteredImageDescriptions);
  });
}, showAlert);
