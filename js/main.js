import {renderImagesFromData} from './image-render.js';
import {getData} from './data.js';
import {showAlert} from './util.js';
import {addFilterListeners, applyDefaultFilter, showFilterMenu} from './filter.js';
import './image-upload.js';

getData((imageDescriptions) => {
  showFilterMenu();
  applyDefaultFilter(imageDescriptions, () => renderImagesFromData(imageDescriptions));
  addFilterListeners(imageDescriptions, renderImagesFromData);
}, showAlert);
